// @ts-ignore
import { sign } from '@decentralized-identity/ion-tools';
import { decodeKey } from '../Crypto';

export const signMessage = async (token: string, payload: string) => {
  const privateJwk = decodeKey(token);

  return await sign({
    payload,
    privateJwk
  });
}
