
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default function NewPost() {
  const [title, setTitle] = useState('');
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your post...</p>',
  });

  const handleSave = async () => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content: editor.getHTML(),
      }),
    });
    if (response.ok) {
      window.location.href = '/';
    }
  };

  const askGemini = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Help me improve this text: ${editor.getHTML()}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    editor.commands.setContent(response.text());
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
      <EditorContent editor={editor} className="prose lg:prose-xl min-h-[300px] border p-4 rounded" />
      <div className="mt-4 space-x-4">
        <button onClick={askGemini} className="bg-blue-500 text-white px-4 py-2 rounded">
          Ask Gemini
        </button>
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
          Save Post
        </button>
      </div>
    </div>
  );
}
