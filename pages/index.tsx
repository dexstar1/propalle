import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { prisma } from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
};

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Blog</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <div className="border p-4 rounded hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}