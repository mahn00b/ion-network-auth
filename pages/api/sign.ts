// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// @ts-ignore
import { sign } from '@decentralized-identity/ion-tools';

const key = "did:ion:EiAq8BQO3TKWXF7gCsWOEtQRGQNULrWfre-7Cr3WxL5VVA:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJrZXktMSIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJRWWM5eFJVRjdFRFNuelk0MFk5b1dNOVF0bE9MbVpUZm9QVkMyZUNWM1M4IiwieSI6ImNQSFlzSGNGVUg1UU1pTjRra1FyMHljNnJoODRmZXc3R21KRmpLcXI5elkifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6IkVjZHNhU2VjcDI1NmsxVmVyaWZpY2F0aW9uS2V5MjAxOSJ9XSwic2VydmljZXMiOlt7ImlkIjoiZG9tYWluLTEiLCJzZXJ2aWNlRW5kcG9pbnQiOiJodHRwczovL2dldHBvcnRhYmwuY29tIiwidHlwZSI6IkxpbmtlZERvbWFpbnMifV19fV0sInVwZGF0ZUNvbW1pdG1lbnQiOiJFaUJBQUgtTjhnb3BtNjljSmI2RHU2WktTY0M0OUtRUjdSNFBGaUVRRFp6ZUdRIn0sInN1ZmZpeERhdGEiOnsiZGVsdGFIYXNoIjoiRWlBUFFaby03NlBCOWRvNEwzdHd2ZjZjRDJ1TDRYS3J3NFNJeXl2NHFTQmFmZyIsInJlY292ZXJ5Q29tbWl0bWVudCI6IkVpQmVmV1RoRTQxbkRqM05CeHJ2RHVXT2lPU1kzM0lkM05OUXgwRUNiNE9ucXcifX0";
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

   console.log(jws)

  res.status(200).json(jws)
}
