import { Module, forwardRef } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Match } from './match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesController } from './matches.controller';
import { UsersModule } from '../users/users.module';
import { UpdatesModule } from '../updates/updates.module';

@Module({
  providers: [MatchesService],
  imports: [
    TypeOrmModule.forFeature([Match]),
    forwardRef(() => UsersModule),
    forwardRef(() => UpdatesModule),
  ],
  exports: [MatchesService],
  controllers: [MatchesController],
})
export class MatchesModule {}
