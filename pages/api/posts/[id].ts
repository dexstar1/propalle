
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postId = parseInt(req.query.id as string);

  if (req.method === 'PUT') {
    const { title, content } = req.body;
    const post = await prisma.post.update({
      where: { id: postId },
      data: { title, content },
    });
    res.json(post);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
