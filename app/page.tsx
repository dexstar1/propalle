
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Home() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
          <Link 
            href="/blog/new" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Post
          </Link>
        </div>
        {posts.length === 0 ? (
          <p>No posts yet. Create your first post!</p>
        ) : (
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
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
    return <div>Error loading posts. Please try again later.</div>
  }
}
