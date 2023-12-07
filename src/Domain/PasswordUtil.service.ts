import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordUtilService {
  constructor() {}

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verifyPassword(password: string, hashedPass: string): Promise<boolean> {
    return argon2.verify(hashedPass, password);
  }
}
