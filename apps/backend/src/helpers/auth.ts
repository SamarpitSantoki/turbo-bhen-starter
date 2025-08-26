import { sign, verify } from 'hono/jwt';
import type { JWTPayload } from 'hono/utils/jwt/types';

interface TokenPayload extends JWTPayload {
  id: string;
  garage_id?: string;
  email?: string;
}

/* 
  Valid for 24 hours
*/
const signToken = (payload: TokenPayload): Promise<string> => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return sign(
    { ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    secret
  );
};

const verifyToken = (token: string): Promise<TokenPayload> => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return verify(token, secret) as Promise<TokenPayload>;
};

const compare = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return Bun.password.verify(password, hashedPassword);
};

const hash = async (password: string): Promise<string> => {
  return Bun.password.hash(password, {
    algorithm: 'bcrypt',
  });
};

const AuthHelper = {
  signToken,
  verifyToken,
  compare,
  hash,
};

export default AuthHelper;
