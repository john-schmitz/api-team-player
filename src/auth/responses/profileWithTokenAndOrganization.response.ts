import { ApiModelProperty } from '@nestjs/swagger';
import { Profile } from './profile.type';

class Organiaztion {
  @ApiModelProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  readonly id: string;

  @ApiModelProperty({
    example: 'Tech and boys',
  })
  readonly name: string;
}

class ProfileWithOrg extends Profile {
  @ApiModelProperty({ type: Organiaztion })
  readonly organization: Organiaztion;
}
export class ProfileWithOrganization {
  @ApiModelProperty({ type: ProfileWithOrg })
  readonly profile: ProfileWithOrg;
}
