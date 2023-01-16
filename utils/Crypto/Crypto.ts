// Simple base64 encoding for demo
export const encodeKey = (privateKey: object) => {
  return Buffer.from(JSON.stringify(privateKey), 'utf-8').toString('base64');
}

export const decodeKey = (base64String: string) => {
  const JSONString = Buffer.from(base64String, 'base64').toString('utf-8');

  try {
    const key = JSON.parse(JSONString);

    return key;
  } catch {
    // Simply returns a null on incorrectly formatted string.
    return null;
  }
}