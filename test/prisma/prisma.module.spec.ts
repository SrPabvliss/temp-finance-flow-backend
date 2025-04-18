import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Test suite for PrismaModule
 *
 * @group unit
 * @group prisma
 * @description Tests proper configuration and exports of the prisma module
 */
describe('PrismaModule', () => {
  /**
   * Verify that PrismaModule correctly provides PrismaService
   */
  it('should provide PrismaService', async () => {
    const module = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    const service = module.get<PrismaService>(PrismaService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(PrismaService);
  });

  /**
   * Verify that PrismaService is exported from the module
   */
  it('should export PrismaService', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    // Verificar que el servicio sea accesible desde fuera del módulo
    const service = moduleRef.get<PrismaService>(PrismaService);
    expect(service).toBeDefined();
  });
});
