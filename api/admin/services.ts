import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import prisma from '../../lib/prisma';
import { verifyToken } from '../../lib/auth';

export const runtime = 'nodejs';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const authHeader = event.headers.authorization;
  if (!authHeader) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Request body is missing' }),
    };
  }

  switch (event.httpMethod) {
    case 'GET':
      try {
        const services = await prisma.service.findMany();
        return {
          statusCode: 200,
          body: JSON.stringify(services),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to fetch services' }),
        };
      }
    case 'POST':
      try {
        const service = await prisma.service.create({ data: JSON.parse(event.body) });
        return {
          statusCode: 201,
          body: JSON.stringify(service),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to create service' }),
        };
      }
    case 'PUT':
      try {
        const { id, ...data } = JSON.parse(event.body);
        const service = await prisma.service.update({ where: { id }, data });
        return {
          statusCode: 200,
          body: JSON.stringify(service),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to update service' }),
        };
      }
    case 'DELETE':
      try {
        const { id } = JSON.parse(event.body);
        await prisma.service.delete({ where: { id } });
        return {
          statusCode: 204,
          body: '',
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to delete service' }),
        };
      }
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ error: `Method ${event.httpMethod} Not Allowed` }),
      };
  }
};

export { handler };
