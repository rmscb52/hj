'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navigation from '@/components/Navigation';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
  createdAt: string;
}

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

export default function PostPage({ params }: { params: { postId: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.postId}`);
        if (!response.ok) {
          throw new Error('게시글을 찾을 수 없습니다.');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('게시글을 가져오는 중 오류가 발생했습니다:', error);
        router.push('/community');
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/posts/${params.postId}/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('댓글을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [params.postId, router]);

  const handleLike = async () => {
    if (!session) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(`/api/posts/${params.postId}/likes`, {
        method: 'POST'
      });
      const data = await response.json();
      setIsLiked(data.liked);
      
      // 좋아요 수 업데이트
      if (post) {
        setPost({
          ...post,
          _count: {
            ...post._count,
            likes: post._count.likes + (data.liked ? 1 : -1)
          }
        });
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류가 발생했습니다:', error);
    }
  };

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      setError('로그인이 필요합니다.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/posts/${params.postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentContent }),
      });

      if (!response.ok) {
        throw new Error('댓글 작성에 실패했습니다.');
      }

      const newComment = await response.json();
      setComments([newComment, ...comments]);
      setCommentContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '댓글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
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

          <div className="prose max-w-none mb-6">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
            >
              ❤️ 좋아요 {post._count.likes}
            </button>
            <span>💬 댓글 {post._count.comments}</span>
          </div>
        </article>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">댓글</h2>

          {session && (
            <form onSubmit={handleComment} className="mb-8">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="댓글을 작성하세요"
                required
                className="w-full p-2 border rounded mb-2"
                rows={3}
              />
              {error && (
                <div className="mb-2 text-red-500 text-sm">
                  {error}
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded font-semibold text-white ${
                    isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isSubmitting ? '등록 중...' : '댓글 작성'}
                </button>
              </div>
            </form>
          )}

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">{comment.author.name}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-600">{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 