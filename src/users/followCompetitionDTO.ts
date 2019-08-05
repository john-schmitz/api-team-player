import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FollowCompetitionDTO {
  @ApiModelProperty({ example: '1f54194e-8456-4b71-9e55-604e531b8983' })
  @IsNotEmpty()
  readonly competitionId: string;
}
