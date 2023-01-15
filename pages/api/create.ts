// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// @ts-ignore
import { DID, generateKeyPair } from '@decentralized-identity/ion-tools';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const authnKeys = await generateKeyPair();

  const did = new DID({
    content: {
      publicKeys: [
        {
          id: 'key-1',
          type: 'EcdsaSecp256k1VerificationKey2019',
          publicKeyJwk: authnKeys.publicJwk,
          purposes: [ 'authentication' ]
        }
      ],
      services: [
        {
          "id": "domain-1",
          "type": "LinkedDomains",
          "serviceEndpoint": "https://getportabl.com"
        }
      ]
    }
  });
  const uri = await did.getURI();
  const request = await did.generateRequest(0);

    console.log(uri)
    console.log(authnKeys)
    console.log(request)
  res.status(200).json(request)
}
