
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useRouter } from 'next/navigation'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

export default function NewPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your post...</p>',
  })

  const handleSave = async () => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content: editor.getHTML(),
      }),
    })
    if (response.ok) {
      router.push('/')
    }
  }

  const askGemini = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const prompt = `Create small blog post with html tags based on this title: ${title}`
    const result = await model.generateContent(prompt)
    const response = await result.response
    editor.commands.setContent(response.text())
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Create New Post</h1>
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
      <div className="mt-4 space-x-4">
        <button onClick={askGemini} className="bg-blue-500 text-white px-4 py-2 rounded">
          Ask Gemini
        </button>
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
          Save Post
        </button>
      </div>
    </div>
  )
}
