import { ApiModelProperty } from '@nestjs/swagger';

export class Event {
  @ApiModelProperty({
    example: 'yeiuhgewry32487923hdj',
  })
  readonly id: string;
  @ApiModelProperty({
    example: 'Olimpiadas 2019',
  })
  readonly name: string;
  @ApiModelProperty({
    example: 'Pequim',
  })
  readonly place: string;
}
