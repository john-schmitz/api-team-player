import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Update } from './update.entity';
import { UpdatesService } from './updates.service';

@Module({
  imports: [TypeOrmModule.forFeature([Update])],
  providers: [UpdatesService],
})
export class UpdatesModule {}
