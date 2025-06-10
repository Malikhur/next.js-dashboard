'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { toast } from 'sonner';

type PostFormProps = {
  post?: {
    id: number;
    title: string;
    body: string;
  };
  onClose: () => void;
};

export function PostForm({ post, onClose }: PostFormProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(post?.title || '');
  const isEdit = !!post;

  const editor = useEditor({
    extensions: [StarterKit],
    content: post?.body || '',
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const body = editor?.getHTML() || '';

      const url = isEdit
        ? `https://jsonplaceholder.typicode.com/posts/${post?.id}`
        : `https://jsonplaceholder.typicode.com/posts`;

      const method = isEdit ? 'PUT' : 'POST';

      return fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      toast.success(isEdit ? 'Post updated successfully' : 'Post created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="border p-6 rounded-md shadow mb-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit Post' : 'New Post'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div
        className="border rounded-md p-3 min-h-[200px] max-h-[500px] overflow-auto cursor-text"
        onClick={() => editor?.commands.focus()}
        >
        <EditorContent editor={editor} />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" className="cursor-pointer" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button className="cursor-pointer" type="submit" disabled={mutation.isPending}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
}
