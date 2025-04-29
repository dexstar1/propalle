
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Post({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  })

  if (!post) return null

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <Link
          href={`/post/${post.id}/edit`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit Post
        </Link>
      </div>
      <div 
        className="prose lg:prose-xl" 
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </div>
  )
}
