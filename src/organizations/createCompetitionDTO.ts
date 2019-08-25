import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

export class CreateCompetitionDTO {
  @ApiModelPropertyOptional({
    example: '1f54194e-8456-4b71-9e55-604e531b8983',
    nullable: true,
  })
  readonly event_id?: string;

  @ApiModelProperty({ type: String, example: 'Quimada Libre' })
  readonly name: string;

  @ApiModelProperty({ type: String, example: 'QUEIMADA' })
  readonly modality: string;
}
