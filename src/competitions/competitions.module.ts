import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { Competition } from './competition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CompetitionsService],
  imports: [TypeOrmModule.forFeature([Competition])],
  exports: [CompetitionsService],
})
export class CompetitionsModule {}
