import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {
  getHello(): string {
    return 'Hello World!';
  }
}
