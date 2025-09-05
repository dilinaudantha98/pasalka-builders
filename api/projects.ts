import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import prisma from '../lib/prisma';
import { ProjectCategory } from '../types';

export const runtime = 'nodejs';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod === 'GET') {
    const { id, category } = event.queryStringParameters || {};

    try {
      if (id) {
        const project = await prisma.project.findUnique({
          where: { id: id as string },
        });
        if (project) {
          return {
            statusCode: 200,
            body: JSON.stringify(project),
          };
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Project not found' }),
          };
        }
      } else if (category) {
        const projects = await prisma.project.findMany({
          where: { category: category as ProjectCategory },
        });
        return {
          statusCode: 200,
          body: JSON.stringify(projects),
        };
      } else {
        const projects = await prisma.project.findMany();
        return {
          statusCode: 200,
          body: JSON.stringify(projects),
        };
      }
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Unable to fetch projects' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: `Method ${event.httpMethod} Not Allowed` }),
    };
  }
};

export { handler };
