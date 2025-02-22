"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Recruit {
  _id: string;
  author: string;
  date: string;
  time: string;
  location: string;
  participants: string[];
  createdBy: string;
}

export default function MemberRecruitPage() {
  const [posts, setPosts] = useState<Recruit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/recruits');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/recruits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        fetchPosts();
        setShowForm(false);
        setFormData({ date: '', time: '', location: '' });
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleParticipate = async (postId: string) => {
    try {
      const response = await fetch(`/api/recruits/${postId}/participate`, {
        method: 'POST'
      });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error participating:', error);
    }
  };

  const handleCancelParticipation = async (postId: string) => {
    try {
      const response = await fetch(`/api/recruits/${postId}/cancel`, {
        method: 'POST'
      });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error canceling participation:', error);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      const response = await fetch(`/api/recruits/${postId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          새 모집글 작성
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">날짜</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">시간</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="예: 19:00-21:00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">장소</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="예: 체육관 A코트"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                작성하기
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">{post.location}</h3>
                <p className="text-gray-600">{post.date} {post.time}</p>
                <p className="text-sm text-gray-500">작성자: {post.author}</p>
              </div>
              <div className="flex gap-2">
                {post.createdBy === user?._id ? (
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                ) : post.participants.includes(user?.name || '') ? (
                  <button
                    onClick={() => handleCancelParticipation(post._id)}
                    className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                  >
                    참여 취소
                  </button>
                ) : (
                  <button
                    onClick={() => handleParticipate(post._id)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                  >
                    참여하기
                  </button>
                )}
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">
                참여자 ({post.participants.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {post.participants.map(participant => (
                  <span
                    key={participant}
                    className="bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {participant}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}