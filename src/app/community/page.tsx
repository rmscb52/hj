'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
  createdAt: string;
}

const categories = ['전체', '질문', '정보공유', '일상'];

export default function CommunityPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== '전체') params.append('category', selectedCategory);
        if (search) params.append('search', search);
        params.append('page', currentPage.toString());

        const response = await fetch(`/api/posts?${params}`);
        const data = await response.json();
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('게시글을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPosts();
  }, [selectedCategory, search, currentPage]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">커뮤니티</h1>
          {session && (
            <button
              onClick={() => router.push('/community/write')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              글쓰기
            </button>
          )}
        </div>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => router.push(`/community/${post.id}`)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>{post.author.name}</span>
                    <span>•</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {post.category}
                </span>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>💬 댓글 {post._count.comments}</span>
                <span>❤️ 좋아요 {post._count.likes}</span>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 