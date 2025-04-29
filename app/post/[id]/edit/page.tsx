
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [title, setTitle] = useState('')
  
  const editor = useEditor({
    extensions: [StarterKit],
  })

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data)
        setTitle(data.title)
        editor?.commands.setContent(data.content)
      })
  }, [params.id])

  const handleUpdate = async () => {
    const response = await fetch(`/api/posts/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content: editor.getHTML(),
      }),
    })
    if (response.ok) {
      router.push(`/post/${params.id}`)
    }
  }

  if (!post) return null

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Edit Post</h1>
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
  )
}
