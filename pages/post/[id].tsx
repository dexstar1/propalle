
import { GetServerSideProps } from 'next';
import { prisma } from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(params?.id) },
  });
  return { props: { post: JSON.parse(JSON.stringify(post)) } };
};

export default function Post({ post }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <a href={`/post/edit/${post.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit Post
        </a>
      </div>
      <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
