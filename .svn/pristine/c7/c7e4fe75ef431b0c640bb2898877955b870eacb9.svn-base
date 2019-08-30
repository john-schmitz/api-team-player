import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Action } from './action.type';

export class UpdateMatchDTO {
  @ApiModelProperty({ example: '2019-08-25T17:01:12.937Z' })
  @IsNotEmpty()
  readonly date: Date;
  @ApiModelProperty({ example: 1 })
  @IsNotEmpty()
  readonly scorePrincipal: number;
  @ApiModelProperty({ example: 0 })
  @IsNotEmpty()
  readonly scoreVisitor: number;
  @ApiModelProperty({ type: Action })
  @IsNotEmpty()
  readonly action: Action;
}
