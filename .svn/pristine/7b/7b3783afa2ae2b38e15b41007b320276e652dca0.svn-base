import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @ApiModelProperty({ example: 'johngc2010@nicemail.com.br' })
  @IsEmail()
  readonly email: string;
  @ApiModelProperty({ example: 'John Schmitz' })
  @IsNotEmpty()
  readonly name: string;
  @ApiModelProperty({ example: 'bolo123' })
  @IsNotEmpty()
  readonly password: string;
}
