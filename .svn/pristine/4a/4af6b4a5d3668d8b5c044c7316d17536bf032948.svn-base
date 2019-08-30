import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBase64 } from 'class-validator';

export class EditUserDTO {
  @ApiModelPropertyOptional({ example: 'Rose Lalonde' })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiModelPropertyOptional({ example: 'LongBase64' })
  @IsBase64()
  @IsOptional()
  public image: string;
}
