import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      name: user.name,
      email: user.email,
      sub: user.id,
      organization: undefined,
    };
    if (user.organization) {
      payload.organization = {
        id: user.organization.id,
        name: user.organization.name,
      };
    }
    return this.jwtService.sign(payload);
  }
}
