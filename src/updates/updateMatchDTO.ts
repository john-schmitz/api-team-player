import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Action } from './action.type';

export class UpdateMatchDTO {
  @ApiModelProperty({ example: 'eccc73f9-5d5c-4d5f-bc91-36dswag38f44' })
  @IsNotEmpty()
  readonly match_id: string;
  @ApiModelProperty({ example: '1565823625' })
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
