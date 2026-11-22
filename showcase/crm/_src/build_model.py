"""Sinh "API giả" cho prototype CRM: object model (mock-api/meta) + dummy data (mock-api/data).

Nguồn (thư mục source/):
  - legacy_layouts_ape.txt       layout → section → field (sandbox APE, chỉ cấu hình)
  - Entity List của BA1     field: nhãn, kiểu, bắt buộc, lookup, giá trị picklist
  - build_om_states_perms.py   blueprint, role, quyền (SA)
  - feature_list_v0.4.json     module / feature (DEMO-7)
Dữ liệu bản ghi là dữ liệu GIẢ, sinh ngẫu nhiên có seed. Picklist có thể chứa tên người được thay bằng tên giả.

Chạy: python3 build_model.py ../app [đường_dẫn_Entity_List.xlsx]
"""
import copy
import json
import os
import random
import re
import sys
from datetime import date, datetime, timedelta

import openpyxl

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "source")
OUT = os.path.abspath(sys.argv[1])
ENTITY_LIST = sys.argv[2] if len(sys.argv) > 2 else os.path.join(HERE, "..", "..", "BA1", "BA1", "DEMO_Legacy_CRM_Entity_List_v0.1.xlsx")
rnd = random.Random(2234)
TODAY = date(2026, 10, 27)

# ---------------------------------------------------------------- nguồn
FL = json.load(open(os.path.join(SRC, "feature_list_v0.4.json"), encoding="utf-8"))
om_ns = {}
_om = open(os.path.join(SRC, "build_om_states_perms.py"), encoding="utf-8").read()
exec(_om[:_om.index("SUMMARY = [")], om_ns)  # BLUEPRINTS, TRANS, ROLES, PROFILES, GROUPS, DEFAULT, SHARING, TEAMSPACES

LAYOUTS = {}  # api -> [(layout, [(section, [fields])])]
for line in open(os.path.join(SRC, "legacy_layouts_ape.txt"), encoding="utf-8"):
    if not line.strip() or line.startswith("#"):
        continue
    mod, lay, secs = line.rstrip("\n").split("#", 2)
    sections = []
    for s in secs.split(";"):
        name, _, fl = s.partition("=")
        fields = [f for f in fl.split(",") if f]
        if fields:
            sections.append((name, fields))
    LAYOUTS.setdefault(mod, []).append((lay, sections))

TYPEMAP = {"Text": "text", "Text dài": "textarea", "Picklist": "picklist", "Multi picklist": "multipicklist", "Date": "date",
           "DateTime": "datetime", "User": "user", "Lookup": "lookup", "Checkbox": "checkbox", "Integer": "int",
           "Integer (lớn)": "int", "Số thập phân": "decimal", "Tiền": "currency", "Công thức": "formula", "Email": "email",
           "Phone": "phone", "URL": "url", "Auto number": "autonumber", "Ảnh": "image", "File": "file", "Subform": "subform",
           "Multi lookup (n-n)": "multilookup", "%": "percent", "Liên kết đa module (hệ thống)": "lookup", "Thuế theo dòng": "currency"}

# ---------------------------------------------------------------- bối cảnh vùng: Úc (+ pháp nhân ở Singapore)
# Dữ liệu giả đặt ở Úc (không theo nước của hệ thống gốc): địa điểm, điện thoại, biển số, hậu tố công ty, tên người, cách gọi
# cơ quan / chứng nhận. Các hàm dưới rút số ngẫu nhiên đúng số lần như bản trước (theo nước của hệ thống gốc) nên mọi dữ liệu khác giữ nguyên.
# Nước / tiền tệ / GST của từng pháp nhân ở meta/config/tenants.json: pháp nhân country = SG (BH) sinh như Úc rồi đổi sang Singapore ở bước cuối (to_sg).
SITES = [  # (suburb + bang, mã bưu chính, mã vùng, chữ số đầu số bàn): khu công nghiệp; bản ghi thứ i dùng SITES[i % 7]
    ("Wetherill Park NSW", "2164", "2", "9"), ("Smithfield NSW", "2164", "2", "9"), ("Dandenong South VIC", "3175", "3", "9"),
    ("Laverton North VIC", "3026", "3", "9"), ("Eagle Farm QLD", "4009", "7", "3"), ("Kewdale WA", "6105", "8", "9"), ("Yatala QLD", "4207", "7", "3")]
MOBILE_RX = r"Mobile|Driver|Contact_Person"  # field số di động; field điện thoại còn lại là số bàn
PLATE_AZ = "ABCDEFGHJKLMNPQRSTUVWXYZ"


def site(i):  # City / mã bưu chính / mã vùng của cùng 1 bản ghi khớp nhau (cùng i)
    return SITES[i % len(SITES)]


def au_postcode(i):
    rnd.randint(10000, 99999)  # giữ lượt rút của mã bưu chính 6 số trước đây
    return site(i)[1]


def au_phone(api, i):  # số giả, che 3 số: di động "+61 4xx xxx 213", số bàn "+61 2 9xxx 1213" (mã vùng theo bang của bản ghi)
    rnd.choice("89")  # giữ lượt rút của đầu số trước đây
    n = rnd.randint(1000, 9999)
    if re.search(MOBILE_RX, api):
        return f"+61 4xx xxx {n % 1000:03d}"
    s = site(i)
    return f"+61 {s[2]} {s[3]}xxx {n}"


def au_plate(p, l1, n, l2):  # biển xe tải kiểu Úc "XA 34 XN"; n: số 4 chữ số
    return f"{p}{l1} {n % 100:02d} {l2}{PLATE_AZ[n // 100 % len(PLATE_AZ)]}"


def rand_plate():
    return au_plate("X", chr(65 + rnd.randint(0, 25)), rnd.randint(1000, 9999), chr(65 + rnd.randint(0, 25)))


def gst_rate(tn):  # GST theo pháp nhân (tenants.json: gst %) — Úc 10%, Singapore 9%
    return TENANT_CFG[tn]["gst"] / 100


def apply_gst(rec, fields):  # tính lại thuế & tổng của bản ghi theo GST của pháp nhân (bản nhân bản sang pháp nhân khác); giá trước thuế giữ nguyên
    rate = gst_rate(rec["_tenant"])
    for api, fd in fields.items():
        rows = rec.get(api)
        if fd["type"] != "subform" or not isinstance(rows, list):
            continue
        for row in rows:
            if "Total" in row:
                row["Net_Total"] = round(row["Total"] * (1 + rate), 2)
        subtotal = sum(row.get("Total", 0) for row in rows)
        if subtotal and "Sub_Total" in fields:
            rec["Sub_Total"] = round(subtotal, 2)
            for tx in ("Total_Tax", "Tax", "Total_Tax_GST"):
                if tx in fields:
                    rec[tx] = round(subtotal * rate, 2)
            rec["Grand_Total"] = round(subtotal * (1 + rate), 2)
            rec["Discount"] = 0
            rec["Adjustment"] = 0


SG_SITES = [  # pháp nhân ở Singapore: địa điểm tương ứng với SITES (cùng vị trí) — (khu công nghiệp, mã bưu chính); 2 suburb NSW cùng mã 2164 → cùng Tuas
    ("Tuas", "639544"), ("Tuas", "639544"), ("Woodlands", "738372"), ("Jurong", "619104"), ("Ubi", "408935"), ("Jurong", "628140"), ("Woodlands", "757450")]
SG_CITY = {s[0]: g[0] for s, g in zip(SITES, SG_SITES)}
SG_POST = {s[1]: g[1] for s, g in zip(SITES, SG_SITES)}


def to_sg(v, f=""):  # giá trị của bản ghi thuộc pháp nhân ở Singapore, suy từ giá trị Úc đã sinh (giữ các chữ số; f = tên field / cột)
    if isinstance(v, list):
        return [to_sg(x, f) for x in v]
    if isinstance(v, dict):  # lookup {id, name}: name theo field chứa nó; dòng subform: theo tên cột
        return {k: to_sg(x, f if k == "name" and "id" in v else k) for k, x in v.items()}
    if not isinstance(v, str) or f in ("id", "_tenant"):
        return v
    if "City" in f and v in SG_CITY:
        return SG_CITY[v]
    if re.search(r"Postal|Zip|_Code$", f) and v in SG_POST:
        return SG_POST[v]
    if v == "Australia":
        return "Singapore"
    m = re.fullmatch(r"\+61 \d \dxxx (\d{4})", v)  # số bàn
    if m:
        return f"+65 6xxx {m.group(1)}"
    m = re.fullmatch(r"\+61 4xx xxx (\d{3})", v)  # di động
    if m:
        return f"+65 9xxx x{m.group(1)}"
    m = re.fullmatch(r"[XH]([A-Z]) (\d\d) ([A-Z])([A-Z])", v)  # biển số → kiểu Singapore "GBA1234X"
    if m:
        return f"GB{m.group(1)}{PLATE_AZ.index(m.group(4)) * 100 + int(m.group(2)) or 100}{m.group(3)}"
    return v.replace(" Pty Ltd", " Pte Ltd")


REGION_OPT = {  # giá trị picklist (Entity List của hệ thống cũ) mang tên cơ quan / chứng nhận / mã thuế của nước gốc → cách gọi ở Úc, giữ vị trí
    "LM Certification & Load Test": "Plant Registration & Load Test", "LG Certication Renewal": "Lifting Gear Inspection Renewal",
    "LM Certification Renewal": "Plant Registration Renewal", "LM & LG Certification Renewal": "Plant Rego & Lifting Gear Renewal",
    "NEA Certification Renewal": "EPA Licence Renewal", "LM & NEA Certification Renewal": "Plant Rego & EPA Licence Renewal",
    "LG Certification & Load Test": "Lifting Gear Inspection & Load Test", "LM Certification, Che": "Plant Registration, Check",
    "Certification (NEA/LM/LG)": "Certification (EPA/Plant/Lifting Gear)", "WIP - VITAS": "WIP - NHVR Approval",
    **{f"0{n} LM Cert": f"0{n} Plant Rego" for n in range(1, 8)}, "01 LM Cert for first 6 Months": "01 Plant Rego for first 6 Months",
    "CERTIFICATE OF ENTITLEMENT (COE)": "REGISTRATION & CTP (REGO)", "Certifications (LM)": "Certifications (Plant Rego)",
    "ZR - 0.0 %": "GST-free - 0.0 %", "GST - 9.0 %": "GST - 10.0 %", "GST - 8.0 %": "SG GST - 9.0 %",  # mã thuế hàng hoá: GST Úc 10%, GST Singapore 9% (BH)
}
REGION_RX = [(r"^Ex-Works \([^)]+\)", "Ex-Works (Sydney)")]  # nơi giao trong điều khoản Ex-Works
PERSON_OPT = {"Testing": ["Brodie", "M Lowe", "Callum Hart", "Kyle"]}  # picklist chứa tên người của hệ thống cũ → tên giả theo vị trí (không ghi tên gốc ở đây)


