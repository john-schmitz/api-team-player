import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBase64 } from 'class-validator';

export class CreateOrganizationDTO {
  @ApiModelProperty({ example: 'bolo123' })
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ example: 'bolo123' })
  @IsBase64()
  @IsNotEmpty()
  image: string;
}
