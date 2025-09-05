import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import prisma from '../lib/prisma';

export const runtime = 'nodejs';

// Force rebuild to clear cache

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod === 'GET') {
    try {
      const services = await prisma.service.findMany();
      return {
        statusCode: 200,
        body: JSON.stringify(services),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Unable to fetch services' }),
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
