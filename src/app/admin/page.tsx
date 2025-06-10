'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { PostForm } from '../components/PostForm';
import { toast } from 'sonner';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function AdminPage() {
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['admin-posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json()
      ),
  });

    const deleteMutation = useMutation({
    mutationFn: async (id: number) =>
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
        }),

    onMutate: async (id: number) => {
        await queryClient.cancelQueries({ queryKey: ['admin-posts'] });

        const previousPosts = queryClient.getQueryData<Post[]>(['admin-posts']);

        queryClient.setQueryData<Post[]>(['admin-posts'], (old = []) =>
        old.filter((post) => post.id !== id)
        );

        return { previousPosts };
    },
      onSuccess: () => {
        toast.success('Post deleted successfully');
    },

    onError: (_err, _id, context) => {
        toast.error('Failed to delete post');
        if (context?.previousPosts) {
        queryClient.setQueryData(['admin-posts'], context.previousPosts);
        }
    },
    });

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => setCreating(true)} className="cursor-pointer">
          + New Post
        </Button>
      </div>

      {creating && <PostForm onClose={() => setCreating(false)} />}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {isLoading ? (
          <p>Loading posts...</p>
        ) : (
          posts?.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {post.body.split(' ').slice(0, 20).join(' ')}...
                </p>
                <div className="flex gap-2">
                  <Link href={`/admin/edit/${post.id}`}>
                    <Button variant="secondary" className="cursor-pointer">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(post.id)}
                    className="cursor-pointer"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
