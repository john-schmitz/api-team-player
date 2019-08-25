import { Controller, UseInterceptors, ClassSerializerInterceptor, Get, UseGuards, Request } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiUnauthorizedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedResponse } from '../util/unauthorized.response';
import { UsersService } from '../users/users.service';

@ApiUseTags('Competitions')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('competitions')
export class CompetitionsController {

  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All Competitions that the curretn user follows' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({ description: 'Ok'})
  @Get('following')
  async allFollowing(@Request() req) {
    return await this.usersService.findUserAndCompetitionsById(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All Competitions' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({ description: 'Ok'})
  @Get()
  async all(@Request() req) {
    return await this.usersService.allCompetitionsWithFollows(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All Competitions' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({ description: 'Ok'})
  @Get(':competition_id/matches')
  async allMatches(@Request() req) {
    return await this.usersService.allCompetitionsWithFollows(req.user.id);
  }
}
