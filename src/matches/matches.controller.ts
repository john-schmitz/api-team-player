import {
  Controller,
  Get,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
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

@ApiUseTags('Matches')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiUnauthorizedResponse({})
  @ApiOperation({ title: 'Get All matches' })
  @ApiUnauthorizedResponse({})
  @ApiOkResponse({ description: 'Ok', type: MatchList })
  @Get()
  all(@Request() req): Promise<Match[]> {
    return this.usersService.allWithFollows(req.user.id);
  }
}
