import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

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
        const projects = await prisma.project.findMany();
        res.status(200).json(projects);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
      }
      break;
    case 'POST':
      try {
        const project = await prisma.project.create({ data: req.body });
        res.status(201).json(project);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
      }
      break;
    case 'PUT':
      try {
        const { id, ...data } = req.body;
        const project = await prisma.project.update({ where: { id }, data });
        res.status(200).json(project);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update project' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        await prisma.project.delete({ where: { id } });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
