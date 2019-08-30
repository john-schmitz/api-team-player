import { Injectable } from '@nestjs/common';
import { ModalitiesRepository } from './modalities.repository';
import { Modality } from './modality.entity';

@Injectable()
export class ModalitiesService {
  constructor(private readonly modalityRepository: ModalitiesRepository){}

  async findAll(): Promise<Array<Modality>> {
    return this.modalityRepository.findAll()
  }

  async findById(modality_id: string):  Promise<Modality> {
    return this.modalityRepository.findOne(modality_id);
  }
}
