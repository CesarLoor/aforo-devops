import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity.js';
import { PersonaController } from './persona.controller.js';
import { PersonaService } from './persona.service.js';

describe('PersonaController', () => {
  let controller: PersonaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonaController],
      providers: [
        PersonaService,
        { provide: getRepositoryToken(Persona), useValue: {} },
      ],
    }).compile();

    controller = module.get<PersonaController>(PersonaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
