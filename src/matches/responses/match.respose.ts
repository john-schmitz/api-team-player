import { ApiModelProperty } from '@nestjs/swagger';

export class Match {
  @ApiModelProperty({
    example: 'yeiuhgewry32487923hdj',
  })
  readonly id: string;
  @ApiModelProperty({
    example: 'Vaxco',
  })
  readonly namePrincipal: string;
  @ApiModelProperty({
    example: 'Flamengo',
  })
  readonly nameVisitor: string;
  @ApiModelProperty({
    example: 'Soccer',
  })
  readonly modality: string;
  @ApiModelProperty({
    example: 'Guanabara',
  })
  readonly place: string;
  @ApiModelProperty({
    example: 'Tech and boys',
  })
  readonly date: Date;
  @ApiModelProperty({
    example: 'true',
  })
  readonly following: boolean;
}
