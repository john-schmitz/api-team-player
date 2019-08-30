import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      image: user.image,
      name: user.name,
      email: user.email,
      sub: user.id,
      organization: undefined,
    };
    if (user.organization) {
      payload.organization = {
        id: user.organization.id,
        name: user.organization.name,
        image: user.organization.image,
      };
    }
    return this.jwtService.sign(payload);
  }
}
