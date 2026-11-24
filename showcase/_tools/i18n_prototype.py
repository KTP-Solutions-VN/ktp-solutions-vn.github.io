"""Bản tiếng Anh cho prototype tĩnh chỉ viết tiếng Việt (hiện dùng cho Fleet: showcase/logistics/fleet).

Không sửa tay từng màn: script tách mọi đoạn chữ tiếng Việt trong HTML (chữ, title / placeholder / aria-label…) và trong
chuỗi JS (kể cả template literal; biểu thức ${…} giữ nguyên, chuỗi bên trong dịch đệ quy), tra bảng dịch rồi ghi bản EN
song song vào <prototype>/en/ (cùng cấu trúc thư mục nên mọi link tương đối vẫn đúng). Đoạn giống nhau luôn dịch giống
nhau, nên các giá trị code dùng để so sánh (trạng thái, vai trò, loại xe…) vẫn khớp nhau giữa các file.

    python3 showcase/_tools/i18n_prototype.py extract fleet   # đoạn chưa có bản dịch → showcase/_tools/i18n/fleet.todo.json
    python3 showcase/_tools/i18n_prototype.py build fleet     # ghi <prototype>/en/, báo đoạn thiếu / lỗi

Bảng dịch showcase/_tools/i18n/<id>.en.json: {"dir": thư mục prototype, "strings": {đoạn VI: bản EN},
"files": {file: {đoạn VI: bản EN}} (bản dịch riêng của 1 file, thắng "strings"; chữ không dấu như "Doanh thu" cũng dịch
được khi có trong bảng),
"patches": [[glob, tìm, thay]]} (patches: sửa code riêng cho bản EN, áp lên mã nguồn trước khi dịch,
VD định dạng số 1,234.5 thay cho 1.234,5).
Khoá của một đoạn: chữ đã gộp khoảng trắng; thẻ inline thay bằng <b0>…</b0>, <br1/>; biểu thức ${…} thay bằng {0}, {1}…
Sửa màn tiếng Việt xong thì chạy lại build (đoạn mới chưa dịch sẽ được liệt kê).
"""
import fnmatch
import json
import pathlib
import re
import shutil
import sys

SC = pathlib.Path(__file__).resolve().parent.parent
I18N = SC / "_tools/i18n"
VI = re.compile(r"[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]", re.I)
NUM_VN = re.compile(r"\d,\d|(?<![\w.-])\d{1,3}(?:\.\d{3})+(?![\w.])")  # 12,5 · 1.234.567 (biển số 51C-123.45 không khớp)
PH = lambda n: f"\ue000{n}\ue001"
PH_RE = re.compile("\ue000(\\d+)\ue001")
INLINE = {"a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn", "em", "i", "kbd", "mark", "q", "s", "samp",
          "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr"}
VOID = {"br", "wbr", "img", "input", "hr", "meta", "link", "source", "col", "area", "base", "embed", "param", "track"}
SKIP_ATTR = {"href", "src", "class", "id", "style", "for", "name", "type", "role", "rel", "lang", "charset"}
SHOWN_ATTR = {"title", "aria-label", "placeholder", "alt"}  # thuộc tính hiển thị: đổi cả định dạng số (12,5 → 12.5)
TAG_RE = re.compile(r"<!--.*?-->|<(/?)([A-Za-z][\w:-]*)((?:[^>\"']|\"[^\"]*\"|'[^']*')*?)(/?)>", re.S)
ATTR_RE = re.compile(r"(\s)([^\s=/>\"']+)(\s*=\s*)(\"([^\"]*)\"|'([^']*)')")


class Ctx:
    def __init__(self, strings, by_file):
        self.all = strings
        self.by_file = by_file  # bản dịch riêng của 1 file (cùng chữ VI nhưng nghĩa khác trong màn đó)
        self.todo = {}          # khoá → {"f": file đầu tiên, "n": số lần}
        self.errors = []
        self.file = ""

    @property
    def strings(self):
        own = self.by_file.get(self.file)
        if not own:
            return self.all
        if getattr(self, "_merged_for", None) != self.file:
            self._merged, self._merged_for = {**self.all, **own}, self.file
        return self._merged

    def lookup(self, key, kind):
        if key in self.strings:
            return self.strings[key]
        t = self.todo.setdefault(key, {"f": self.file, "kind": kind, "n": 0})
        t["n"] += 1
        return None


SVG_PATH = re.compile(r"[MLCSQTAHVZmlcsqtahvz\d,.\s-]+")


def need(text):
    return bool(VI.search(text) or (NUM_VN.search(text) and not SVG_PATH.fullmatch(text.strip())))


