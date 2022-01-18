import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CanceledRegistration,
  CreatedRegistration,
  EventFromWebsiteDto,
} from './dto/events.dto';
import { EventService } from './event.service';

@Controller()
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async registerUserToEvent(
    @Body() event: EventFromWebsiteDto,
    @Body() user: string,
  ): Promise<CreatedRegistration> {
    return await this.eventService.registerUserToEvent(event, user);
  }

  @Put(':id')
  async cancelRegistration(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body('title') title: string,
  ): Promise<CanceledRegistration> {
    return await this.eventService.cancelRegistration(id, title);
  }
}
