"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  userId: string;
  createdAt: string;
}

export default function ActivityBoardPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    console.log("현재 user 객체 확인:", user);
    if (user) {
      fetchPosts();
    }
  }, [user]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          author: user?.name,
          userId: user?.username,  
        }),
      });
  
      if (response.ok) {
        setShowForm(false);
        setFormData({ title: '', content: '' });
        fetchPosts();
      } else {
        const errorData = await response.json();
        console.error('게시글 작성 실패:');
      }
    } catch (error) {
      console.error('게시글 작성 중 오류 발생:', error);
    }
  };
  

  const handleDelete = async (postId: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const response = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      if (response.ok) fetchPosts(); 
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 게시물 작성 버튼 */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          게시물 작성
        </button>
      </div>

      {/* 게시물 작성 폼 */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">제목</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">내용</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
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
                onClick={() => {
                  setShowForm(false);
                  setFormData({ title: '', content: '' });
                }}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 게시글 목록 */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{post.title}</h3>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-600">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>

                  {/* 본인 게시글일 때만 삭제 버튼 표시 */}
                  {user?.username === post.userId && (
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    삭제
                  </button>
                )}

                </div>
              </div>
              <p className="text-gray-600 mb-2">{post.content}</p>
              <p className="text-sm text-gray-500">작성자: {post.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
