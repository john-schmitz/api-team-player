import { Module, forwardRef } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { UsersModule } from '../users/users.module';
import { CompetitionsModule } from '../competitions/competitions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), forwardRef(() => UsersModule), CompetitionsModule],
  providers: [EventsService],
  exports: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
