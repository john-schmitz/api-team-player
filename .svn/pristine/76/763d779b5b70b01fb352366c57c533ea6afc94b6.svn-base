import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.usersRepository.findOneById(payload.sub);
    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      organization: undefined,
      image: user.image,
    };

    if (user.organization) {
      response.organization = {
        id: user.organization.id,
        name: user.organization.name,
        image: user.organization.image,
      };
    }
    return response;
  }
}
