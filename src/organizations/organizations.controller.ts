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
  Request,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiImplicitParam,
  ApiImplicitQuery,
  ApiImplicitBody,
} from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMatchDTO } from './createMatchDTO';
import { CreateCompetitionDTO } from './createCompetitionDTO';
import { UnauthorizedResponse } from '../util/unauthorized.response';
import { CreateEventDTO } from './createEventDTO';

@ApiUseTags('Organizations')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create competition' })
  @ApiImplicitParam({ name: 'organization_id', type: String })
  @ApiImplicitBody({
    required: true,
    name: 'CreateCompetitionDTO',
    type: CreateCompetitionDTO,
  })
  @Post(':organization_id/competitions')
  createCompetition(
    @Request() req,
    @Param('organization_id') organizationId,
    @Body() createCompetition: CreateCompetitionDTO,
  ) {
    if (req.user.organization && req.user.organization.id === organizationId) {
      return this.organizationsService.addCompetition(
        createCompetition,
        organizationId,
      );
    }
    throw new BadRequestException('You don\'t bellong to this organization =(');
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiImplicitQuery({ name: 'limit', type: String, required: false })
  @ApiImplicitQuery({ name: 'page', type: String, required: false })
  @ApiImplicitParam({ name: 'organization_id', type: String })
  @ApiOperation({ title: 'Get all Events' })
  @Get(':organization_id/events')
  async getAllEvents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Param('organization_id') organizationId,
  ) {
    limit = limit > 100 ? 100 : limit;
    const [data, count] = await this.organizationsService.findAllEvents(
      organizationId,
      page,
      limit,
    );
    return {
      data,
      count,
    };
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create event' })
  @ApiImplicitParam({ name: 'organization_id', type: String })
  @Post(':organization_id/events')
  createEvent(
    @Param('organization_id') organizationId,
    @Body() createEventDTO: CreateEventDTO,
    @Request() req,
  ) {
    if (req.user.organization && req.user.organization.id === organizationId) {
      return this.organizationsService.addEvent(createEventDTO, organizationId);
    }
    throw new BadRequestException('You don\'t bellong to this organization =(');
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiImplicitQuery({ name: 'limit', type: String, required: false })
  @ApiImplicitQuery({ name: 'page', type: String, required: false })
  @ApiOperation({ title: 'Get all competitions' })
  @ApiImplicitParam({ name: 'organization_id', type: String })
  @Get(':organization_id/competitions')
  async getAllCompetitions(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Param('organization_id') organizationId,
  ) {
    limit = limit > 100 ? 100 : limit;
    const [data, count] = await this.organizationsService.findAllCompetitions(
      organizationId,
      page,
      limit,
    );
    return {
      data,
      count,
    };
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create match' })
  @ApiImplicitParam({ name: 'organization_id', type: String })
  @ApiImplicitParam({ name: 'competition_id', type: String })
  @Post(':organization_id/competitions/:competition_id/matches')
  createMatch(
    @Param('organization_id') organizationId,
    @Param('competition_id') competitionId,
    @Body() createMatchDTO: CreateMatchDTO,
    @Request() req,
  ) {
    if (req.user.organization && req.user.organization.id === organizationId) {
      return this.organizationsService.addMatch(createMatchDTO, competitionId);
    }
    throw new BadRequestException('You don\'t bellong to this organization =(');
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiImplicitQuery({ name: 'limit', type: String, required: false })
  @ApiImplicitQuery({ name: 'page', type: String, required: false })
  @ApiImplicitParam({ name: 'organization_id', type: String })
  @ApiOperation({ title: 'Get all matches' })
  @Get(':organization_id/matches')
  async getAllMatches(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Param('organization_id') organizationId,
  ) {
    limit = limit > 100 ? 100 : limit;
    const [data, count] = await this.organizationsService.findAllMatches(
      organizationId,
      page,
      limit,
    );

    return {
      data,
      count,
    };
  }
}