def region_opts(api, opts):
    if api in PERSON_OPT:
        return [PERSON_OPT[api][k] if k < len(PERSON_OPT[api]) else f"Tester {k + 1}" for k in range(len(opts))]
    out = []
    for v in opts:
        v = REGION_OPT.get(v, v)
        for rx, rep in REGION_RX:
            v = re.sub(rx, rep, v)
        out.append(v)
    return out


REGION_LABEL = {  # nhãn field theo bối cảnh Úc (áp cùng FIELD_LABEL ở cuối)
    ("orders", "Equipment_s_Additional_Registration_Fee_ARF"): "Equipment's Rego & Stamp Duty", ("quotes", "Equipment_s_Additional_Registration_Fee_ARF"): "Equipment's Rego & Stamp Duty",
    ("orders", "LTA_Documents"): "NHVR Documents", ("install", "VITAS_Billing"): "NHVR Approval Billing",
    ("orders", "LM_Expiry_Date"): "Plant Registration Expiry", ("quotes", "LM_Expiry_Date"): "Plant Registration Expiry", ("vehicles", "LM_Expiry_Date"): "Plant Registration Expiry",
    ("orders", "LM_Certifications"): "Plant Registrations", ("quotes", "LM_Certifications"): "Plant Registrations", ("vehicles", "LG_Expiry_Date"): "Lifting Gear Inspection Expiry",
    ("vehicles", "NEA_Expiry_Date"): "EPA Licence Expiry", ("orders", "NEA_Expiry_Date"): "EPA Licence Expiry", ("quotes", "NEA_Expiry_Date"): "EPA Licence Expiry",
}

FIELDS = {}  # api entity -> {api: {...}}
wb = openpyxl.load_workbook(ENTITY_LIST, read_only=True, data_only=True)
for r in wb["Fields"].iter_rows(min_row=2, values_only=True):
    if not r or not r[0]:
        continue
    r = tuple(r) + (None,) * (12 - len(r))
    ent, api = r[1], r[3]
    if not TYPEMAP.get(r[4]):
        continue
    opts = [v.strip() for v in str(r[10] or "").split(";") if v.strip() and v.strip() != "-None-" and v.strip().lower() not in ("asd", "test", "a")]
    t = TYPEMAP.get(r[4])
    if t == "formula" and re.search(r"Total|Tax|Balance|Amount|Price|Revenue", str(r[3])) and "Quantity" not in str(r[3]):
        t = "currency"
    elif t == "formula" and "Quantity" in str(r[3]):
        t = "int"
    FIELDS.setdefault(ent, {})[api] = {"label": r[2], "type": t, "required": r[6] == "Có", "lookup": r[8] or None, "options": region_opts(api, opts)}

# Picklist có thể chứa tên nhân viên / người liên hệ của KH → không dùng giá trị thật
PERSON_FIELDS = {"Sales_Person", "Requestor", "Requestor_Name", "Issuer_Name", "Prepared_By", "Handled_By", "Technicians_Involved",
                 "Admin", "Engineer_In_Charge", "Handover_Personnel", "Authorized_By", "Submit_To", "Other_Requestors", "Driver_In_Charge",
                 "Contact_Person", "Lead_Source", "Requestor_of_S_No_1", "Requestor_of_S_No_2", "Requestor_of_S_No_3",
                 "Requestor_of_S_No_4", "Requestor_of_S_No_5", "Work_Done_by_RV", "GL_Account", "Owner_of_Container"}

# ---------------------------------------------------------------- người dùng & tổ chức (giả)
CONF = os.path.join(OUT, "mock-api", "meta", "config")  # cấu hình sửa tay (frontend đọc trực tiếp)
TENANTS = json.load(open(os.path.join(CONF, "tenants.json"), encoding="utf-8"))["tenants"]
TENANT_CFG = {t["code"]: t for t in TENANTS}  # nước / tiền tệ / GST của pháp nhân (gst_rate, to_sg)
USERS = json.load(open(os.path.join(CONF, "users.json"), encoding="utf-8"))["users"]
STAFF = [u["name"] for u in USERS if u.get("seed", True)]  # user seed=false (người duyệt thêm sau) không làm owner dữ liệu mẫu
TECHS = ["Tech 1", "Tech 2", "Tech 3", "Tech 4"]
COMPANIES = ["Alpha Construction Pty Ltd", "Bravo Logistics Pty Ltd", "Citra Waste Services", "Delta Movers Pty Ltd",
             "Echo Marine Engineering", "Foxtrot Landscape Pty Ltd", "Gamma Civil Works", "Harbour Recycling Pty Ltd",
             "Indigo Freight Services", "Jade Builders Pty Ltd", "Kestrel Environmental", "Lumen Cold Chain Pty Ltd"]
VENDORS = ["Vendor Alpha Pty Ltd", "Vendor Bravo GmbH", "Vendor Citra Pty Ltd", "Vendor Delta Hydraulics", "Vendor Echo Parts",
           "Vendor Foxtrot Trading", "Vendor Gamma Steel", "Vendor Hydro Supply"]
FIRST = ["Jack", "Olivia", "Liam", "Chloe", "Noah", "Mia", "Lachlan", "Sophie", "Nick", "Emily", "Josh", "Ruby", "Tom", "Isla"]  # tên người liên hệ (Úc)
LAST = ["Mitchell", "Taylor", "R.", "J.", "Murphy", "Kelly", "P.", "Brown", "Walsh", "Russo", "Campbell", "F.", "Costa", "Haddad"]
SENTENCES = ["Oil leak at lift cylinder", "Customer requests express service", "Check hydraulic pressure after repair",
             "Replace worn seal kit", "Awaiting customer confirmation", "Pressure hose cracked, replaced", "Test run OK",
             "Parts to be collected from store", "Inspection passed with minor remarks", "Follow up on payment"]
PRODUCTS = [("CR-10T", "Crane 10T knuckle boom", 120000), ("CR-8T", "Crane 8T knuckle boom", 98000), ("TG-1500", "Tailgate 1500kg", 11500),
            ("TG-2000", "Tailgate 2000kg", 14200), ("HL-20", "Hooklift 20T", 68000), ("HL-15", "Hooklift 15T", 56000),
            ("OTC-20", "Open top container 20m3", 9800), ("PTO-H", "PTO kit", 6500), ("P-HOSE-12", "Hydraulic hose 1/2\"", 45),
            ("P-SEAL-10", "Seal kit", 120), ("P-FILTER", "Hydraulic filter", 85), ("SV-PLANT", "Plant registration", 450),
            ("SV-SERVICE", "Annual service", 680), ("P-REMOTE", "Radio remote control", 3200)]

