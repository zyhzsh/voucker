import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
