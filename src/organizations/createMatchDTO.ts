import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateMatchDTO {
  @ApiModelProperty({ example: '2019-08-25T17:01:12.937Z' })
  @IsNotEmpty()
  @IsDateString()
  readonly date: Date;

  @ApiModelProperty({ example: 'Coringão' })
  @IsNotEmpty()
  readonly namePrincipal: string;

  @ApiModelProperty({ example: 'Gremio' })
  @IsNotEmpty()
  readonly nameVisitor: string;

  @ApiModelProperty({ example: 'Praia de peruibe' })
  @IsNotEmpty()
  readonly place: string;
}
