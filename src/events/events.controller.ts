import {
  Controller,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedResponse } from '../util/unauthorized.response';
import { EventList } from './responses/eventList.response';
import { EventsService } from './events.service';
import { UsersService } from '../users/users.service';
import { CompetitionsService } from '../competitions/competitions.service';

@ApiUseTags('Events')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventService: EventsService,
    private readonly usersService: UsersService,
    private readonly competitionsService: CompetitionsService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All Events' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({ description: 'Ok', type: EventList })
  @Get()
  all() {
    this.eventService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All Events that the current user follows' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({ description: 'Ok', type: EventList })
  @Get('following')
  allFollowing(@Request() req) {
    return this.usersService.allEventsWithFollows(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All Competitions of the event' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({ description: 'Ok'})
  @Get(':event_id/competitions')
  allCompetitions(@Param('event_id') eventId: string) {
    return this.competitionsService.findByEnventId(eventId);
  }
}