# ---------------------------------------------------------------- entity trong prototype
# key: (api Legacy CRM, module, icon, menu group, số bản ghi, title, subtitle, cột danh sách, field trạng thái)
# cột danh sách = cột list view mặc định trên Legacy CRM (source/legacy_listviews_ape.txt), trừ SI / Parts Requisition / NEA (view Legacy CRM chưa chỉnh) và Ticket (module mới)
ENT = {
    "leads": ("Leads", "M07", "lead", "sales", 10, ["First_Name", "Last_Name"], "Company", ["Company", "Email", "Phone", "Lead_Source", "Owner"], "Lead_Status"),
    "accounts": ("Accounts", "M05", "bldg", "sales", 12, ["Account_Name"], "Region", ["Mobile", "Email", "Phone", "Owner", "Billing_Street"], None),
    "contacts": ("Contacts", "M06", "users", "sales", 14, ["First_Name", "Last_Name"], "Account_Name", ["Account_Name", "Email", "Phone", "Owner"], None),
    "deals": ("Deals", "M08", "target", "sales", 12, ["Deal_Name"], "Account_Name", ["Amount", "Stage", "Closing_Date", "Account_Name", "Contact_Name", "Owner"], "Stage"),
    "quotes": ("Quotes", "M10", "file", "sales", 14, ["Sales_Agreement_No"], "Subject", ["Date1", "Quote_Stage", "Equipment_Type", "Subject", "Account_Name", "Owner", "Vehicle_Number", "Grand_Total", "New_After_Sales", "Model", "Created_Time", "Payment_Term", "Warranty_Period", "Warranty", "Serial_Number", "Brand", "Balance"], "Quote_Stage"),
    "orders": ("Sales_Orders", "M11", "cart", "sales", 10, ["Sales_Order_Number"], "Subject", ["Tax_Invoice_No", "Account_Name", "Subject", "Grand_Total", "Date_of_Invoice", "Debtor_Code", "After_Sales_Document_No", "Modified_Time", "Created_Time"], "Status"),
    "invoices": ("Invoices", "M12", "dollar", "sales", 6, ["Invoice_Number"], "Subject", ["Invoice_No", "Subject", "Status", "Invoice_Date", "Grand_Total", "Contact_Name", "Account_Name", "Owner"], "Status"),
    "products": ("Products", "M09", "pkg", "sales", 14, ["Product_Name"], "Product_Code", ["Product_Code", "Owner", "Manufacturer", "Product_Category", "Created_Time", "Unit_Price", "Cost_Price", "Tag", "Description"], None),
    "jobs": ("Problem_Identifications", "M14", "wrench", "aftersales", 16, ["Document_Number1"], "Name", ["Date_Time_1", "Warranty", "Account", "Name", "Vehicle_Number", "Date_Time_of_Completion", "Status", "Owner", "Invoice_Number"], "Status"),
    "vehicles": ("Vehicle_Number", "M15", "truck", "aftersales", 14, ["Name"], "Account_Name", ["Account_Name", "Latest_Date_of_Service", "Brand", "Model", "Equipment_Purchase_Date", "Other_Warranty"], None),
    "install": ("New_Installation_Projects", "M16", "layers", "aftersales", 8, ["Name"], "Subject", ["Account_Name", "Quotation_Number", "Project_Start_Date", "Ready_By", "Delivery_Date", "Estimated_Billing_Date", "Status", "Subject", "Sales_Agreement_Number", "Add_on_Agreements"], "Status"),
    "si": ("Shipping_Instructions", "M17", "cog", "aftersales", 8, ["Name"], "Requestor_Name", ["Requestor_Name", "Account_Name", "Request_Date", "Status"], "Status"),
    "partsreq": ("Parts_Requisition", "M17", "board", "aftersales", 4, ["Name"], "Service_Repairs_Certs", ["Service_Repairs_Certs", "Date", "Owner"], None),
    "nea": ("NEA_Inspections", "M18", "clip2", "aftersales", 4, ["Name"], "Account_Name", ["Account_Name", "Vehicle_License_Number", "Hooklift_Brand", "Owner"], None),
    "tickets": ("Cases", "M19", "buoy", "aftersales", 5, ["Subject"], "Account_Name", ["Account_Name", "Case_Type", "Priority", "Status", "Owner"], "Status"),
    "pr": ("Purchase_Requisitions", "M20", "board", "purchasing", 10, ["Name"], "Vendor", ["Created_Time", "Form_Status", "Description", "Owner", "Requestor_Name", "Comments_Approver", "Comments_Procurement", "Comments_Requestor"], "Form_Status"),
    "vendors": ("Vendors", "M21", "store", "purchasing", 8, ["Vendor_Name"], "Vendor_Code", ["Vendor_Code", "Credit_Terms", "Country"], None),
    "tasks": ("Tasks", "M24", "check", "home", 10, ["Subject"], "What_Id", ["Due_Date", "Status", "Priority", "What_Id", "Who_Id", "Owner"], "Status"),
}
# field luôn có giá trị trong dữ liệu mẫu (cột danh sách cũ) — tách khỏi cột danh sách để đổi cột không làm đổi dữ liệu giả
FILL = {"tasks": ["Due_Date", "Priority", "Status", "Owner"], "vehicles": ["Account_Name", "Equipment_Type", "Brand", "LM_Expiry_Date", "NEA_Expiry_Date", "Warr_Expiry_Date"], "contacts": ["Account_Name", "Title", "Mobile", "Email", "Owner"], "leads": ["Company", "Lead_Source", "Equipment_Type", "Lead_Status", "Owner"], "install": ["Account_Name", "Equipment_Type", "Status", "Delivery_Date", "Owner"], "invoices": ["Account_Name", "Invoice_Date", "Grand_Total", "Status"], "partsreq": ["Service_Repairs_Certs", "Date", "Owner"], "orders": ["Account_Name", "Division_Billing", "Grand_Total", "Status", "Delivery_Date"], "quotes": ["Subject", "Account_Name", "Equipment_Type", "Grand_Total", "Quote_Stage", "Owner"], "products": ["Product_Code", "Product_Category", "Unit_Price", "Qty_in_Stock", "Location_Store_Rack_Shelf"], "vendors": ["Vendor_Code", "Category", "Credit_Terms", "Phone", "Email"], "jobs": ["Account", "Vehicle_Number", "Service_Type", "Priority", "Status", "Owner"], "accounts": ["Debtor_Code", "Credit_Term", "Region", "Phone", "Owner"], "nea": ["Account_Name", "Vehicle_License_Number", "Hooklift_Brand", "Owner"], "pr": ["Vendor", "Requestor_Name", "Date_of_Request", "Form_Status", "Owner"], "si": ["Requestor_Name", "Account_Name", "Request_Date", "Status"], "deals": ["Account_Name", "New_After_Sales", "Amount", "Stage", "Closing_Date", "Owner"], "tickets": ["Account_Name", "Case_Type", "Priority", "Status", "Owner"]}
SYS_COLS = ("Created_Time", "Modified_Time", "Tag")  # cột hệ thống Legacy CRM có trong list view; prototype lấy từ _created / _tags
ENT_LABEL = {  # tên module hiển thị (vi, en) của CRM mới, đặt lại khác cách gọi của hệ thống cũ
    "leads": ("Khách hàng tiềm năng", "Prospects"), "accounts": ("Khách hàng doanh nghiệp", "Clients"), "contacts": ("Đầu mối liên hệ", "Client contacts"),
    "deals": ("Cơ hội kinh doanh", "Opportunities"), "quotes": ("Chào giá", "Proposals"), "orders": ("Đơn đặt hàng", "Customer orders"),
    "invoices": ("Hoá đơn bán ra", "Customer invoices"), "products": ("Danh mục hàng hoá", "Item catalogue"),
    "jobs": ("Lệnh dịch vụ", "Service orders"), "vehicles": ("Hồ sơ thiết bị", "Installed base"),
    "install": ("Dự án đóng mới", "Fit-out projects"), "si": ("Phiếu xuất kho", "Goods issues"),
    "partsreq": ("Yêu cầu vật tư", "Material requests"), "nea": ("Kiểm định môi trường", "Environmental checks"),
    "tickets": ("Hỗ trợ khách hàng", "Customer support"), "pr": ("Yêu cầu mua sắm", "Purchase requests"),
    "vendors": ("Đối tác cung ứng", "Suppliers"), "tasks": ("Đầu việc", "To-dos"),
}
# Ticket (M19): hệ thống hiện tại chưa dùng module này → model mới đề xuất bổ sung
FIELDS["Cases"] = {
    "Subject": {"label": "Subject", "type": "text", "required": True, "lookup": None, "options": []},
    "Account_Name": {"label": "Account Name", "type": "lookup", "required": True, "lookup": "Accounts", "options": []},
    "Vehicle_Number": {"label": "Vehicle Number", "type": "lookup", "required": False, "lookup": "Vehicle_Number", "options": []},
    "Case_Type": {"label": "Type", "type": "picklist", "required": True, "lookup": None, "options": ["Complaint", "Warranty claim", "Maintenance contract"]},
    "Priority": {"label": "Priority", "type": "picklist", "required": False, "lookup": None, "options": ["High", "Normal", "Low"]},
    "Status": {"label": "Status", "type": "picklist", "required": True, "lookup": None, "options": ["New", "In Progress", "Waiting on Customer", "Resolved", "Closed"]},
    "Due_Date": {"label": "Due / SLA", "type": "date", "required": False, "lookup": None, "options": []},
    "Contract_End": {"label": "Contract End Date", "type": "date", "required": False, "lookup": None, "options": []},
    "Owner": {"label": "Case Owner", "type": "user", "required": True, "lookup": "Users", "options": []},
    "Description": {"label": "Description", "type": "textarea", "required": False, "lookup": None, "options": []},
}
LAYOUTS["Cases"] = [("Standard", [("Case Information", ["Subject", "Account_Name", "Vehicle_Number", "Case_Type", "Priority", "Status", "Due_Date", "Contract_End", "Owner"]), ("Description Information", ["Description"])])]

# Feature gắn với từng phần màn hình (để hiện mã feature ở bản VI)
FEAT = {
    "leads": {"list": "M07.01", "create": "M07.01", "import": "M07.03", "convert": "M07.02"},
    "accounts": {"list": "M05.01", "create": "M05.01", "merge": "M05.04", "related": "M05.03", "credit": "M05.02"},
    "contacts": {"list": "M06.01", "create": "M06.01", "consent": "M06.02"},
    "deals": {"list": "M08.01", "create": "M08.01", "kanban": "M08.03", "status": "M08.04"},
    "quotes": {"list": "M10.01", "create": "M10.02", "status": "M10.06", "lines": "M10.01", "pdf": "M10.07", "esign": "M10.11", "convert": "M10.08", "versions": "M10.10"},
    "orders": {"list": "M11.01", "create": "M11.01", "status": "M11.02", "lines": "M11.01", "sync": "M28.02", "pdf": "M11.04"},
    "invoices": {"list": "M12.01", "lines": "M12.01"},
    "products": {"list": "M09.01", "create": "M09.01", "sync": "M09.02", "price": "M09.04"},
    "jobs": {"list": "M14.01", "create": "M14.01", "kanban": "M14.13", "status": "M14.06", "lines": "M14.04", "quote": "M14.08", "print": "M14.14", "photos": "M14.10"},
    "vehicles": {"list": "M15.01", "create": "M15.01", "expiry": "M15.03", "remind": "M15.05", "related": "M15.04"},
    "install": {"list": "M16.01", "create": "M16.01", "status": "M16.03", "lines": "M16.04", "vo": "M16.06", "deliver": "M16.05"},
    "si": {"list": "M17.02", "create": "M17.02", "status": "M17.02", "lines": "M17.02"},
    "partsreq": {"list": "M17.01", "create": "M17.01", "lines": "M17.01"},
    "nea": {"list": "M18.01", "create": "M18.01"},
    "tickets": {"list": "M19.01", "create": "M19.01", "renew": "M19.02"},
    "pr": {"list": "M20.01", "create": "M20.01", "status": "M20.02", "lines": "M20.01", "comment": "M20.03", "po": "M20.04"},
    "vendors": {"list": "M21.01", "create": "M21.01"},
    "tasks": {"list": "M24.02", "create": "M24.02"},
}
# Thao tác bổ sung (ngoài chuyển trạng thái)
ACTIONS = {
    "leads": [("convert", "Chuyển thành Khách hàng + Đầu mối + Cơ hội", "Convert → Client + Contact + Opportunity", True)],
    "accounts": [("merge", "Gộp bản ghi trùng", "Merge duplicates", False), ("create_deal", "Tạo cơ hội", "New opportunity", True)],
    "contacts": [("consent", "Cập nhật đồng ý nhận tin (Privacy Act)", "Update consent (Privacy Act)", False)],
    "deals": [("create_quote", "Tạo chào giá", "Create proposal", False)],
    "quotes": [("pdf", "Xem / in PDF", "View / print PDF", False), ("esign", "Gửi ký điện tử", "Send for e-signature", False),
               ("versions", "Chào giá lại", "Revise proposal", False), ("convert", "Chuyển → Đơn đặt hàng / Dự án đóng mới", "Convert → Customer order / Fit-out project", False)],
    "orders": [("sync", "Đẩy sang kế toán", "Push to accounting", True), ("pdf", "In đơn đặt hàng", "Print order", False)],
    "products": [("sync", "Đồng bộ từ kế toán", "Sync from accounting", False), ("price", "Bảng giá nhiều mức", "Price tiers", False)],
    "jobs": [("quote", "Tạo chào giá dịch vụ", "Create service proposal", False), ("print", "In lệnh dịch vụ / QR", "Print service order / QR", False)],
    "vehicles": [("create_job", "Mở lệnh dịch vụ", "Open service order", True), ("remind", "Gửi nhắc SMS / WhatsApp", "Send SMS / WhatsApp reminder", False)],
    "install": [("vo", "Variation order", "Variation order", False), ("deliver", "Giao xe & tạo hồ sơ thiết bị", "Deliver & add to installed base", False)],
    "tickets": [("create_job", "Mở lệnh dịch vụ từ yêu cầu", "Open service order from request", True), ("renew", "Tạo cơ hội gia hạn hợp đồng", "Create renewal opportunity", False)],
    "pr": [("po", "Chuyển PO sang kế toán", "Send PO to accounting", False)],
}

