import User from '../models/user';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate } from 'deep-email-validator';

const isEmailValid = async (email: string) => {
  return await validate({ 
    email: email,
    validateRegex: true,
    validateMx: false,
    validateTypo: false,
    validateDisposable: false,
    validateSMTP: false,
  });
};

const userRegister = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ error: 'Email já cadastrado' });
    return;
  }

  const { valid } = await isEmailValid(email);
  if (!valid) {
    res.status(400).json({ error: 'Email inválido' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ email, username, password: hashedPassword });
  res.status(200).json({ message: 'Usuário criado com sucesso!' });
};

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Usuário não existe!' });
  else {
    const passwordValidates = await bcrypt.compare(
      password,
      user.password as string
    );

    if (passwordValidates) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET as string);
      res.status(200).json({ token });
    } else return res.status(401).json({ error: 'Email ou senha incorretos!' });
  }
};

const getUser = async (req: Request, res: Response) => {
  if (req.body.email) {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(200)
        .json({ email: req.body.email, username: user.username });
    } else {
      return res.status(401).json({ error: 'Não autorizado - Usuário não identificado' });
    }
  }
  return res.status(401).json({ error: 'Não autorizado - Sem email' });
};

export { userRegister, userLogin, getUser };
