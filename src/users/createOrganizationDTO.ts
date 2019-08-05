import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrganizationDTO {
  @ApiModelProperty({ example: 'bolo123' })
  @IsNotEmpty()
  readonly name: string;
}
