import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma.js';
import { verifyToken } from '../../lib/auth.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const services = await prisma.service.findMany();
        res.status(200).json(services);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services' });
      }
      break;
    case 'POST':
      try {
        const service = await prisma.service.create({ data: req.body });
        res.status(201).json(service);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create service' });
      }
      break;
    case 'PUT':
      try {
        const { id, ...data } = req.body;
        const service = await prisma.service.update({ where: { id }, data });
        res.status(200).json(service);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update service' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        await prisma.service.delete({ where: { id } });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete service' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
