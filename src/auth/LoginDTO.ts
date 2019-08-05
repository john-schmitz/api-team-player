import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @ApiModelProperty({ example: 'johngc2010@nicemail.com.br' })
  @IsEmail()
  readonly email: string;
  @ApiModelProperty({ example: 'bolo123' })
  @IsNotEmpty()
  readonly password: string;
}
