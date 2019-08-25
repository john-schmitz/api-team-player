import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiUseTags,
  ApiImplicitBody,
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { LoginDTO } from './LoginDTO';
import { RegisterDTO } from './registerDTO';
import { UsersService } from '../users/users.service';
import { ProfileWithToken } from './responses/profileWithToken.response';
import { UnauthorizedResponse } from '../util/unauthorized.response';

@ApiUseTags('Auth')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiImplicitBody({ name: 'Login', type: LoginDTO, required: true })
  @ApiOkResponse({ description: 'Ok', type: ProfileWithToken })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ title: 'Login' })
  @Post('login')
  async login(@Request() req) {
    const access_token = await this.authService.login(req.user);
    const user = req.user;
    const profile = {
      name: user.name,
      email: user.email,
      id: user.id,
      image_url: user.image_url,
      organization: undefined,
    };
    if (user.organization) {
      profile.organization = {
        id: user.organization.id,
        name: user.organization.name,
      };
    }
    return {
      access_token,
      profile,
    };
  }

  @ApiCreatedResponse({ description: 'User created', type: ProfileWithToken })
  @ApiOperation({ title: 'Register' })
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const { name, email, id } = await this.userService.add(registerDTO);

    const profile = {
      name,
      email,
    };

    const access_token = await this.authService.login({ name, email, id });

    return {
      access_token,
      profile,
    };
  }
}
