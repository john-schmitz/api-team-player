import { Module, forwardRef } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Match } from './match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesController } from './matches.controller';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [MatchesService],
  imports: [TypeOrmModule.forFeature([Match]), forwardRef(() => UsersModule)],
  exports: [MatchesService],
  controllers: [MatchesController],
})
export class MatchesModule {}
