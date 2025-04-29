
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link 
            href={`/post/${post.id}`} 
            key={post.id}
            className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
