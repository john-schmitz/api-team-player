import { Controller, UseGuards, Get, Request, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ModalitiesService } from './modalities.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiUnauthorizedResponse, ApiOkResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UnauthorizedResponse } from '../util/unauthorized.response';

@ApiUseTags('Modalities')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('modalities')
export class ModalitiesController {
  constructor(private readonly modalityService: ModalitiesService){}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All modalities' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({ description: 'Ok'})
  @Get('')
  async all() {
    return {
      modalities: await this.modalityService.findAll(),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get a modality by id' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiOkResponse({ description: 'Ok'})
  @Get(':modality_id')
  async byId(@Param('modality_id') modalityId: string) {
    return {
      modalities: await this.modalityService.findById(modalityId),
    };
  }
}
