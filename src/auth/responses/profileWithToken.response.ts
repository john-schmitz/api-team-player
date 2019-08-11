import { ApiModelProperty } from '@nestjs/swagger';
import { Profile } from './profile.type';

export class ProfileWithToken {
  @ApiModelProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obJpYXQiOjE1NjU0Nzk3NjksImV4cCI6MTU2NTU2NjE2OX0.Pectm0h39R1iNSUmcWMnDfhxB6Is6PL_LWk7SXDMzo0',
  })
  readonly access_token: string;
  @ApiModelProperty({ type: Profile })
  readonly profile: Profile;
}
