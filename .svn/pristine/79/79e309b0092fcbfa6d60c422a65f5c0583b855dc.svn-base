import { Module } from '@nestjs/common';
import { ModalitiesController } from './modalities.controller';
import { ModalitiesService } from './modalities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModalitiesRepository } from './modalities.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModalitiesRepository])],
  controllers: [ModalitiesController],
  providers: [ModalitiesService]
})
export class ModalitiesModule {}
