import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompetitionDTO {
  @ApiModelPropertyOptional({
    example: '1f54194e-8456-4b71-9e55-604e531b8983',
    nullable: true,
  })
  readonly eventId?: string;

  @ApiModelProperty({ type: String, example: 'Quimada Libre' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiModelProperty({ type: String, example: 'QUEIMADA' })
  @IsNotEmpty()
  @IsString()
  readonly modality: string;
  @ApiModelProperty({ example: 'bolo123' })
  @IsBase64()
  @IsNotEmpty()
  image: string;
}
