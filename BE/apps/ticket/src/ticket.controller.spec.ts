import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

describe('TicketController', () => {
  let ticketController: TicketController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [TicketService],
    }).compile();

    ticketController = app.get<TicketController>(TicketController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ticketController.getHello()).toBe('Hello World!');
    });
  });
});
