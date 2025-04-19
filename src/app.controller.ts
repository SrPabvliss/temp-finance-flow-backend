import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response) {
    return res.status(200).json({
      status: 'ok',
      message: 'API funcionando correctamente. Use las rutas con prefijo /api/',
      documentation: '/api/docs'
    });
  }
  
  @Get('api')
  apiRoot(@Res() res: Response) {
    return res.status(200).json({
      status: 'ok',
      message: 'Use las rutas específicas como /api/users, /api/incomes, etc.',
      documentation: '/api/docs'
    });
  }
}
