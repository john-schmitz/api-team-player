import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
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
} from '@nestjs/swagger';
import { LoginDTO } from './LoginDTO';
import { RegisterDTO } from './registerDTO';
import { UsersService } from '../users/users.service';

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
  @ApiOkResponse({ description: 'Ok' })
  @ApiUnauthorizedResponse({})
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const { name, email } = req.user;

    const profile = {
      name,
      email,
    };

    const access_token = await this.authService.login(req.user);

    return {
      access_token,
      profile,
    };
  }

  @ApiOkResponse({ description: 'Ok' })
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

  @ApiUnauthorizedResponse({})
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return { profile: req.user };
  }
}
