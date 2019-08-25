import { ApiModelProperty } from '@nestjs/swagger';
import { Event } from './event.response';

export class EventList {
  @ApiModelProperty({ type: [Event] })
  readonly events: Event[];
}
