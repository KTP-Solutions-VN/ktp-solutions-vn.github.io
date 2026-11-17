/* Lớp truy cập dữ liệu của prototype.
 * Hiện đọc "API giả" là file JSON tĩnh trong thư mục mock-api/ (sinh bởi _src/build_model.py).
 * Khi có backend thật: đổi apiBase trong config.json và thay phần thân các hàm dưới đây
 * bằng REST call tương ứng (GET /meta/app, GET /meta/entities/:key, GET /data/:key?tenant=…, POST, PATCH).
 */
const API = (() => {
  let base = "mock-api/";
  const cache = {};
  const store = {}; // bản ghi đã nạp + thay đổi trong phiên (tạo mới, chuyển trạng thái)

  async function getJSON(path) {
    if (!cache[path]) cache[path] = fetch(base + path).then(r => {
      if (!r.ok) throw new Error(r.status + " " + path);
      return r.json();
    });
    return cache[path];
  }

  async function rows(key) {
    if (!store[key]) store[key] = (await getJSON(`data/${key}.json`)).map(r => ({...r}));
    return store[key];
  }

  return {
    init(cfg) { if (cfg && cfg.apiBase) base = cfg.apiBase; },
    /* GET /meta/app: phần sinh từ Legacy CRM (app.json) + cấu hình sửa tay (meta/config/*.json) */
    async app() {
      const parts = await Promise.all(["meta/app.json", ...["tenants", "users", "teams", "profiles", "menu", "approval_rules", "tour"].map(n => `meta/config/${n}.json`)].map(getJSON));
      return Object.assign({}, ...parts);
    },
    entity: key => getJSON(`meta/entities/${key}.json`),

    /* GET /data/:key — lọc theo pháp nhân, từ khoá, điều kiện */
    async list(key, {tenant, q, where} = {}) {
      let out = await rows(key);
      if (tenant && tenant !== "ALL") out = out.filter(r => r._tenant === tenant);
      if (where) out = out.filter(where);
      if (q) {
        const s = q.toLowerCase();
        out = out.filter(r => Object.values(r).some(v => String(v && v.name ? v.name : v).toLowerCase().includes(s)));
      }
      return out;
    },
    /* GET /data/:key/:id */
    async get(key, id) { return (await rows(key)).find(r => r.id === id) || null; },
    /* POST /data/:key */
    async create(key, rec) {
      const list = await rows(key);
      rec.id = rec.id || key.slice(0, 2) + "n" + (list.length + 1);
      list.unshift(rec);
      return rec;
    },
    /* PATCH /data/:key/:id */
    async update(key, id, patch) {
      const r = await this.get(key, id);
      if (r) Object.assign(r, patch);
      return r;
    },
    /* Tìm kiếm toàn cục */
    async search(keys, q, tenant) {
      const res = [];
      for (const k of keys) for (const r of await this.list(k, {tenant, q})) res.push({key: k, rec: r});
      return res.slice(0, 30);
    },
  };
})();