# ---------------------------------------------------------------- JS
WORD = re.compile(r"[A-Za-z_$\u00c0-\uffff][\w$\u00c0-\uffff]*")
NUM = re.compile(r"0[xXoObB][\da-fA-F_]+n?|(?:\d[\d_]*\.?\d*|\.\d+)(?:[eE][+-]?\d+)?n?")
KW_RE_OK = {"return", "typeof", "case", "do", "else", "in", "of", "new", "delete", "void", "throw", "instanceof", "yield", "await"}


def read_string(s, i):
    q, j = s[i], i + 1
    while s[j] != q:
        j += 2 if s[j] == "\\" else 1
    return j + 1


def read_regex(s, i):
    j, cls = i + 1, False
    while True:
        c = s[j]
        if c == "\\":
            j += 2
            continue
        if c == "\n":
            raise ValueError(f"regex chưa đóng ở vị trí {i}")
        if cls:
            cls = c != "]"
        elif c == "[":
            cls = True
        elif c == "/":
            j += 1
            break
        j += 1
    while j < len(s) and s[j].isalpha():
        j += 1
    return j


def read_template(s, i):
    """i trỏ vào dấu `. Trả về (vị trí sau dấu ` đóng, [phần tĩnh raw], [(đầu, cuối) biểu thức])."""
    j, start, parts, exprs = i + 1, i + 1, [], []
    while True:
        c = s[j]
        if c == "\\":
            j += 2
        elif c == "`":
            parts.append(s[start:j])
            return j + 1, parts, exprs
        elif s.startswith("${", j):
            parts.append(s[start:j])
            _, k = scan_js(s, j + 2, close=True)
            exprs.append((j + 2, k))
            j = start = k + 1
        else:
            j += 1


def scan_js(s, i=0, close=False):
    """Token chuỗi cấp ngoài cùng: ("str", đầu, cuối) | ("tpl", đầu, cuối, parts, exprs). close=True: dừng ở } chưa mở."""
    toks, depth, re_ok, n = [], 0, True, len(s)
    while i < n:
        c = s[i]
        if c in " \t\r\n":
            i += 1
        elif s.startswith("//", i):
            j = s.find("\n", i)
            i = n if j < 0 else j
        elif s.startswith("/*", i):
            j = s.find("*/", i + 2)
            i = n if j < 0 else j + 2
        elif c in "'\"":
            j = read_string(s, i)
            toks.append(("str", i, j))
            i, re_ok = j, False
        elif c == "`":
            j, parts, exprs = read_template(s, i)
            toks.append(("tpl", i, j, parts, exprs))
            i, re_ok = j, False
        elif c == "/" and re_ok:
            i, re_ok = read_regex(s, i), False
        elif WORD.match(s, i):
            m = WORD.match(s, i)
            i, re_ok = m.end(), m.group(0) in KW_RE_OK
        elif c.isdigit() or (c == "." and i + 1 < n and s[i + 1].isdigit()):
            i, re_ok = NUM.match(s, i).end(), False
        else:
            if c == "{":
                depth += 1
            elif c == "}":
                if close and depth == 0:
                    return toks, i
                depth -= 1
            i += 1
            re_ok = c not in ")]"
    if close:
        raise ValueError("biểu thức ${ chưa đóng")
    return toks, n


ESC = {"n": "\n", "r": "\r", "t": "\t", "b": "\b", "f": "\f", "v": "\v", "0": "\0"}


def js_unescape(raw):
    out, i = [], 0
    while i < len(raw):
        c = raw[i]
        if c != "\\":
            out.append(c)
            i += 1
            continue
        d = raw[i + 1]
        if d in ESC:
            out.append(ESC[d])
            i += 2
        elif d == "x":
            out.append(chr(int(raw[i + 2:i + 4], 16)))
            i += 4
        elif d == "u" and raw[i + 2] == "{":
            k = raw.index("}", i)
            out.append(chr(int(raw[i + 3:k], 16)))
            i = k + 1
        elif d == "u":
            out.append(chr(int(raw[i + 2:i + 6], 16)))
            i += 6
        elif d == "\n":
            i += 2
        else:
            out.append(d)
            i += 2
    return "".join(out)


def js_escape(val, q):
    val = val.replace("\\", "\\\\")
    if q == "`":
        return val.replace("`", "\\`").replace("${", "\\${")
    return val.replace(q, "\\" + q).replace("\n", "\\n").replace("\r", "\\r")


