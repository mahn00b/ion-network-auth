import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie, parseCookies } from 'nookies'

const COOKIE_NAME = 'user_DB';
const COOKIE_PATH = '/user';
const ONE_WEEK = 7 * 24 * 60 * 60;

const COOKIE_ARGS = {
  path: COOKIE_PATH,
  maxAge: ONE_WEEK
}

export default class User {
  db: any;
  res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.db = parseCookies({ req }, { path: COOKIE_PATH })[COOKIE_NAME] || {}
    this.res = res;
  }

  insert(email: string, DIDUri: string): UserData {
    this.db[email] = { DIDUri, email }
    this.save();

    return { DIDUri, email };
  }

  getOne(email: string) {
    return this.db[email] || null;
  }

  save() {
    setCookie({ res: this.res }, COOKIE_NAME, JSON.stringify(this.db), { ...COOKIE_ARGS })
  }
}
