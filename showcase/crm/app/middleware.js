/* Basic auth cho bản deploy Vercel (Routing Middleware, chạy trước mọi request).
 * Tài khoản đặt bằng biến môi trường trên Vercel: BASIC_AUTH_USER, BASIC_AUTH_PASSWORD (không ghi trong code).
 * Chưa đặt biến → chặn toàn bộ, tránh lộ prototype.
 */
export const config = {matcher: "/:path*"};

export default function middleware(request) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD;
  const header = request.headers.get("authorization") || "";
  if (user && pass && header.startsWith("Basic ")) {
    const [u, ...rest] = atob(header.slice(6)).split(":");
    if (u === user && rest.join(":") === pass) return; // hợp lệ → phục vụ file tĩnh như bình thường
  }
  return new Response("Authentication required", {
    status: 401,
    headers: {"WWW-Authenticate": 'Basic realm="Apex Industrial CRM prototype", charset="UTF-8"'},
  });
}
