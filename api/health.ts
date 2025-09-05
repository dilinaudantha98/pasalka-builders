import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import prisma from '../lib/prisma';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    // A simple query to check database connectivity
    const result = await prisma.$queryRaw`SELECT 1`;
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, result, timestamp: new Date().toISOString() }),
    };
  } catch (e: any) {
    console.error('HEALTH CHECK ERROR:', e);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: e.message, timestamp: new Date().toISOString() }),
    };
  }
};

export { handler };