def tr_js(src, ctx):
    toks, _ = scan_js(src)
    out, pos = [], 0
    for t in toks:
        out.append(src[pos:t[1]])
        raw = src[t[1]:t[2]]
        if t[0] == "str":
            val = js_unescape(raw[1:-1])
            new = tr_markup(val, ctx, kind="js")
            out.append(raw if new == val else raw[0] + js_escape(new, raw[0]) + raw[0])
        else:
            _, _, _, parts, exprs = t
            new_exprs = [tr_js(src[a:b], ctx) for a, b in exprs]
            cooked = "".join(js_unescape(p) + (PH(k) if k < len(exprs) else "") for k, p in enumerate(parts))
            new = tr_markup(cooked, ctx, kind="tpl")
            if new == cooked:  # không có chữ cần dịch: giữ nguyên phần tĩnh, chỉ thay biểu thức đã dịch
                out.append("`" + "".join(p + ("${" + new_exprs[k] + "}" if k < len(exprs) else "") for k, p in enumerate(parts)) + "`")
            else:
                pieces = PH_RE.split(new)  # [chữ, số, chữ, số, …]
                body = "".join(js_escape(x, "`") if k % 2 == 0 else "${" + new_exprs[int(x)] + "}" for k, x in enumerate(pieces))
                out.append("`" + body + "`")
        pos = t[2]
    out.append(src[pos:])
    return "".join(out)


# ---------------------------------------------------------------- HTML / markup (chữ trong HTML, chuỗi JS, template)
def tr_attrs(tag, ctx):
    def one(m):
        name, val = m.group(2).lower(), m.group(5) if m.group(5) is not None else m.group(6)
        q = '"' if m.group(5) is not None else "'"
        if name in SKIP_ATTR or not val:
            return m.group(0)
        if name.startswith("on"):  # code JS trong thuộc tính: dịch chuỗi bên trong
            new = tr_js(val, ctx)
        elif VI.search(val) or (name in SHOWN_ATTR and NUM_VN.search(val)) or val in ctx.strings:
            new = tr_text(val, ctx, f"attr:{name}")
        else:
            return m.group(0)
        if new != val:
            new = new.replace(q, "&quot;" if q == '"' else "&#39;")
        return m.group(1) + m.group(2) + m.group(3) + q + new + q
    return ATTR_RE.sub(one, tag)


def tr_text(text, ctx, kind):
    """Một đoạn chữ không có thẻ (giá trị thuộc tính…): khoá = chữ (placeholder đánh số lại từ 0)."""
    if not (need(text) or PH_RE.sub("", text).strip() in ctx.strings):
        return text
    nums = []
    key = PH_RE.sub(lambda m: (nums.append(m.group(1)), "{%d}" % (len(nums) - 1))[1], text)
    lead, core, trail = split_ws(key)
    if not core:
        return text
    tr = ctx.lookup(core, kind)
    if tr is None or not same_tokens(core, tr, ctx):
        return text
    return lead + re.sub(r"\{(\d+)\}", lambda m: PH(nums[int(m.group(1))]), tr) + trail


def split_ws(s):
    a, b = len(s) - len(s.lstrip()), len(s.rstrip())
    return (s, "", "") if b <= a else (s[:a], s[a:b], s[b:])


TOKEN = re.compile(r"</?[a-z]+\d+/?>|\{\d+\}")


def same_tokens(key, tr, ctx):
    if sorted(TOKEN.findall(key)) == sorted(TOKEN.findall(tr)):
        return True
    ctx.errors.append(f"bản dịch lệch thẻ / placeholder: {key[:80]!r} → {tr[:80]!r}")
    return False


def tr_markup(s, ctx, kind="html"):
    """Chia s thành các 'run' (chữ + thẻ inline + placeholder) ngăn cách bởi thẻ khối; dịch từng run."""
    out, run, pos = [], [], 0

    def flush():
        if run:
            out.append(tr_run(run, ctx, kind))
            run.clear()

    while pos < len(s):
        m = TAG_RE.search(s, pos)
        if not m:
            run.append(("text", s[pos:]))
            break
        if m.start() > pos:
            run.append(("text", s[pos:m.start()]))
        tag = m.group(0)
        name = (m.group(2) or "").lower()
        if tag.startswith("<!--"):
            flush()
            out.append(tag)
            pos = m.end()
        elif name in INLINE:
            run.append(("tag", tr_attrs(tag, ctx), name, bool(m.group(1)), name in VOID or bool(m.group(4))))
            pos = m.end()
        else:
            flush()
            out.append(tr_attrs(tag, ctx))
            pos = m.end()
    flush()
    return "".join(out)


