
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { prisma } from '../../../lib/prisma';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(params?.id) },
  });
  return { props: { post: JSON.parse(JSON.stringify(post)) } };
};

export default function EditPost({ post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const editor = useEditor({
    extensions: [StarterKit],
    content: post.content,
  });

  const handleUpdate = async () => {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content: editor.getHTML(),
      }),
    });
    if (response.ok) {
      router.push(`/post/${post.id}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="w-full text-2xl font-bold mb-4 p-2 border rounded"
      />
      <div className="border rounded overflow-hidden">
        <div className="border-b p-2 bg-gray-50 flex gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${editor?.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded ${editor?.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          >
            Numbered List
          </button>
        </div>
        <EditorContent editor={editor} className="prose lg:prose-xl min-h-[200px] p-4" />
      </div>
      <div className="mt-4">
        <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
          Update Post
        </button>
      </div>
    </div>
  );
}
