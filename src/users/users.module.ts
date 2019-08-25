import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { MatchesModule } from '../matches/matches.module';
import { EventsModule } from '../events/events.module';
import { CompetitionsModule } from '../competitions/competitions.module';
import { Update } from '../updates/update.entity';
import { FollowService } from './follow/follow.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, Update]),
    forwardRef(() => MatchesModule),
    forwardRef(() => EventsModule),
    CompetitionsModule,
  ],
  providers: [UsersService, FollowService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
