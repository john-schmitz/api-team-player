import { ApiModelProperty } from '@nestjs/swagger';
import { IsBase64 } from 'class-validator';

export class CreateEventDTO {
  @ApiModelProperty({ example: 'Olimpiadas 2019' })
  readonly name: string;
  @ApiModelProperty({ example: 'Rua das laranjas 123, Sao Paulo' })
  readonly place: string;
  @ApiModelProperty({ example: 'Rua das laranjas 123, Sao Paulo' })
  @IsBase64()
  readonly image: string;
}