def tr_run(run, ctx, kind):
    whole = "".join(t[1] for t in run)
    if not any(t[0] == "text" and (re.search(r"[^\W\d_]", PH_RE.sub("", t[1])) or NUM_VN.search(t[1])) for t in run):  # không có chữ / số kiểu VN
        return whole
    # khoá: thẻ inline → <b0>…</b0>, placeholder → {0}
    tags, nums, stack, parts = {}, [], [], []
    for t in run:
        if t[0] == "text":
            parts.append(PH_RE.sub(lambda m: (nums.append(m.group(1)), "{%d}" % (len(nums) - 1))[1], t[1]))
            continue
        _, raw, name, closing, void = t
        if closing:
            k = next((k for k in reversed(range(len(stack))) if stack[k][0] == name), None)
            idx = stack.pop(k)[1] if k is not None else len(tags)
            tok = f"</{name}{idx}>"
        else:
            idx = len(tags)
            tok = f"<{name}{idx}/>" if void else f"<{name}{idx}>"
            if not void:
                stack.append((name, idx))
        tags[tok] = raw
        parts.append(tok)
    key = "".join(parts)
    lead, core, trail = split_ws(key)
    if "\n" not in core.strip() or "<" in core or kind != "js":
        core = re.sub(r"\s+", " ", core)
    if not core or not need(re.sub(r"<[^>]+>|\{\d+\}", " ", core)) and core not in ctx.strings:
        return whole
    tr = ctx.lookup(core, kind)
    if tr is None or not same_tokens(core, tr, ctx):
        return whole
    back = TOKEN.sub(lambda m: tags[m.group(0)] if m.group(0) in tags else PH(nums[int(m.group(0)[1:-1])]), tr)
    return lead + back + trail


SCRIPT_RE = re.compile(r"(<script\b[^>]*>)(.*?)(</script>)|<style\b[^>]*>.*?</style>|<!--.*?-->", re.S | re.I)


def tr_html(src, ctx):
    out, pos = [], 0
    for m in SCRIPT_RE.finditer(src):
        out.append(tr_markup(src[pos:m.start()], ctx))
        if m.group(1) and "src=" not in m.group(1) and m.group(2).strip():
            out.append(m.group(1) + tr_js(m.group(2), ctx) + m.group(3))
        else:
            out.append(m.group(0))
        pos = m.end()
    out.append(tr_markup(src[pos:], ctx))
    return "".join(out)


# ---------------------------------------------------------------- chạy
def load(pid):
    f = I18N / f"{pid}.en.json"
    return json.loads(f.read_text(encoding="utf-8")), f


def sources(root):
    return [p for p in sorted(root.rglob("*")) if p.is_file() and "en" not in p.relative_to(root).parts[:1] and p.name != ".DS_Store"]


def run(pid, write):
    conf, _ = load(pid)
    root = SC / conf["dir"]
    ctx = Ctx(conf.get("strings", {}), conf.get("files", {}))
    dest = root / "en"
    if write and dest.exists():
        shutil.rmtree(dest)
    for f in sources(root):
        rel = f.relative_to(root).as_posix()
        ctx.file = rel
        if f.suffix in (".html", ".js"):
            src = f.read_text(encoding="utf-8")
            for glob, find, repl in conf.get("patches", []):  # sửa code cho bản EN, áp lên mã nguồn trước khi dịch
                if fnmatch.fnmatch(rel, glob):
                    if find not in src:
                        ctx.errors.append(f"patch không khớp ở {rel}: {find[:60]!r}")
                    src = src.replace(find, repl)
            new = tr_html(src, ctx) if f.suffix == ".html" else tr_js(src, ctx)
            if f.suffix == ".html":
                new = new.replace('<html lang="vi">', '<html lang="en">', 1)
            if write:
                (dest / rel).parent.mkdir(parents=True, exist_ok=True)
                (dest / rel).write_text(new, encoding="utf-8")
        elif write:
            (dest / rel).parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(f, dest / rel)
    return ctx


def main():
    if len(sys.argv) != 3 or sys.argv[1] not in ("extract", "build"):
        sys.exit(__doc__)
    mode, pid = sys.argv[1:]
    ctx = run(pid, write=mode == "build")
    todo = [{"k": k, **v} for k, v in ctx.todo.items()]
    if mode == "extract":
        out = I18N / f"{pid}.todo.json"
        out.write_text(json.dumps(todo, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"{len(todo)} đoạn chưa dịch ({sum(len(t['k']) for t in todo) // 1024} KB chữ) → {out.relative_to(SC.parent)}")
    else:
        print(f"→ {(SC / load(pid)[0]['dir'] / 'en').relative_to(SC.parent)}: {len(todo)} đoạn chưa dịch")
    for e in ctx.errors[:40]:
        print("  !", e)
    if ctx.errors:
        print(f"  {len(ctx.errors)} lỗi")
    sys.exit(1 if ctx.errors or (mode == "build" and todo) else 0)


if __name__ == "__main__":
    main()
