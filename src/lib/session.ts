import { SessionOptions } from 'iron-session';

export interface SessionData {
  userId?: string;
  isLoggedIn: boolean;
  username?: string;
  role?: string;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieName: 'admin_blog_session',
  cookieOptions: {
    // secure: true should be used in production (HTTPS)
    secure: process.env.NODE_ENV === 'production',
  },
};
