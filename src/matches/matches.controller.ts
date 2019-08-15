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
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { MatchList } from './responses/matchList.response';
import { UpdatesService } from '../updates/updates.service';
import { UpdateMatchDTO } from '../updates/updateMatchDTO';

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
  @ApiOperation({ title: 'Get All matches' })
  @ApiUnauthorizedResponse({})
  @ApiOkResponse({ description: 'Ok', type: MatchList })
  @Get()
  all(@Request() req): Promise<Match[]> {
    return this.usersService.allWithFollows(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiUnauthorizedResponse({})
  @ApiOperation({ title: 'Send match update' })
  @ApiOkResponse({ description: 'Ok'})
  @Post(':match_id/update')
  update(@Request() req, @Body() updateMatchDTO: UpdateMatchDTO, @Param('match_id') matchId) {
    this.updatesService.add(updateMatchDTO, matchId, req.user.organization.id);
  }
}
