import { Repository, EntityRepository } from 'typeorm';
import { Modality } from './modality.entity';

@EntityRepository(Modality)
export class ModalitiesRepository extends Repository<Modality> {
  async findAll(): Promise<Modality[] | undefined> {
    return this.find();
  }

  async findById(id: string):  Promise<Modality | undefined> {
    return this.findOne(id);
  }
}
