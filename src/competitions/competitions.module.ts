import { Module, forwardRef } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { Competition } from './competition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionsController } from './competitions.controller';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [CompetitionsService],
  imports: [TypeOrmModule.forFeature([Competition]), forwardRef(() => UsersModule)],
  exports: [CompetitionsService],
  controllers: [CompetitionsController],
})
export class CompetitionsModule {}
