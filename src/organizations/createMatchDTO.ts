import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsDate } from 'class-validator';

export class CreateMatchDTO {
  @ApiModelProperty({ example: '1566680974' })
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @ApiModelProperty({ example: 'Coringão' })
  @IsNotEmpty()
  readonly namePrincipal: string;

  @ApiModelProperty({ example: 'Gremio' })
  @IsNotEmpty()
  readonly nameVisitor: string;
}
