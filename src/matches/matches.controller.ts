import {
  Controller,
  Get,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { Match } from './match.entity';
import { MatchesService } from './matches.service';
import {
  ApiBearerAuth,
  ApiUseTags,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiOkResponse,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { MatchList } from './responses/matchList.response';
import { UpdatesService } from '../updates/updates.service';
import { UpdateMatchDTO } from '../updates/updateMatchDTO';
import { UnauthorizedResponse } from '../util/unauthorized.response';

@ApiUseTags('Matches')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly usersService: UsersService,
    private readonly updatesService: UpdatesService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All matches that the current user follows' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({ description: 'Ok', type: MatchList })
  @Get('following')
  allFollowing(@Request() req) {
    return this.usersService.findUserAndMatchesById(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All matches' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({ description: 'Ok', type: MatchList })
  @Get('')
  async all(@Request() req) {
    return {
      matches: await this.usersService.allMatchesWithFollows(req.user.id),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOperation({ title: 'Send match update' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiImplicitParam({ name: 'match_id' })
  @Post(':match_id/update')
  update(
    @Request() req,
    @Body() updateMatchDTO: UpdateMatchDTO,
    @Param('match_id') matchId,
  ) {
    this.updatesService.add(updateMatchDTO, matchId, req.user.organization.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({ description: 'Ok' })
  @ApiImplicitParam({ name: 'match_id' })
  @Get(':match_id')
  findById(@Param('match_id') matchId: string) {
    return this.matchesService.findOneById(matchId);
  }
}
