import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findOneById(eventId: string): Promise<Event> {
    return this.eventRepository.findOne({ where: { id: eventId } });
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }
}
