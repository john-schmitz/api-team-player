import expressJwt from 'express-jwt';

export default function jwt(): any {
  return expressJwt({ secret: process.env.JWT_SECRET }).unless({
    path: [
      // public routes that don't require authentication
      '/user/authenticate',
      '/register',
    ],
  });
}
