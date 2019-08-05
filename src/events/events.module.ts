import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