# ---------------------------------------------------------------- trạng thái
STATE_TONE = [  # thứ tự ưu tiên: regex → tone
    (r"won|approved|completed|closed$|issued|delivered|resolved|paid|ready|converted|qualified|^done", "ok"),
    (r"lost|reject|cancel|error|not returning|returned|outstanding|overdue|dead|junk", "bad"),
    (r"pending|waiting|review|draft|new request|awaiting|chờ|negotiation|not contacted|^new$", "warn"),
]
JOB_BP = {"After-Sales": "After Sales Service", "Breakdown Service": "Breakdown Service", "Fleet Vehicle Layout": "Fleet Vehicle Blueprint", "Service V2": "Service V2"}
ENT_BP = {"deals": "Deals Follow Up", "pr": "Purchase Form Status", "si": "SI Chit Status"}
# CRM mới: Apex Industrial chỉ cần 1 luồng job (theo diagram của SA1). 4 blueprint trên Legacy CRM là biến thể theo layout,
# gộp về luồng chuẩn After Sales Service; loại job (layout) chỉ còn quyết định form.
JOB_BP_STD = "After Sales Service"
MAIN_PATH = {  # luồng chính để vẽ thanh trạng thái (theo sheet Trạng thái)
    "jobs": ["Assessment in Progress", "Pending Quotation Approval", "Quotation Approved", "Work In Progress 1", "QA/QC", "Completed", "CLOSED"],
    "deals": ["Needs Analysis", "Negotiation/Review", "Quotation", "Quotation Reviewed", "Quotation Approved", "Customer's Review", "Closed Won"],
    "pr": ["Draft", "New Request", "Pending Approval", "Approved", "Completed"],
    "si": ["New Request", "Ready For Collection", "Issued"],
    "tickets": ["New", "In Progress", "Waiting on Customer", "Resolved", "Closed"],
    "quotes": ["Draft", "Negotiation", "Quotation", "Waiting For Approval", "Confirmed", "Delivered", "Closed Won"],
    "leads": ["Not Contacted", "Attempted to Contact", "Contacted", "Pre-Qualified"],
    "orders": ["New", "Kick-Off Meeting", "Equipment in Progress", "Waiting for Chassis", "Work In Progress", "Delivered"],
    "install": ["On-Going", "Waiting for Chassis", "WIP - Fabrication & Electrical", "WIP - Pending Painting", "WIP - Pending Vehicle Registration", "WIP - Pending Delivery", "Delivered"],
    "invoices": ["Created", "Approved", "Delivered"],
    "tasks": ["Not Started", "In Progress", "Waiting for input", "Completed"],
}
TRANS = [dict(zip(["bp", "from", "action", "to", "req"], t)) for t in om_ns["TRANS"]]


def tone(state):
    s = str(state).lower()
    for rx, t in STATE_TONE:
        if re.search(rx, s):
            return t
    return "info"


# ---------------------------------------------------------------- object model
def ent_fields(key):
    api = ENT[key][0]
    fields = FIELDS.get(api, {})
    lays = LAYOUTS.get(api, [])
    used = []
    for _, secs in lays:
        for _, fl in secs:
            for f in fl:
                if f not in used and f in fields:
                    used.append(f)
    out = {}
    for f in used:
        d = dict(fields[f])
        if f in PERSON_FIELDS:
            d["options"] = []
            d["person"] = True
        d["options"] = d["options"][:40]
        if d["type"] == "subform":
            sub = FIELDS.get(d["lookup"] or "", {})
            d["columns"] = [{"api": a, "label": v["label"], "type": v["type"], "lookup": v["lookup"]} for a, v in sub.items()
                            if a not in ("Parent_Id", "Created_Time", "Modified_Time", "Layout", "Line_Tax") and not a.endswith("Serial_Number") and a != "Sequence_Number"]
        out[f] = d
    return out


API2KEY = {v[0]: k for k, v in ENT.items()}
meta_entities = {}
for key, (api, mod, icon, group, n, title, sub, cols, status) in ENT.items():
    fields = ent_fields(key)
    states = MAIN_PATH.get(key)
    if not states and status and status in fields:
        states = fields[status]["options"]
    layouts = [{"name": lay, "sections": [{"name": s, "fields": [f for f in fl if f in fields]} for s, fl in secs if any(f in fields for f in fl)]}
               for lay, secs in LAYOUTS.get(api, [])]
    transitions = []
    bps = [JOB_BP_STD] if key == "jobs" else ([ENT_BP[key]] if key in ENT_BP else [])
    for t in TRANS:
        if t["bp"] in bps:
            transitions.append({"bp": t["bp"], "from": [x.strip() for x in t["from"].split(" / ")], "action": t["action"], "to": t["to"],
                                "req": t["req"]})
    if key == "jobs":  # luồng chuẩn thiếu bước đóng job → lấy "Close Job" từ blueprint Breakdown Service
        t = next(t for t in TRANS if t["bp"] == "Breakdown Service" and t["action"] == "Close Job")
        transitions.append({"bp": JOB_BP_STD, "from": ["Completed"], "action": t["action"], "to": t["to"], "req": t["req"]})
    related = []
    for k2, v2 in ENT.items():
        for fa, fd in ent_fields(k2).items():
            if fd["type"] == "lookup" and fd["lookup"] == api and k2 != key:
                related.append({"entity": k2, "field": fa})
    seen = set()
    related = [r for r in related if not (r["entity"] in seen or seen.add(r["entity"]))]
    all_states = sorted({s for t in transitions for s in t["from"] + [t["to"]] if s and s != "-None-"} | set(states or []))
    meta_entities[key] = {
        "key": key, "api": api, "module": mod, "module_name": FL["modules"].get(mod, {}).get("name", ""), "icon": icon, "group": group,
        "label": {"vi": ENT_LABEL[key][0], "en": ENT_LABEL[key][1]},
        "title": title, "subtitle": sub, "list": [c for c in cols if c in fields or c in SYS_COLS], "status": status if status in fields else None,
        "states": states or [], "tones": {s: tone(s) for s in all_states}, "transitions": transitions,
        "bp_by_layout": {"*": JOB_BP_STD} if key == "jobs" else ({} if key not in ENT_BP else {"*": ENT_BP[key]}),
        "layouts": layouts, "fields": fields, "related": related, "feat": FEAT.get(key, {}),
        "actions": [{"id": a, "label": {"vi": vi, "en": en}, "primary": p, "feat": FEAT.get(key, {}).get(a.split("_")[0], FEAT.get(key, {}).get("list"))}
                    for a, vi, en, p in ACTIONS.get(key, [])],
        "source": "new" if key == "tickets" else "legacy",
    }

# ---------------------------------------------------------------- dummy data
DATA = {k: [] for k in ENT}


def rdate(a=-120, b=120):
    return (TODAY + timedelta(days=rnd.randint(a, b))).isoformat()


def rdt(a=-30, b=0):
    d = datetime(2026, 10, 27, 9, 0) + timedelta(days=rnd.randint(a, b), minutes=rnd.randint(0, 600))
    return d.strftime("%Y-%m-%dT%H:%M")


def pick_ref(key):
    rows = DATA.get(key) or []
    if not rows:
        return None
    r = rnd.choice(rows)
    return {"id": r["id"], "name": r["_title"]}


TEXT_RULES = [  # (regex tên field, hàm(i = chỉ số bản ghi, a = tên field)); địa chỉ / điện thoại / biển số theo bối cảnh Úc ở đầu file
    (r"Serial", lambda i, a: f"SN-{rnd.randint(10000, 99999)}"), (r"Model", lambda i, a: rnd.choice(["10T", "8T", "1500", "20T", "15T", "M-200"])),
    (r"Phone|Mobile|Contact$|_Contact$", lambda i, a: au_phone(a, i)),
    (r"Street|Address", lambda i, a: f"{rnd.randint(1, 99)} Example Road"), (r"City", lambda i, a: site(i)[0]),
    (r"Country|Origin", lambda i, a: rnd.choice(["Australia", "Australia", "Germany", "Japan"])),  # 4 lựa chọn như cũ; pháp nhân ở Singapore: Australia → Singapore (to_sg)
    (r"Postal|Zip|_Code$", lambda i, a: au_postcode(i)),
    (r"Remark|Note|Description|Diagnostic|Problem|Work_Done|Scope|Follow|Instruction|Agenda", lambda i, a: rnd.choice(SENTENCES)),
    (r"Registration|License|Vehicle_No$", lambda i, a: rand_plate()),
    (r"Project_Number|Project_No", lambda i, a: f"{rnd.choice(['EI', 'EW', 'AZ', 'AW'])}-{rnd.randint(1000, 1999)}"),
    (r"Debtor", lambda i, a: f"D{3001 + i}"), (r"Website", lambda i, a: "www.example.com"),
    (r"Number|_No$|No_|Doc", lambda i, a: f"{rnd.randint(1000, 9999)}"),
]


