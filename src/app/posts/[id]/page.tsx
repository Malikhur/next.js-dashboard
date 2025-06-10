'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostDetailPage() {
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
        <p className="text-gray-600 mb-4">
          The post you’re looking for doesn't exist or has been removed.
        </p>
        <Link href="/">
          <Button variant="secondary">← Back to Home</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <Card className="p-6 shadow-md">
        <CardHeader className="p-0 mb-4 space-y-1">
          <CardTitle className="text-3xl font-bold leading-tight">{post.title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            By <span className="font-medium">John Doe</span> • {new Date().toLocaleDateString()}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <article className="prose prose-neutral prose-lg max-w-none text-gray-800">
            {post.body.split('\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </article>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Link href="/">
          <Button variant="ghost">← Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}
