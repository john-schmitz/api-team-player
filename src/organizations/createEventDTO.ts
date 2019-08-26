import { ApiModelProperty } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty } from 'class-validator';

export class CreateEventDTO {
  @ApiModelProperty({ example: 'Olimpiadas 2019' })
  @IsNotEmpty()
  readonly name: string;
  @ApiModelProperty({ example: 'Rua das laranjas 123, Sao Paulo' })
  @IsNotEmpty()
  readonly place: string;
  @ApiModelProperty({ example: 'Rua das laranjas 123, Sao Paulo' })
  @IsNotEmpty()
  @IsBase64()
  readonly image: string;
}
