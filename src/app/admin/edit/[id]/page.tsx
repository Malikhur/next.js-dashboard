'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { PostForm } from '../../../components/PostForm';
import { Skeleton } from '@/components/ui/skeleton';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function EditPostPage() {
  const { id } = useParams();

  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      }),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (error || !post?.id) {
    return (
      <main className="p-6 max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-2">404 - Post Not Found</h1>
        <p className="text-gray-600">Could not find the post to edit.</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <PostForm post={post} onClose={() => window.history.back()} />
    </main>
  );
}
