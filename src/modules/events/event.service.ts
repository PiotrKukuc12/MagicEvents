import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  CanceledRegistration,
  CreatedRegistration,
  EventFromWebsiteDto,
} from './dto/events.dto';
import { Event } from './event.entity';
import { Events } from 'src/eventsDB';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private eventRepository: Repository<Event>,
  ) {}

  async registerUserToEvent(
    event: EventFromWebsiteDto,
    user: string,
  ): Promise<CreatedRegistration> {
    const userAlreadyRegistered = await this.eventRepository.findOne({
      where: {
        user: user,
      },
    });
    if (userAlreadyRegistered) {
      if (userAlreadyRegistered.title === event.title) {
        throw new BadRequestException('User already registered');
      }
    }
    const newEvent = this.eventRepository.save({
      title: event.title,
      user: user,
    });

    return {
      message: 'User registered to event',
      keyID: (await newEvent).id,
    };
  }

  async cancelRegistration(
    id: string,
    title: string,
  ): Promise<CanceledRegistration> {
    const event = await this.eventRepository.findOne({
      where: {
        id,
        title,
      },
    });
    if (!event) {
      throw new BadRequestException('Event not found');
    }
    // search for event in Events array with same title

    const eventToCancel = Events.find((event) => event.title === title);
    if (!eventToCancel) {
      throw new BadRequestException('Event not found');
    }

    const startDate = new Date(eventToCancel.startDate);
    const endDate = new Date(eventToCancel.endDate);
    const dateNow = new Date();

    // calculate time between now and start date of event
    const diff = startDate.getTime() - dateNow.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    if (diffDays < 2) {
      throw new BadRequestException(
        'Cannot cancel registration due to time limit',
      );
    }

    // calculate time between start and end date of event
    const diffStart = endDate.getTime() - startDate.getTime();
    const diffDaysEvents = Math.ceil(diffStart / (1000 * 3600 * 24));

    if (diffDaysEvents < 2) {
      throw new BadRequestException(
        'Cannot cancel registration due to event duration over two days',
      );
    }

    event.isClosed = true;
    await this.eventRepository.save(event);
    return {
      message: 'User unregistered from event',
    };
  }
}
