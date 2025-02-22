import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('auth-token');
  const isAuthenticated = !!token;

  // 보호된 경로 목록
  const protectedRoutes = ['/board', '/purchase', '/my-info', '/recruit'];
  const isProtectedRoute = protectedRoutes.includes(path);

  // 로그인이 필요한 페이지에 비로그인 상태로 접근할 경우
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/board', '/purchase', '/my-info', '/recruit', '/login']
};