import { ApiModelProperty } from '@nestjs/swagger';

export class Profile {
  @ApiModelProperty({ example: 'johngc2010@nicemail.com.br' })
  readonly email: string;
  @ApiModelProperty({ example: 'John Schmitz' })
  readonly name: string;
  @ApiModelProperty({ example: '1' })
  readonly id: string;
  @ApiModelProperty({ example: 'https://i.imgur.com/Ss0fZAy.png' })
  readonly image: string;
}
