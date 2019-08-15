import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Param,
  UseGuards,
  NotImplementedException,
  Body,
  Get,
  Query,
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
import { OrganizationsService } from './organizations.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMatchDTO } from './createMatchDTO';
import { CreateCompetitionDTO } from './createCompetitionDTO';

@ApiUseTags('Organizations')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiImplicitQuery({ name: 'limit', type: String, required: false })
  @ApiImplicitQuery({ name: 'page', type: String, required: false })
  @ApiOperation({ title: 'Get all matches' })
  @Get(':organization_id/matches')
  getAllMatches(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @Param('organization_id') organizationId,
  ) {
    limit = limit > 100 ? 100 : limit;
    throw new NotImplementedException();
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiImplicitQuery({ name: 'limit', type: String, required: false })
  @ApiImplicitQuery({ name: 'page', type: String, required: false })
  @ApiOperation({ title: 'Get all Evemt' })
  @Get(':organization_id/events')
  getAllEvents(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @Param('organization_id') organizationId,
  ) {
    limit = limit > 100 ? 100 : limit;
    throw new NotImplementedException();
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiImplicitQuery({ name: 'limit', type: String, required: false })
  @ApiImplicitQuery({ name: 'page', type: String, required: false })
  @ApiOperation({ title: 'Get all competitions' })
  @Get(':organization_id/competitions')
  getAllCompetitions(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @Param('organization_id') organizationId,
  ) {
    limit = limit > 100 ? 100 : limit;
    throw new NotImplementedException();
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create match' })
  @ApiImplicitParam({ name: 'organization_id', type: String })
  @Post(':organization_id/matches')
  createMatch(
    @Param('organization_id') organizationId,
    @Body() createMatchDTO: CreateMatchDTO,
  ) {
    throw new NotImplementedException();
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create event' })
  @ApiImplicitParam({ name: 'organization_id', type: String })
  @Post(':organization_id/events')
  createEvent(@Param('organization_id') organizationId) {
    throw new NotImplementedException();
  }

  @ApiUnauthorizedResponse({})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create competition' })
  @ApiImplicitParam({ name: 'organization_id', type: String })
  @Post(':organization_id/competitions')
  createCompetition(
    @Param('organization_id') organizationId,
    @Body() createCompetitionDTO: CreateCompetitionDTO,
  ) {
    throw new NotImplementedException();
  }
}
