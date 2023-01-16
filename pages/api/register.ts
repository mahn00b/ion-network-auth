// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User, Session } from '../../data';
import { encodeKey } from '../../utils/Crypto';
// @ts-ignore
import { DID, generateKeyPair } from '@decentralized-identity/ion-tools';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserCredsResponse>,
) {
  const { email } = req.body;
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

  const user = new User(req, res).insert(email, uri);

  new Session(req, res).create(user);

  const response = {
    token: encodeKey(authnKeys.privateJwk),
    DIDUri: uri
  }

  res.status(200).json(response)
}
