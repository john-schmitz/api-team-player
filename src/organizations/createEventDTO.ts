import { ApiModelProperty } from '@nestjs/swagger';

export class CreateEventDTO {
  @ApiModelProperty({ example: 'Olimpiadas 2019' })
  readonly name: string;
  @ApiModelProperty({ example: 'Rua das laranjas 123, Sao Paulo' })
  readonly place: string;
}
