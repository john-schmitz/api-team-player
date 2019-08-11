import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { MatchesModule } from '../matches/matches.module';
import { EventsModule } from '../events/events.module';
import { CompetitionsModule } from '../competitions/competitions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => MatchesModule),
    EventsModule,
    CompetitionsModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
