// import fetch from 'node-fetch';

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
