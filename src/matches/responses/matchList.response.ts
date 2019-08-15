import { ApiModelProperty } from '@nestjs/swagger';
import { Match } from './match.respose';

export class MatchList {
  @ApiModelProperty({ type: [Match] })
  readonly matches: Match[];
}
