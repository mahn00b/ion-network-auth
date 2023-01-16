import { signMessage } from '../../utils/ion';

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
  const message = await signMessage(token, 'Authentication message');

  const response = await fetch('/api/signin', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, message })
  });

  return response.status === 200 ? true : false;
};

export const signOut = async (): Promise<boolean> => {

  const response = await fetch('/api/signout');

  return response.status === 200 ? true : false;
};
