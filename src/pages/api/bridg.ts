import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from 'prisma/db';
import { DbRules, handleRequest } from 'bridg/app/server/request-handler';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const dbRules: DbRules = { default: true };

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;

  const { data, status } = await handleRequest(req.body, { db: prisma, uid: userId, rules: dbRules });

  return res.status(status).json(data);
}
