import { Provider } from '@nestjs/common';
import { Event } from 'src/modules/events/event.entity';
import { Connection } from 'typeorm';

export const EventProvider: Provider[] = [
  {
    provide: 'EVENT_REPOSITORY',
    useFactory: async (connection: Connection) =>
      connection.getRepository(Event),
    inject: ['DATABASE_CONNECTION'],
  },
];
