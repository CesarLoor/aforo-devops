import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { Persona } from './entities/persona.entity.js';
import { conflicto, PersonaService } from './persona.service.js';

const errorPg = (code: string) =>
  new QueryFailedError('INSERT', [], Object.assign(new Error('pg'), { code }));

describe('PersonaService', () => {
  let service: PersonaService;
  const repo = {
    findOneBy: vi.fn(),
    save: vi.fn(),
    create: vi.fn((d) => d),
    merge: vi.fn(),
    find: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonaService,
        { provide: getRepositoryToken(Persona), useValue: repo },
      ],
    }).compile();

    service = module.get<PersonaService>(PersonaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne responde 404 si la persona no existe', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(
      service.findOne('00000000-0000-4000-8000-000000000000'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create responde 409 si la identificación ya existe', async () => {
    repo.save.mockRejectedValue(errorPg('23505'));
    await expect(
      service.create({
        nombres: 'Ana',
        apellidos: 'Perez',
        identificacion: 'X',
        correo: 'a@b.ec',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('conflicto deja pasar los demás errores', () => {
    const otro = new Error('caída de la base');
    expect(() => conflicto(otro)).toThrow(otro);
    expect(() => conflicto(errorPg('23503'))).toThrow(ConflictException);
  });
});
