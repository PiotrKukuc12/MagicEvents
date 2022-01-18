import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';

@Controller()
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  getHello(): string {
    return this.eventService.sayHello();
  }
}
