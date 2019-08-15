import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Action {
  @ApiModelProperty({ example: 'Gol do menino ronallllldo' })
  @IsNotEmpty()
  readonly text: string;
  @ApiModelProperty({ example: 'SCORE' })
  @IsNotEmpty()
  readonly type: string;
}
