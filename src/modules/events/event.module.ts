import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.mode';
import { EventProvider } from 'src/core/providers/event.provider';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [...EventProvider, EventService],
})
export class EventModule {}