SPECIAL = {
    "Postal_Code": au_postcode, "Zip_Code": au_postcode,
    "Product_Code": lambda i: f"6{rnd.randint(10000, 99999)}",  # mã hàng ở dòng yêu cầu mua sắm (không phải mã bưu chính)
    "Debtor_Code": lambda i: f"D{3001 + rnd.randint(0, 11)}", "Billing_Country": lambda i: "Australia", "Shipping_Country": lambda i: "Australia",
    "Vehicle_No": lambda i: rand_plate(),
    "Mileage_Hour": lambda i: f"{rnd.randint(20, 180) * 1000:,} km / {rnd.randint(500, 4000):,} h",
    "Man_Hours": lambda i: str(rnd.choice([2, 4, 6.5, 8, 12])),
}


def gen_value(key, api, fd, i):
    t = fd["type"]
    if api in SPECIAL and t not in ("lookup", "user"):
        return SPECIAL[api](i)
    if api == "Vehicle_Number" and t == "text":
        return SPECIAL["Vehicle_No"](i)
    if fd.get("person"):
        return rnd.choice(STAFF + TECHS) if "Tech" in api else rnd.choice(STAFF)
    if t == "user":
        return rnd.choice(STAFF)
    if t in ("picklist",):
        return rnd.choice(fd["options"]) if fd["options"] else None
    if t == "multipicklist":
        return rnd.sample(fd["options"], min(2, len(fd["options"]))) if fd["options"] else None
    if t == "date":
        if "Expiry" in api or "Expiration" in api:
            return rdate(-20, 300)
        return rdate()
    if t == "datetime":
        return rdt()
    if t == "checkbox":
        return rnd.random() < 0.5
    if t in ("int",):
        return rnd.randint(1, 12)
    if t in ("decimal", "percent"):
        return round(rnd.uniform(1, 100), 1)
    if t in ("currency",):
        return round(rnd.choice([450, 890, 1240, 5400, 12500, 45780, 96000, 185000]) * rnd.uniform(0.9, 1.1), 2)
    if t == "email":
        return f"contact{i + 1}@example.com"
    if t == "phone":
        return au_phone(api, i)
    if t == "url":
        return "https://www.example.com"
    if t == "lookup":
        tgt = API2KEY.get(fd["lookup"] or "")
        return pick_ref(tgt) if tgt and tgt != key else None
    if t in ("image", "file", "formula", "subform", "multilookup", "autonumber"):
        return None
    for rx, fn in TEXT_RULES:
        if re.search(rx, api):
            return fn(i, api)
    return None


TENANT_W = ["APE"] * 6 + ["APA", "APL", "FLE", "BH"]


def make(key, i, fixed):
    m = meta_entities[key]
    rec = {"id": f"{key[:2]}{i + 1}", "_tenant": rnd.choice(TENANT_W) if i > 1 else "APE",
           "_layout": rnd.choice(m["layouts"])["name"] if m["layouts"] else None}
    rate = gst_rate(rec["_tenant"])  # GST của pháp nhân (Úc 10%, Singapore 9%)
    for api, fd in m["fields"].items():
        if api in fixed:
            continue
        v = gen_value(key, api, fd, i)
        if v is not None and (fd["required"] or api in FILL.get(key, ()) or rnd.random() < 0.85):
            rec[api] = v
    rec.update(fixed)
    for api, fd in m["fields"].items():  # subform
        if fd["type"] == "subform" and fd.get("columns"):
            rows = []
            for j in range(rnd.randint(2, 4)):
                row = {}
                for c in fd["columns"]:
                    a = c["api"]
                    if c["type"] == "lookup" and c["lookup"] == "Products":
                        code, name, price = PRODUCTS[(i + j * 3) % len(PRODUCTS)]
                        row[a] = {"id": f"pr{(i + j * 3) % len(PRODUCTS) + 1}", "name": name}
                        row["_price"] = price
                    elif c["type"] == "lookup" and c["lookup"] == "Vendors":
                        row[a] = {"id": f"ve{rnd.randint(1, 8)}", "name": rnd.choice(VENDORS)}
                    elif re.search(r"Quantity|Qty", a):
                        row[a] = rnd.randint(1, 4)
                    elif a in ("List_Price",):
                        row[a] = row.get("_price", rnd.choice([120, 450, 6500]))
                    elif a == "Discount":
                        row[a] = 0
                    elif a in ("Tax",):
                        row[a] = None
                    elif c["type"] in ("text", "textarea"):
                        row[a] = gen_value(key, a, {"type": "text", "options": [], "required": False}, j) or rnd.choice(SENTENCES)
                    elif c["type"] == "picklist":
                        row[a] = None
                    elif c["type"] == "date":
                        row[a] = rdate(-10, 30)
                    elif c["type"] in ("int",):
                        row[a] = rnd.randint(0, 40)
                for a in list(row):
                    if row[a] is None:
                        del row[a]
                q = next((row[a] for a in row if re.search(r"Quantity|Qty", a)), 1)
                p = row.get("List_Price")
                if p is not None:
                    row["Total"] = round(q * p, 2)
                    row["Net_Total"] = round(q * p * (1 + rate), 2)
                row.pop("_price", None)
                rows.append(row)
            rec[api] = rows
            subtotal = sum(r.get("Total", 0) for r in rows)
            if subtotal and "Sub_Total" in m["fields"]:
                rec["Sub_Total"] = round(subtotal, 2)
                for tx in ("Total_Tax", "Tax", "Total_Tax_GST"):
                    if tx in m["fields"]:
                        rec[tx] = round(subtotal * rate, 2)
                rec["Grand_Total"] = round(subtotal * (1 + rate), 2)
                rec["Discount"] = 0
                rec["Adjustment"] = 0
    rec["_title"] = " ".join(str(rec.get(f) or "") for f in m["title"]).strip() or rec["id"]
    DATA[key].append(rec)
    return rec


def status_for(key, i, rec):
    m = meta_entities[key]
    st = m["states"]
    if key == "jobs":
        bp = JOB_BP.get(rec.get("_layout"))
        pool = st + ["Pending Spare Part(s)", "Work In Progress 2", "Completed with Outstanding"]
        return pool[i % len(pool)]
    return st[i % len(st)] if st else None


ORDER = ["vendors", "products", "accounts", "contacts", "leads", "vehicles", "deals", "quotes", "orders", "install", "invoices",
         "jobs", "si", "partsreq", "pr", "nea", "tickets", "tasks"]
for key in ORDER:
    m = meta_entities[key]
    n = ENT[key][4]
    for i in range(n):
        fx = {}
        if key == "vendors":
            fx = {"Vendor_Name": VENDORS[i % len(VENDORS)], "Vendor_Code": f"V-{i + 1:03d}"}
        elif key == "products":
            code, name, price = PRODUCTS[i % len(PRODUCTS)]
            fx = {"Product_Name": name, "Product_Code": code, "Unit_Price": price, "Cost_Price": round(price * 0.72), "Qty_in_Stock": rnd.randint(0, 140)}
        elif key == "accounts":
            fx = {"Account_Name": COMPANIES[i % len(COMPANIES)], "Debtor_Code": f"D{3001 + i}"}
        elif key in ("contacts", "leads"):
            fx = {"First_Name": FIRST[i % len(FIRST)], "Last_Name": LAST[(i * 3) % len(LAST)]}
            if key == "leads":
                fx["Company"] = COMPANIES[(i + 5) % len(COMPANIES)].replace(" Pty Ltd", "")
                fx["Lead_Source"] = rnd.choice(["Phone", "WhatsApp", "Email", "Web form", "Walk-in", "Exhibition"])
        elif key == "vehicles":
            fx = {"Name": au_plate("X", 'ABCDEFGHJKLMNP'[i], 1234 + i * 111, 'XKMPZ'[i % 5])}
            if i < 3:
                fx["LM_Expiry_Date"] = (TODAY + timedelta(days=[16, 24, 34][i])).isoformat()
        elif key == "deals":
            acc = DATA["accounts"][i % 12]
            fx = {"Deal_Name": f"{['Crane 10T', 'Tailgate x3', 'Hooklift 20T', 'Service contract', 'Crane 8T', 'Overhaul'][i % 6]} - {acc['Account_Name'].split()[0]}",
                  "Account_Name": {"id": acc["id"], "name": acc["_title"]}, "Amount": [185000, 42000, 96000, 12000, 120000, 8400][i % 6]}
        elif key == "quotes":
            acc = DATA["accounts"][i % 12]
            fx = {"Sales_Agreement_No": f"APE26-{788 + i:04d}", "Account_Name": {"id": acc["id"], "name": acc["_title"]},
                  "Subject": rnd.choice(["Crane 10T knuckle boom", "Tailgate 1500kg x3", "Hooklift 20T + OTC", "After-sales repair", "Plant registration"])}
        elif key == "orders":
            acc = DATA["accounts"][i % 12]
            fx = {"Sales_Order_Number": f"APE-SO-26-{41 + i:04d}", "Account_Name": {"id": acc["id"], "name": acc["_title"]},
                  "Subject": rnd.choice(["Crane 10T", "Tailgate", "Hooklift", "Service parts"])}
        elif key == "invoices":
            fx = {"Invoice_Number": f"INV-26-{912 + i * 17:04d}", "Subject": "Deposit invoice" if i % 2 else "Final invoice"}
        elif key == "jobs":
            v = DATA["vehicles"][i % 14]
            fx = {"Document_Number1": f"AS-26-{1201 + i}", "Name": rnd.choice(["Troubleshoot & repair", "Plant registration", "Annual service", "Breakdown recovery"]),
                  "Vehicle_Number": {"id": v["id"], "name": v["_title"]}, "Account": v.get("Account_Name") or pick_ref("accounts")}
        elif key == "install":
            fx = {"Name": f"NI-26-{331 + i:04d}", "Subject": rnd.choice(["Crane installation", "Hook lift installation", "Tail lift installation", "Variation order"])}
        elif key == "si":
            fx = {"Name": f"SI-{457 + i:04d}"}
        elif key == "partsreq":
            fx = {"Name": f"PRQ-{91 + i:04d}", "Service_Repairs_Certs": pick_ref("jobs")}
        elif key == "pr":
            fx = {"Name": f"PR-26-{182 + i:04d}", "Vendor": pick_ref("vendors")}
        elif key == "nea":
            fx = {"Name": f"EPA-{12 + i:04d}"}
        elif key == "tickets":
            fx = {"Subject": rnd.choice(["Tailgate noisy when lifting", "Hydraulic leak after service", "12-month maintenance contract", "Warranty claim for remote"]),
                  "Account_Name": pick_ref("accounts")}
        elif key == "tasks":
            fx = {"Subject": ["Approve quotation", "Call back customer", "QA/QC check", "Send plant rego reminders", "Collect deposit", "Site visit"][i % 6],
                  "Due_Date": (TODAY + timedelta(days=rnd.randint(-2, 6))).isoformat()}
        rec = make(key, i, fx)
        if m["status"]:
            s = status_for(key, i, rec)
            if s:
                rec[m["status"]] = s
        if i == 0:
            rec["Owner"] = "Minh N."
        rec["_created"] = rdt(-60, -1)

