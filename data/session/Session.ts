import { NextApiRequest, NextApiResponse, GetServerSidePropsContext } from 'next';
import { setCookie, parseCookies } from 'nookies'

const COOKIE_NAME = 'SESSION';
const COOKIE_PATH = '/';
const ONE_WEEK = 7 * 24 * 60 * 60;

export default class Session {
  res: NextApiResponse | GetServerSidePropsContext['res'];
  session: UserData | null;

  constructor(
    req: NextApiRequest | GetServerSidePropsContext['req'],
    res: NextApiResponse | GetServerSidePropsContext['res']
  ) {
      this.res = res;
      const session = parseCookies({ req }, { path: COOKIE_PATH })[COOKIE_NAME] || null

      this.session = session ? JSON.parse(session) : null;
  }

  hasSession() {
    return !!this.session;
  }

  get(): UserData {
    if (!this.session) throw new Error('Session does not exist')

    return this.session
  }

  create(user: UserData) {
    this.session = user;

    this.save();
  }

  save() {
    setCookie({ res: this.res }, COOKIE_NAME, JSON.stringify(this.session), { path: COOKIE_PATH, maxAge: ONE_WEEK });
  }
}
