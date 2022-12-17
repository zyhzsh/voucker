// import { AuthorizationGuard, PermissionsGuard } from '@app/common';
import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthController {
  @Get()
  healthCheck() {
    return 'OK';
  }
}
