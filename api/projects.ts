import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../lib/prisma';
import { ProjectCategory } from '../types';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method === 'GET') {
    const { id, category } = req.query;

    try {
      if (id) {
        const project = await prisma.project.findUnique({
          where: { id: id as string },
        });
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({ error: 'Project not found' });
        }
      } else if (category) {
        const projects = await prisma.project.findMany({
          where: { category: category as ProjectCategory },
        });
        res.status(200).json(projects);
      } else {
        const projects = await prisma.project.findMany();
        res.status(200).json(projects);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to fetch projects' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
