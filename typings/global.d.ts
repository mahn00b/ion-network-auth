interface AttributeMap {
  [key: string | symbol]: boolean | string | number | undefined;
}

interface UserData {
  email: string;
  DIDUri: string;
}

interface UserCredsResponse {
  token: string;
  DIDUri: string;
}
