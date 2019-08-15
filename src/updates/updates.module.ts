import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Update } from './update.entity';
import { UpdatesService } from './updates.service';
import { MatchesModule } from '../matches/matches.module';

@Module({
  imports: [TypeOrmModule.forFeature([Update]), forwardRef(() => MatchesModule)],
  providers: [UpdatesService],
  exports: [UpdatesService],
})
export class UpdatesModule {}
