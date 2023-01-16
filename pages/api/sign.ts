// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// @ts-ignore
import { sign } from '@decentralized-identity/ion-tools';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const jws = await sign({
    payload: 'This is an amazing payload',
    privateJwk: {
      kty: 'EC',
      crv: 'secp256k1',
      x: 's2_UgAL1ZwdzVU4ZnXDJdXkn6Z49FFqKT_lMYzmhEJI',
      y: 'h2-47dtGBgLZI-O3TYntLyLL4Hc1usISPVtP5kisTbo',
      d: 'FFWJ2eaUC4qSgRKSWMq4TgKq2hDMdotMLQ2YNbViWh4'
    }
   })

  res.status(200).json(jws)
}
