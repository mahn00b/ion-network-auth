// @ts-ignore
import { sign } from '@decentralized-identity/ion-tools';
import { decodeKey } from '../../utils/Crypto';

export const register = async (email: string): Promise<UserCredsResponse> => {
  const response = await fetch('/api/register', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  const creds = await response.json() as UserCredsResponse;

  return creds;
}

export const signIn = async (email: string, token: string): Promise<boolean> => {
  const privateJwk = decodeKey(token);

  const message = await sign({
    payload: 'authentication message',
    privateJwk
  })

  const response = await fetch('/api/signin', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, message })
  });

  return response.status === 200 ? true : false;
};