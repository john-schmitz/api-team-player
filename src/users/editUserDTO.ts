import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EditUserDTO {
  @ApiModelProperty({ example: 'Rose Lalonde' })
  @IsNotEmpty()
  readonly name: string;
}