# ---------------------------------------------------------------- bổ sung theo Feature list v0.4 (field CRM mới, Legacy CRM chưa có)
# Dùng Random riêng để dữ liệu sinh ở trên giữ nguyên.
rx = random.Random(4)


def add_field(key, api, label, ftype, section=0, options=None, columns=None, lookup=None, feat=None):
    m = meta_entities[key]
    m["fields"][api] = {"label": label, "type": ftype, "required": False, "lookup": lookup, "options": options or [], "feat": feat}
    if columns:
        m["fields"][api]["columns"] = columns
    for lay in m["layouts"]:
        if lay["sections"]:
            lay["sections"][min(section, len(lay["sections"]) - 1)]["fields"].append(api)


# M14.07 mã project của job
add_field("jobs", "Project_Code", "Project Code", "text", feat="M14.07")
for i, r in enumerate(DATA["jobs"]):
    r["Project_Code"] = f"P26-{410 + i // 2:04d}"
# M05.05 account cha – con
add_field("accounts", "Parent_Account", "Parent Account", "lookup", lookup="Accounts", feat="M05.05")
for i in (3, 7, 9):
    p = DATA["accounts"][0 if i < 8 else 1]
    DATA["accounts"][i]["Parent_Account"] = {"id": p["id"], "name": p["_title"]}
# M15.02 xe gắn nhiều khách (chủ xe, bên thuê, chủ cũ)
add_field("vehicles", "Linked_Accounts", "Linked Customers", "subform", section=9, feat="M15.02", columns=[
    {"api": "Account", "label": "Customer", "type": "text", "lookup": None},
    {"api": "Relation", "label": "Relation", "type": "text", "lookup": None},
    {"api": "From", "label": "From", "type": "date", "lookup": None}])
for i, r in enumerate(DATA["vehicles"]):
    other = DATA["accounts"][(i + 4) % len(DATA["accounts"])]
    r["Linked_Accounts"] = [{"Account": (r.get("Account_Name") or {}).get("name", ""), "Relation": "Owner", "From": "2024-03-01"},
                            {"Account": other["_title"], "Relation": rx.choice(["Lessee", "Previous owner", "Operator"]), "From": "2025-07-15"}]
# M28.03 trạng thái thanh toán nhận từ kế toán
add_field("invoices", "Payment_Status", "Payment Status (accounting)", "picklist", options=["Paid", "Partially Paid", "Unpaid", "Overdue"], feat="M28.03")
add_field("invoices", "Last_Synced", "Last Synced from Accounting", "datetime", feat="M28.03")
for r in DATA["invoices"]:
    r["Payment_Status"] = rx.choice(["Paid", "Paid", "Partially Paid", "Unpaid", "Overdue"])
    r["Last_Synced"] = rdt(-2, 0)
meta_entities["invoices"]["list"].append("Payment_Status")
meta_entities["products"]["fields"]["Location_Store_Rack_Shelf"]["feat"] = "M09.03"  # vị trí kho

# vài task quá hạn để minh hoạ cảnh báo trên Việc của tôi / trang chủ
for tid, due in (("ta1", "2026-10-24"), ("ta2", "2026-10-26")):
    next(r for r in DATA["tasks"] if r["id"] == tid)["Due_Date"] = due

# báo giá → Sales Order (Legacy CRM: field "Quote for SO" + related list): báo giá đã chốt gắn với 1 SO cùng khách, cùng pháp nhân; SO giữ _quote để hiện tab ở báo giá
meta_entities["quotes"]["related"].insert(0, {"entity": "orders", "field": "_quote"})
used = set()
for q in DATA["quotes"]:
    if q.get("Quote_Stage") not in ("Delivered", "Closed Won") or not q.get("Account_Name"):
        continue
    so = next((o for o in DATA["orders"] if o["id"] not in used and o["_tenant"] == q["_tenant"] and (o.get("Account_Name") or {}).get("id") == q["Account_Name"]["id"]), None)
    if so:
        used.add(so["id"]); so["_quote"] = {"id": q["id"], "name": q["_title"]}; so["Quotation_No"] = q["_title"]
        q["Quote_for_SO"] = {"id": so["id"], "name": so["_title"]}

# Sales Order: ngày hợp lý (không dùng rnd) — giao sau ngày tạo; ngày hoá đơn không ở tương lai; đơn đã giao đã đẩy sang kế toán
for o in DATA["orders"]:
    n, c = int(re.sub(r"\D", "", o["id"])), datetime.strptime(o["_created"][:10], "%Y-%m-%d").date()
    if o.get("Status") == "Delivered":
        dd = min(c + timedelta(days=10 + n * 3 % 20), TODAY - timedelta(days=4))
        o["Delivery_Date"], o["Date_of_Invoice"] = dd.isoformat(), (dd + timedelta(days=3)).isoformat()
        o["_synced"] = (dd + timedelta(days=1)).isoformat() + "T10:30"
    else:
        o["Delivery_Date"] = max(c + timedelta(days=30 + n * 11 % 90), TODAY + timedelta(days=7)).isoformat()
        if o.get("Date_of_Invoice"):  # chưa rõ SO trên Legacy CRM tạo lúc chốt đơn hay lúc xuất hoá đơn → giữ số hoá đơn, ngày hoá đơn không ở tương lai
            o["Date_of_Invoice"] = min(c + timedelta(days=n % 5), TODAY).isoformat()
    o["_modified"] = min(c + timedelta(days=1 + n % 9), TODAY).isoformat() + o["_created"][10:]

# người liên hệ của khách không gắn nhà cung cấp; ngày sinh nằm trong quá khứ (không dùng rnd để không đổi dữ liệu khác)
for r in DATA["contacts"]:
    if r.get("Account_Name"):
        r.pop("Vendor_Name", None)
    if r.get("Date_of_Birth"):
        n = int(r["id"][2:])
        r["Date_of_Birth"] = f"{1965 + n * 7 % 30}{r['Date_of_Birth'][4:]}"

# M22.01 / M22.02 hồ sơ duyệt theo DoA (giả): giá trị PR, % chiết khấu, biên LN, lý do gửi, ngày gửi, bước hiện tại, lịch sử các bước đã duyệt.
# Bậc duyệt lấy từ meta/config/approval_rules.json; step = số bậc đã duyệt xong.
APPR_REASONS = {"quotes": ["Existing customer, competing with Hydrax on price", "Fleet deal for 3 trucks, closing this month", "Customer needs delivery before EOFY"],
                "pr": ["Parts urgently needed for a job in progress", "Only supplier with stock on hand", "Restock fast-moving spare parts"]}
APPR = {  # id: (trạng thái chờ duyệt, step, % CK, biên LN %, ngày gửi, giá trị PR)
    "qu2": (0, 6.0, 21.5, "2026-10-26", None), "qu3": (2, 4.0, 19.0, "2026-10-23", None), "qu4": (0, 12.0, 14.5, "2026-10-24", None),
    "qu11": (1, 8.0, 18.0, "2026-10-22", None),
    "pr3": (0, None, None, "2026-10-26", 3200), "pr7": (0, None, None, "2026-10-27", 1850), "pr8": (1, None, None, "2026-10-21", 12400),
}
APPR_BY = {"Sales Manager": "Minh N.", "Sales Director": "Rob S.", "General Manager": "Hana M.", "Operation Manager": "Mark T."}
RULES = json.load(open(os.path.join(CONF, "approval_rules.json"), encoding="utf-8"))["approval_rules"]
for key, field, pending in (("quotes", "Quote_Stage", "Waiting For Approval"), ("pr", "Form_Status", "Pending Approval")):
    for r in DATA[key]:
        if r["id"] not in APPR:
            continue
        step, disc, margin, since, amt = APPR[r["id"]]
        r[field] = pending
        value = float(r.get("Grand_Total") or amt)
        doc = "quotes" if key == "quotes" else "pr"
        levels = next(x["levels"] for x in RULES if x["doc"] == doc and (x["cond"].startswith("≥") == (value >= (50000 if doc == "quotes" else 5000))))
        if disc and disc > 10:  # chiết khấu > 10% cần thêm Sales Director
            levels = levels + [lv for lv in next(x["levels"] for x in RULES if x["doc"] == "discount") if lv not in levels]
        r["_approval"] = {"levels": levels, "amount": value, "disc": disc, "margin": margin, "reason": APPR_REASONS[doc][int(r["id"][2:]) % 3], "since": since, "step": step,
                          "history": [{"level": lv, "by": APPR_BY[lv], "act": "approved", "note": rx.choice(["", "OK", "Approved, please watch the delivery schedule"]),
                                       "at": since + "T1" + str(i) + ":30"} for i, lv in enumerate(levels[:step])]}

# ---------------------------------------------------------------- dữ liệu theo pháp nhân
# Chạy sau cùng, Random riêng: dữ liệu APE dùng trong kịch bản demo giữ nguyên.
rt = random.Random(27)
TENANTS = ["APE", "APA", "APL", "FLE", "BH"]
OWNERS = {tn: [u["name"] for u in USERS if u.get("seed", True) and tn in u.get("tenants", [])] for tn in TENANTS}
KEEP = set(APPR) | {"ta1", "ta2"}  # bản ghi gắn với duyệt / task quá hạn: không nhân bản

