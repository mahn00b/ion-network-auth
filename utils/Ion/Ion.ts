// @ts-ignore
import { sign, verify, resolve } from '@decentralized-identity/ion-tools';
import { decodeKey } from '../Crypto';

export const signMessage = async (token: string, payload: string) => {
  const privateJwk = decodeKey(token);

  return await sign({
    payload,
    privateJwk
  });
}

export const verifyMessage = async (message: string, uri: string) => {
    const publicJwk = await resolvePublicKey(uri);

    return await verify({
      jws: message,
      publicJwk
    })
}

export const resolvePublicKey = async (uri: string) => {
  const did = await resolveAddress(uri);
  const { publicKeyJwk } = did.didDocument.verificationMethod[0];

  return publicKeyJwk;
}

export const resolveAddress = async (uri: string) => {
  return await resolve(uri)
}
