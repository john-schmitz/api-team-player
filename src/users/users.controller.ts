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
  Put,
} from '@nestjs/common';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiImplicitParam,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateOrganizationDTO } from './createOrganizationDTO';
import { FollowMatchDTO } from './followMatchDTO';
import { FollowEventDTO } from './followEventDTO';
import { FollowCompetitionDTO } from './followCompetitionDTO';
import { EditUserDTO } from './editUserDTO';
import { AuthGuard } from '@nestjs/passport';
import { ProfileWithOrganization } from '../auth/responses/profileWithTokenAndOrganization.response';

@ApiUseTags('Users')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiUnauthorizedResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Ok', type: ProfileWithOrganization })
  @ApiOperation({ title: 'User profile' })
  @Get('profile')
  getProfile(@Request() req) {
    return { profile: req.user };
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'User feed' })
  @ApiImplicitQuery({ name: 'limit', type: String, required: false })
  @ApiImplicitQuery({ name: 'page', type: String, required: false })
  @Get('feed')
  feed(@Request() req) {
    return this.usersService.feed(req.user.id);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Edit user' })
  @Put('profile')
  edit(@Body() editUserDTO: EditUserDTO, @Request() req) {
    return this.usersService.update(req.user.id, editUserDTO);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create organization' })
  @Post('organization')
  async addOrganiaztion(
    @Body() createOrganizationDTO: CreateOrganizationDTO,
    @Request() req,
  ) {
    return {
      profile: await this.usersService.createOrganization(
        req.user.id,
        createOrganizationDTO.name,
      ),
    };
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Follow match' })
  @Post('matches')
  followMatch(@Body() followMatchDTO: FollowMatchDTO, @Request() req) {
    return this.usersService.followMatch(req.user.id, followMatchDTO.matchId);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Follow competition' })
  @Post('competitions')
  followCompetition(
    @Body() followCompetitionDTO: FollowCompetitionDTO,
    @Request() req,
  ) {
    return this.usersService.followCompetition(
      req.user.id,
      followCompetitionDTO.competitionId,
    );
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Follow event' })
  @Post('events')
  followEvent(@Body() followEventDTO: FollowEventDTO, @Request() req) {
    return this.usersService.followEvent(req.user.id, followEventDTO.eventId);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Unfollow match' })
  @ApiImplicitParam({ name: 'match_id', type: String })
  @Delete('matches/:match_id')
  unfollowMatch(@Param('match_id') matchId, @Request() req) {
    return this.usersService.unfollowMatch(req.user.id, matchId);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Unfollow competition' })
  @ApiImplicitParam({ name: 'competition_id', type: String })
  @Delete('competitions/:competition_id')
  unfollowCompetition(@Param('competition_id') ccompetitionId, @Request() req) {
    return this.usersService.unfollowCompetition(req.user.id, ccompetitionId);
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Unfollow event' })
  @ApiImplicitParam({ name: 'event_id', type: String })
  @Delete('events/:event_id')
  unfollowEvent(@Param('event_id') eventId, @Request() req) {
    return this.usersService.unfollowEvent(req.user.id, eventId);
  }
}