# 1) mỗi pháp nhân có tối thiểu vài bản ghi ở mỗi module (nhân bản từ APE, đổi số chứng từ, tên khách, chủ sở hữu)
MIN_REC = {"accounts": 3, "contacts": 3, "leads": 2, "deals": 3, "quotes": 3, "orders": 2, "products": 3, "jobs": 3, "vehicles": 3,
           "vendors": 2, "install": 2, "invoices": 2, "si": 2, "partsreq": 1, "nea": 1, "tickets": 1, "pr": 2, "tasks": 2}
for key in ORDER:
    m = meta_entities[key]
    src = [r for r in DATA[key] if r["_tenant"] == "APE" and r["id"] not in KEEP]
    for ti, tn in enumerate(TENANTS[1:], 1):
        have = sum(r["_tenant"] == tn for r in DATA[key])
        for c in range(max(0, MIN_REC[key] - have)):
            r = copy.deepcopy(src[(ti * 3 + c) % len(src)])
            n = len(DATA[key]) + 1
            for k in ("_approval", "_quote", "Quote_for_SO", "Quotation_No"):
                r.pop(k, None)
            r.update(id=f"{key[:2]}{n}", _tenant=tn, Owner=rt.choice(OWNERS[tn]))
            apply_gst(r, m["fields"])  # thuế theo GST của pháp nhân mới
            for f in m["title"]:  # số chứng từ: đổi tiền tố pháp nhân và số thứ tự
                if isinstance(r.get(f), str) and re.search(r"\d", r[f]):
                    r[f] = re.sub(r"\d+$", lambda x: str(int(x.group()) + 200 * ti + c).zfill(len(x.group())), r[f].replace("APE", tn))
            if key == "accounts":
                r["Account_Name"] = COMPANIES[(n + ti) % len(COMPANIES)]
                r["Debtor_Code"] = f"{tn[0]}{3100 + n}"  # chữ cái đầu mã pháp nhân: Apex → A, Forgeline → F, Blue Harbor → B
            elif key in ("contacts", "leads"):
                r["First_Name"], r["Last_Name"] = FIRST[(n * 5) % len(FIRST)], LAST[(n * 7) % len(LAST)]
            elif key == "vehicles":
                r["Name"] = au_plate("X", 'ABCDEFGHJKLMNP'[n % 14], 2000 + n * 37, 'XKMPZ'[n % 5])  # pháp nhân ở Singapore: đổi sang biển Singapore ở bước 4
            r["_title"] = " ".join(str(r.get(f) or "") for f in m["title"]).strip() or r["id"]
            DATA[key].append(r)

# 2) liên kết (lookup) chỉ trỏ tới bản ghi cùng pháp nhân
BY_ID = {k: {r["id"]: r for r in rows} for k, rows in DATA.items()}


def same_tenant(rec, api, tgt, prefer=None):
    cands = [r for r in DATA[tgt] if r["_tenant"] == rec["_tenant"]]
    if prefer:
        cands = [r for r in cands if prefer(r)] or cands
    if not cands:
        return None
    r = cands[sum(map(ord, rec["id"] + api)) % len(cands)]
    return {"id": r["id"], "name": r["_title"]}


for key in ORDER:
    fields = meta_entities[key]["fields"]
    for rec in DATA[key]:
        for api, fd in sorted(fields.items(), key=lambda x: x[0] not in ("Account_Name", "Account")):  # khách trước, rồi người liên hệ / xe của khách đó
            v = rec.get(api)
            acc = next((x["id"] for x in (rec.get("Account_Name"), rec.get("Account")) if isinstance(x, dict)), None)
            if fd["type"] == "lookup" and isinstance(v, dict) and v.get("id"):
                tgt = API2KEY.get(fd["lookup"] or "")
                cur = BY_ID.get(tgt, {}).get(v["id"]) if tgt else None
                if not tgt or (cur and cur["_tenant"] == rec["_tenant"]):
                    continue
                pref = (lambda r: (r.get("Account_Name") or {}).get("id") == acc) if tgt in ("contacts", "vehicles") and acc else None
                new = same_tenant(rec, api, tgt, pref)
                if new:
                    rec[api] = new
                else:
                    rec.pop(api)
            elif fd["type"] == "subform" and isinstance(v, list):
                for row in v:
                    for a, x in row.items():
                        if isinstance(x, dict) and x.get("id") and a in ("Product_Name", "Products", "Product"):
                            p = BY_ID["products"].get(x["id"])
                            if p and p["_tenant"] != rec["_tenant"]:
                                row[a] = same_tenant(rec, a + str(v.index(row)), "products") or x
        if key == "jobs" and isinstance(rec.get("Vehicle_Number"), dict):  # khách của job = chủ xe
            veh = BY_ID["vehicles"].get(rec["Vehicle_Number"]["id"])
            if veh and veh.get("Account_Name"):
                rec["Account"] = veh["Account_Name"]
        if key == "deals" and isinstance(rec.get("Account_Name"), dict):  # tên deal theo khách
            rec["Deal_Name"] = rec["Deal_Name"].split(" - ")[0] + " - " + rec["Account_Name"]["name"].split()[0]
            rec["_title"] = rec["Deal_Name"]

for o in DATA["orders"]:  # SO tạo từ báo giá: cùng khách với báo giá
    q = BY_ID["quotes"].get((o.get("_quote") or {}).get("id"))
    if q and q.get("Account_Name"):
        o["Account_Name"] = q["Account_Name"]

# 3) ngày phát sinh không ở tương lai (ngày hết hạn, giao hàng, hạn xử lý… thì được)
FUTURE_OK = re.compile(r"Expir|Due|Delivery|Closing|Ready|Start|End|Estimated|Collection|Inspection|Warrant|Support|Sales_|Schedul|Follow|Next")
for key in ORDER:
    for rec in DATA[key]:
        made = rec["_created"][:10]
        for api, fd in meta_entities[key]["fields"].items():
            v = rec.get(api)
            if fd["type"] != "date" or not isinstance(v, str) or v <= TODAY.isoformat() or FUTURE_OK.search(api):
                continue
            n = int(re.sub(r"\D", "", rec["id"]) or 0)
            rec[api] = (TODAY - timedelta(days=365 * (1 + n % 6) + n)).isoformat() if re.search("Manufact|Purchase", api) else made
        if key == "quotes" and rec.get("Date1"):  # ngày báo giá = ngày tạo
            rec["Date1"] = made
        if key == "invoices" and rec.get("Invoice_Date") and rec.get("Due_Date"):
            rec["Due_Date"] = (date.fromisoformat(rec["Invoice_Date"]) + timedelta(days=30)).isoformat()

# 4) pháp nhân ở Singapore (tenants.json: country = SG): điện thoại, khu công nghiệp, mã bưu chính, biển số, "Pte Ltd" theo Singapore
SG_TENANTS = {c for c, t in TENANT_CFG.items() if t.get("country") == "SG"}
for key in ORDER:
    for rec in DATA[key]:
        if rec["_tenant"] in SG_TENANTS:
            rec.update({f: to_sg(v, f) for f, v in rec.items()})

# ---------------------------------------------------------------- app meta
FEATURES ={k: {"n": v["n"], "p": v["p"]} for k, v in FL["features"].items()}
APP = {  # phần sinh tự động; cấu hình sửa tay nằm ở mock-api/meta/config/*.json
    "org": {
        "hierarchy": "Role Hierarchy",
        "roles": [{"name": r, "parent": p, "peer": bool(peer)} for r, p, peer in om_ns["ROLES"]],
        "profiles": om_ns["PROFILES"], "groups": om_ns["GROUPS"],
        "default_perm": [{"entity": e, "module": m, "level": lv} for e, _, m, lv in om_ns["DEFAULT"]],
        "sharing": [dict(zip(["entity", "module", "from", "to", "perm", "superiors"], l.split("|"))) for l in om_ns["SHARING"].splitlines()],
        "territories": ["Forgeline Engineering Pty Ltd"],
    },
    "blueprints": [dict(zip(["name", "entity", "api", "module", "layout", "field", "status"], b),
                        crm="std" if b[0] == JOB_BP_STD or (b[0] in ENT_BP.values()) else "merged" if b[0] in JOB_BP.values() else "off")
                   for b in om_ns["BLUEPRINTS"]],
    "features": FEATURES,
    "counts_legacy": {"accounts": 5000, "contacts": 3500, "leads": 150, "deals": 1200, "quotes": "10,000+", "orders": "10,000+",  # theo key module; app hiện tên module
                      "products": 10000, "vehicles": 5000, "jobs": "10,000+", "install": 400, "vendors": 700, "pr": 200},
}

