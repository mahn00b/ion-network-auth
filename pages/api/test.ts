// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// @ts-ignore
import { resolve } from '@decentralized-identity/ion-tools';

const key = "did:ion:EiDgNiVXY0JXAeRcmy_i0-Vr4VdgFyWOxiLDItu7EUMbZg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJrZXktMSIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJzMl9VZ0FMMVp3ZHpWVTRablhESmRYa242WjQ5RkZxS1RfbE1Zem1oRUpJIiwieSI6ImgyLTQ3ZHRHQmdMWkktTzNUWW50THlMTDRIYzF1c0lTUFZ0UDVraXNUYm8ifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6IkVjZHNhU2VjcDI1NmsxVmVyaWZpY2F0aW9uS2V5MjAxOSJ9XSwic2VydmljZXMiOlt7ImlkIjoiZG9tYWluLTEiLCJzZXJ2aWNlRW5kcG9pbnQiOiJodHRwczovL2dldHBvcnRhYmwuY29tIiwidHlwZSI6IkxpbmtlZERvbWFpbnMifV19fV0sInVwZGF0ZUNvbW1pdG1lbnQiOiJFaUJTbmY0RkVsWk9leWdDNTM3aXcxelNKQ01DaFoxbFhqanlBWFRUTERJUGl3In0sInN1ZmZpeERhdGEiOnsiZGVsdGFIYXNoIjoiRWlETlpWeFBiczR2VVJBNlZQQ2V4TDNvZEowRUNxbm5OUFdzMGY5NEloWU1LZyIsInJlY292ZXJ5Q29tbWl0bWVudCI6IkVpQlFzMnc4V2E2NUM5YndwaEJDUkJ4M2czQW1namR2WWdxWnhvZnJtcmxuT0EifX0";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const textEncoder = new TextEncoder();

  const encodedText = textEncoder.encode(key);

  console.log(encodedText)
  console.log(encodedText.byteLength)

  res.status(200).json({ dude: 'wow!' })
}
