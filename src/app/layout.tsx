"use client";
import "./globals.css";
import React, { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
            KAIST Badminton Club
          </Link>

          <nav className="hidden md:flex items-center">
            <div className="flex space-x-6">
              {isAuthenticated && (
                <>
                  <Link href="/recruit" className="text-gray-600 hover:text-blue-500">
                    자유밷 쌓기
                  </Link>
                  <Link href="/purchase" className="text-gray-600 hover:text-blue-500">
                    셔틀콕
                  </Link>
                  <Link href="/board" className="text-gray-600 hover:text-blue-500">
                    게시판
                  </Link>
                  <Link href="/my-info" className="text-gray-600 hover:text-blue-500">
                    마이페이지
                  </Link>
                </>
              )}
            </div>

            <div className="border-l border-gray-200 ml-6 pl-6">
              {isAuthenticated ? (
                <button 
                  onClick={logout}
                  className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  로그아웃
                </button>
              ) : (
                <Link 
                  href="/login"
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  로그인
                </Link>
              )}
            </div>
          </nav>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-2">
            {isAuthenticated ? (
              <>
                <Link href="/recruit" className="block py-2 text-gray-600 hover:text-blue-500">
                  자유밷 쌓기
                </Link>
                <Link href="/purchase" className="block py-2 text-gray-600 hover:text-blue-500">
                  셔틀콕
                </Link>
                <Link href="/board" className="block py-2 text-gray-600 hover:text-blue-500">
                  게시판
                </Link>
                <Link href="/my-info" className="block py-2 text-gray-600 hover:text-blue-500">
                  마이페이지
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link href="/login" className="block py-2 text-blue-600 hover:text-blue-700">
                로그인
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

// 메인 레이아웃 컴포넌트
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <Navigation />
          <main className="max-w-4xl mx-auto p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}