"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

import { 
  Calendar, 
  Trophy,
  Users,
  Activity,
  ArrowRight,
  ArrowBigUp,
  ArrowUp
} from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        console.log('Fetching member count...'); 
        const response = await fetch('/api/user/count');
        const data = await response.json();
        console.log('Received data:', data); 
  
        if (response.ok) {
          setMemberCount(data.count);
        } else {
          console.error('Failed to fetch count:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch member count:', error);
      }
    };
  
    fetchMemberCount();
  }, []);

  const handleViewboard = () => {
    if (!isAuthenticated) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
      return;
    }
    router.push('/board');
  };

  return (
    <div className="space-y-8">
      {/* 주요 정보 카드 섹션 */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* 이번 주 경기 일정 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">이번 주 경기 일정</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">자유 배드민턴</p>
                <p className="text-sm text-gray-600">화요일 18:00 - 20:00</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                참여가능
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">정기 배드민턴 정모</p>
                <p className="text-sm text-gray-600">일요일 18:00 - 20:00</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                필수참석
              </span>
            </div>
          </div>
        </div>

        {/* 동아리 현황 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">동아리 현황</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">활동 회원</p>
              <p className="text-2xl font-bold text-blue-600">{memberCount}명</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">다음 정모</p>
              <p className="text-xl font-bold text-blue-600">2025-03-02(일)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 최근 활동 & 공지사항 */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* 최근 활동 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">최근 활동</h2>
            </div>
            <button 
              onClick={handleViewboard}
              className="text-blue-600 text-sm hover:underline cursor-pointer"
            >
              더보기
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <img
                src="/badminton.jpg" alt="교내 배드민턴 대회"
                className="w-20 h-20 rounded-lg object-cover shadow-sm flex-shrink-0"
              />
              <div>
                <p className="font-medium">교내 배드민턴 대회 우승</p>
                <p className="text-sm text-gray-600 mt-1">
                  열정적인 경기로 우승을 차지했습니다!
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
            <img
                src="/sinip.jpeg" alt="신환회"
                className="w-20 h-20 rounded-lg object-cover shadow-sm flex-shrink-0"
              />
              <div>
                <p className="font-medium">신입 회원 환영회</p>
                <p className="text-sm text-gray-600 mt-1">
                  24학년도 신입 회원들과 즐거운 시간을 보냈습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 동아리 랭킹 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">직속 랭킹</h2>
            </div>
            <button 
              onClick={handleViewboard}
              className="text-blue-600 text-sm hover:underline cursor-pointer"
            >
              전체보기
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </span>
                <span className="font-medium">2걸빼?</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">1820점</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </span>
                <span className="font-medium">밥4조</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">1755점</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </span>
                <span className="font-medium">문이열리네요그대가들어5조</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">1690점</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;