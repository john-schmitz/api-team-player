import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateOrganizationDTO } from './createOrganizationDTO';
import { FollowMatchDTO } from './followMatchDTO';
import { FollowEventDTO } from './followEventDTO';
import { FollowCompetitionDTO } from './followCompetitionDTO';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Users')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @Post('organization')
  addOrganiaztion(
    @Body() createOrganizationDTO: CreateOrganizationDTO,
    @Request() req,
  ) {
    return this.usersService.createOrganization(
      req.user.id,
      createOrganizationDTO.name,
    );
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @Get('feed')
  feed(@Request() req) {
    return this.usersService.feed(req.user.id);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @Post('matches')
  followMatch(@Body() followMatchDTO: FollowMatchDTO, @Request() req) {
    return this.usersService.followMatch(req.user.id, followMatchDTO.matchId);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @Delete('matches/:matchId')
  unfollowMatch( @Param('matchId') matchId, @Request() req) {
    return this.usersService.unfollowMatch(req.user.id, matchId);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @Post('competitions')
  followCompetition(@Body() followCompetitionDTO: FollowCompetitionDTO, @Request() req) {
    return this.usersService.followCompetition(req.user.id, followCompetitionDTO.competitionId);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @Delete('competitions/:competitionId')
  unfollowCompetition( @Param('competitionId') ccompetitionId, @Request() req) {
    return this.usersService.unfollowCompetition(req.user.id, ccompetitionId);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @Post('events')
  followEvent(@Body() followEventDTO: FollowEventDTO, @Request() req) {
    return this.usersService.followEvent(req.user.id, followEventDTO.eventId);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @Delete('events/:eventId')
  unfollowEvent( @Param('eventId') eventId, @Request() req) {
    return this.usersService.unfollowEvent(req.user.id, eventId);
  }
}
