import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../lib/prisma.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method === 'GET') {
    try {
      const services = await prisma.service.findMany();
      res.status(200).json(services);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to fetch services' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
