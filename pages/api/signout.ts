import type { NextApiRequest, NextApiResponse } from 'next'
import { Session } from '../../data';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  new Session(req, res).end();

  res.status(200).send('ok');
}
