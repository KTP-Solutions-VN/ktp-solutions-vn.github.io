/* Entity: Email/Invoice Template (#22 Cấu hình email xác nhận & hóa đơn)
   Schema: id, name, appliesToType (Category|Business Unit|Campaign|All categories),
   appliesToValue, status (Active|Inactive), includeTerms, includeBranding, includeRefundPolicy */
const DATA_EMAIL_TEMPLATES = [
  { id: 'TPL-01', name: 'Order Confirmation — Maternity Package', appliesToType: 'Category', appliesToValue: 'Maternity Package', status: 'Active', includeTerms: true, includeBranding: true, includeRefundPolicy: true },
  { id: 'TPL-02', name: 'Order Confirmation — Confinement Meals (Nutri)', appliesToType: 'Business Unit', appliesToValue: 'Meridian Nutri', status: 'Active', includeTerms: true, includeBranding: true, includeRefundPolicy: false },
  { id: 'TPL-03', name: 'Invoice — Standard GST Invoice', appliesToType: 'All categories', appliesToValue: 'All categories', status: 'Active', includeTerms: false, includeBranding: true, includeRefundPolicy: false },
  { id: 'TPL-04', name: 'Order Confirmation — Preg Event Campaign', appliesToType: 'Campaign', appliesToValue: 'Preg Event Aug 2026', status: 'Active', includeTerms: true, includeBranding: true, includeRefundPolicy: true },
  { id: 'TPL-05', name: 'Refund Confirmation', appliesToType: 'All categories', appliesToValue: 'All categories', status: 'Active', includeTerms: false, includeBranding: true, includeRefundPolicy: true }
];
