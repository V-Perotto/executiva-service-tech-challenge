import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const JwtAuthGuardBase = AuthGuard('jwt');

@Injectable()
export class JwtAuthGuard extends JwtAuthGuardBase {}
