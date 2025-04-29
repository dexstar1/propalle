
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: { title, content },
    });
    res.json(post);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
