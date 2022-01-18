import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private eventRepository: Repository<Event>,
  ) {}

  sayHello() {
    return 'Hello World!';
  }
}