# >>> tên hiển thị CRM mới
# Nguồn (layout, blueprint, Entity List, feature list) giữ tên cấu hình của hệ thống cũ. Prototype đặt lại tên module / màn / quy trình /
# loại biểu mẫu theo cách gọi của CRM mới (cùng nghĩa). Áp sau cùng: phần sinh dữ liệu ở trên không đổi, chỉ đổi giá trị hiển thị.
MODULE_NAME = {  # module_name (hiện sau mã feature ở bản VI)
    "M05": "Khách hàng doanh nghiệp", "M06": "Đầu mối liên hệ", "M07": "Khách hàng tiềm năng", "M08": "Cơ hội kinh doanh",
    "M09": "Danh mục hàng hoá, vật tư, dịch vụ", "M10": "Chào giá / hợp đồng mua bán", "M11": "Đơn đặt hàng",
    "M12": "Hoá đơn bán ra, thanh toán (đồng bộ từ kế toán)", "M14": "Lệnh dịch vụ", "M15": "Hồ sơ thiết bị (xe, thiết bị của khách)",
    "M16": "Dự án đóng mới, lắp thiết bị lên xe", "M17": "Vật tư cho lệnh dịch vụ", "M18": "Kiểm định môi trường",
    "M19": "Hỗ trợ khách hàng, hợp đồng bảo trì", "M20": "Yêu cầu mua sắm", "M21": "Đối tác cung ứng", "M24": "Ghi chú, tệp, đầu việc",
}
FEATURE_NAME = {  # tên feature (tooltip mã feature ở bản VI)
    "M02.05": "Menu & thành viên theo bộ phận", "M03.05": "Quy tắc biểu mẫu, kiểm tra dữ liệu, picklist phụ thuộc",
    "M04.01": "Nhật ký thao tác ≥ 7 năm", "M04.02": "Tra cứu, xuất nhật ký thao tác", "M04.04": "Bản ghi đã xoá (khôi phục được)",
    "M05.01": "Quản lý khách hàng doanh nghiệp", "M05.05": "Khách hàng cha – con", "M06.01": "Quản lý đầu mối liên hệ", "M06.02": "Đồng ý nhận tin (Privacy Act)",
    "M07.01": "Quản lý khách hàng tiềm năng", "M07.02": "Chuyển đổi khách hàng tiềm năng", "M07.03": "Nhập khách hàng tiềm năng từ web form / Excel",
    "M08.01": "Quản lý cơ hội theo giai đoạn", "M08.04": "Bước bắt buộc khi chuyển giai đoạn",
    "M10.01": "Tạo chào giá nhiều dòng hàng", "M10.06": "Duyệt chào giá / chiết khấu", "M10.08": "Chuyển chào giá → đơn đặt hàng / dự án đóng mới",
    "M10.09": "Gửi chào giá qua email", "M10.10": "Chào giá lại / phiên bản", "M10.11": "Ký điện tử hợp đồng mua bán",
    "M11.01": "Tạo đơn đặt hàng từ chào giá", "M11.04": "In PDF đơn đặt hàng", "M12.01": "Xem hoá đơn bán ra và trạng thái thanh toán",
    "M14.01": "Tiếp nhận lệnh dịch vụ", "M14.03": "Biểu mẫu theo loại lệnh dịch vụ", "M14.07": "Mã dự án của lệnh dịch vụ",
    "M14.08": "Chào giá dịch vụ từ lệnh", "M14.13": "Kanban lệnh dịch vụ theo trạng thái", "M14.14": "In lệnh dịch vụ, QR code",
    "M15.01": "Hồ sơ thiết bị / xe", "M16.01": "Tạo dự án đóng mới từ chào giá / đơn hàng", "M16.05": "Bảo hành, đăng ký xe, phê duyệt NHVR, ngày dự kiến xuất hoá đơn", "M17.01": "Yêu cầu vật tư cho lệnh dịch vụ",
    "M17.02": "Phiếu xuất kho", "M18.01": "Checklist kiểm định môi trường", "M19.01": "Yêu cầu hỗ trợ: khiếu nại / bảo hành",
    "M20.01": "Tạo yêu cầu mua sắm", "M21.01": "Danh mục đối tác cung ứng", "M22.01": "Chuỗi phê duyệt theo DoA", "M22.02": "Hộp phê duyệt của tôi",
    "M23.04": "Chuyển đổi tự động hoá đang chạy trên hệ thống hiện tại", "M23.05": "Quy tắc phân công tự động",
    "M24.02": "Đầu việc, lịch hẹn, cuộc gọi", "M27.01": "Trang tổng quan cá nhân", "M27.06": "Trang tổng quan theo vai trò",
    "M27.08": "Bảng điều phối việc", "M28.02": "Đẩy đơn đặt hàng / yêu cầu xuất hoá đơn sang kế toán",
    "M29.01": "Chuyển dữ liệu từ hệ thống hiện tại", "M31.03": "Biểu mẫu tạo / sửa theo loại biểu mẫu",
}
LAYOUT_NAME = {  # loại biểu mẫu (layout), cả trong _layout của dữ liệu mẫu
    "After-Sales": "General service", "Breakdown Service": "Breakdown call-out", "Fleet Vehicle Layout": "Fleet servicing", "Service V2": "Equipment service",
    "After Sales Template": "Service & repair", "Crane Template": "Crane supply", "Hooklift/OTC Template": "Hooklift & container", "Tailgate Template": "Tail lift supply",
    "Crane": "Crane fit-out", "Hook Lift": "Hooklift fit-out", "Tail Lift": "Tail lift fit-out", "Other Jobs/ Variation Order": "Other work & variations",
    "Standard Layout": "Standard",
}
SECTION_NAME = {
    "Account Information": "Client Details", "Contact Information": "Contact Details", "Deal Information": "Opportunity Details",
    "Invoices Information": "Invoice Details", "Lead Information": "Prospect Details", "New Installation Project Information": "Fit-out Project Details",
    "Parts Requisition Information": "Material Request Details", "Product Information": "Item Details", "Purchase Requisition Information": "Purchase Request Details",
    "Quote Information": "Proposal Details", "Sales Order Information": "Order Details", "Shipping Instruction Information": "Goods Issue Details",
    "Task Information": "To-do Details", "Case Information": "Request Details", "Vendor Information": "Supplier Details",
}
FLOW_NAME = {  # tên quy trình (blueprint)
    "Deals Follow Up": "Opportunity pipeline", "After Sales Service": "Standard service", "Breakdown Service": "Breakdown call-out",
    "Fleet Vehicle Blueprint": "Fleet servicing", "Service V2": "Equipment service", "Purchase Form Status": "Purchase request approval",
    "SI Chit Status": "Goods issue", "Quote Stage": "Proposal stages", "Lead nurturing process": "Prospect nurturing", "Task Process Management": "To-do tracking",
}
STATUS_FIELD = {"Form_Status": "Form Status", "Quote_Stage": "Quote Stage", "Lead_Status": "Lead Status"}  # cột "Field trạng thái" (nhãn, không dùng tên API)
FIELD_LABEL = {  # field có tên module cũ trong nhãn; field Owner của mọi module → "Owner"
    ("orders", "Account_Owner"): "Client Owner", ("accounts", "Account_In_Accounting"): "Account in Accounting", ("products", "Product_in_Accounting"): "Product in Accounting", ("jobs", "Vehicle_Numbers"): "Plate Numbers", ("install", "Name"): "Fit-out Project Number", ("install", "New_installation_Project_Number"): "For Fit-out Project Number",
    ("orders", "New_Installation_Project_Number"): "Fit-out Project Number", ("si", "New_Installation_Number"): "Fit-out Project Number",
    ("partsreq", "Name"): "Material Request Name", ("partsreq", "Service_Repairs_Certs"): "Service Order", ("pr", "Name"): "Purchase Request Number",
    ("si", "Name"): "Goods Issue No.", ("si", "Service_Repair_Reference"): "Service Order Reference", ("invoices", "Service_Repair_Lookup"): "Service Order",
    ("orders", "Service_Repair_Lookup"): "Service Order", ("nea", "Name"): "Environmental Check No.",
}
FIELD_LABEL.update(REGION_LABEL)  # nhãn theo bối cảnh Úc (khối "bối cảnh vùng" ở đầu file)
OTHER_TYPES = {  # loại bản ghi ngoài prototype ở bảng quyền mặc định, theo (module, mức quyền)
    ("X04", "Private"): "Purchase orders", ("X01", "Private"): "Split invoicing", ("X02", "Private"): "Parts salvage", ("M25", "Private"): "Email log",
    ("X03", "Private"): "Marketing campaigns", ("M24", "Private"): "To-dos / calls / meetings", ("M25", "Public read/write"): "Emails",
}
for key, m in meta_entities.items():
    m["module_name"] = MODULE_NAME.get(m["module"], m["module_name"])
    for lay in m["layouts"]:
        lay["name"] = LAYOUT_NAME.get(lay["name"], lay["name"])
        for s in lay["sections"]:
            s["name"] = SECTION_NAME.get(s["name"], s["name"])
    m["bp_by_layout"] = {LAYOUT_NAME.get(a, a): FLOW_NAME.get(b, b) for a, b in m["bp_by_layout"].items()}
    for t in m["transitions"]:
        t["bp"] = FLOW_NAME.get(t["bp"], t["bp"])
    for api, fd in m["fields"].items():
        fd["label"] = FIELD_LABEL.get((key, api), "Owner" if api == "Owner" else fd["label"])
for rows in DATA.values():
    for r in rows:
        if r.get("_layout") in LAYOUT_NAME:
            r["_layout"] = LAYOUT_NAME[r["_layout"]]
for code, n in FEATURE_NAME.items():
    if code in FEATURES:
        FEATURES[code]["n"] = n
for b in APP["blueprints"]:
    k = API2KEY.get(b["api"])
    b.update(name=FLOW_NAME.get(b["name"], b["name"]), entity=ENT_LABEL[k][1] if k else b["entity"],
             layout=LAYOUT_NAME.get(b["layout"], b["layout"]), field=STATUS_FIELD.get(b["field"], b["field"]))
    if k:
        b["key"] = k  # app hiện tên module theo ngôn ngữ đang chọn
for x, (e, api, mod, lv) in zip(APP["org"]["default_perm"], om_ns["DEFAULT"]):
    k = API2KEY.get(api)
    x["entity"] = ENT_LABEL[k][1] if k else OTHER_TYPES.get((mod, lv), e)
    if k:
        x["key"] = k
MOD2KEY = {v[1]: k for k, v in ENT.items() if k != "si"}  # M17 dùng chung: bảng chia sẻ chỉ có module khác M17
for x in APP["org"]["sharing"]:
    k = MOD2KEY.get(x["module"])
    if k:
        x.update(entity=ENT_LABEL[k][1], key=k)
# <<< tên hiển thị CRM mới



# ---------------------------------------------------------------- ghi file
os.makedirs(os.path.join(OUT, "mock-api", "meta", "entities"), exist_ok=True)
os.makedirs(os.path.join(OUT, "mock-api", "data"), exist_ok=True)


def dump(path, obj):
    with open(os.path.join(OUT, "mock-api", path), "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, separators=(",", ":"))


APP["entities"] = {k: {"label": v["label"], "icon": v["icon"], "group": v["group"], "module": v["module"], "feat": v["feat"].get("list")}
                   for k, v in meta_entities.items()}
dump("meta/app.json", APP)
for k, v in meta_entities.items():
    dump(f"meta/entities/{k}.json", v)
for k, rows in DATA.items():
    dump(f"data/{k}.json", rows)
print("entities", len(meta_entities), "records", sum(len(v) for v in DATA.values()),
      "fields", sum(len(v["fields"]) for v in meta_entities.values()), "transitions", sum(len(v["transitions"]) for v in meta_entities.values()))
