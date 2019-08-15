import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateCompetitionDTO {
  @ApiModelPropertyOptional({ example: '1f54194e-8456-4b71-9e55-604e531b8983' })
  readonly event_id: string;
}
