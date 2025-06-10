'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function HomePage() {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()),
  });

  return (
    <main>
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16 px-6 shadow-inner">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Discover Insightful Posts
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Explore a collection of posts with thoughts, stories, and ideas from a single author. Click on any card to read more.
          </p>
        </div>
      </section>

      <section className="p-6 max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Latest Posts</h2>

        {isLoading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">Error loading posts.</p>}

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link href={`/posts/${post.id}`}>
                <Card className="h-full cursor-pointer hover:shadow-xl hover:border-primary transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {post.body.split(' ').slice(0, 20).join(' ')}...
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
