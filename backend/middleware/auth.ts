import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Não autorizado - Sem autorização' });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Não autorizado - Sem token' });
      return;
    }

    const decoded: jwt.JwtPayload | string = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (!decoded) {
      res.status(401).json({ error: 'Não autorizado - Não decodificado' });
      return;
    }

    req.body.email = (decoded as jwt.JwtPayload).email;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Não autorizado' });
  }
}

export default userMiddleware;
