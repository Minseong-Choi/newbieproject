"use client";
import React, { useEffect, useState } from 'react';
import { UserCircle } from 'lucide-react';

interface UserData {
  name: string;
  username: string;
  tier: string;
  score: number;
  createdAt: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '날짜 정보 없음';
      }
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return '날짜 정보 없음';
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/user/me');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || '사용자 정보를 불러올 수 없습니다.');
        }

        console.log('Received user data:', data.user);
        setUserData(data.user);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-center text-gray-600">로딩중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-center text-gray-600">사용자 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <UserCircle className="w-12 h-12 text-gray-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-gray-600">가입일: {formatDate(userData.createdAt)}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-2">배드민턴 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">티어</p>
              <p className="text-lg font-semibold">{userData.tier}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">직속 점수</p>
              <p className="text-lg font-semibold">{userData.score}점</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}