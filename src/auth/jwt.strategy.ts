import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOneById(payload.sub);
    console.log(user);
    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      organization: undefined,
    };

    if (user.organization) {
      response.organization = {
        id: user.organization.id,
        name: user.organization.name,
      };
    }
    return response;
  }
}
