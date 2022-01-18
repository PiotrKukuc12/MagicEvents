import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { EventModule } from 'src/modules/events/event.module';

@Module({
  imports: [
    EventModule,
    RouterModule.register([
      {
        path: 'api/events',
        module: EventModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
