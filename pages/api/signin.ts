// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User, Session } from '../../data';
// @ts-ignore
import { resolve, verify } from '@decentralized-identity/ion-tools';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserCredsResponse | string>,
) {
  const { email, message } = req.body;

  const user = new User(req, res).getOne(email);

  if (!user) return res.status(403).send('Invalid creds')

  const did = await resolve(user.DIDUri);

  const { publicKeyJwk } = did.didDocument.verificationMethod[0];

  const isAuthenticated = await verify({
    jws: message,
    publicJwk: publicKeyJwk
  })

  if (!isAuthenticated) return res.status(403).send('Invalid creds')

  new Session(req, res).create(user);

  res.status(200).send('ok');
}
