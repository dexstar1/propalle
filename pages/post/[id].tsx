
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
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
