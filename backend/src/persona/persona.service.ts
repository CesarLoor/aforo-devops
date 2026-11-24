import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto.js';
import { UpdatePersonaDto } from './dto/update-persona.dto.js';
import { Persona } from './entities/persona.entity.js';

// Restricciones de PostgreSQL -> 409 con mensaje claro (en vez de 500)
export function conflicto(e: unknown): never {
  const codigo =
    e instanceof QueryFailedError
      ? (e.driverError as { code?: string }).code
      : undefined;
  if (codigo === '23505')
    throw new ConflictException('Ya existe una persona con esa identificación');
  if (codigo === '23503')
    throw new ConflictException(
      'La persona tiene una cuenta de usuario asociada',
    );
  throw e;
}

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona) private readonly repo: Repository<Persona>,
  ) {}

  create(dto: CreatePersonaDto) {
    return this.repo.save(this.repo.create(dto)).catch(conflicto);
  }

  findAll() {
    return this.repo.find({ order: { apellidos: 'ASC', nombres: 'ASC' } });
  }

  async findOne(id: string) {
    const persona = await this.repo.findOneBy({ id_persona: id });
    if (!persona) throw new NotFoundException(`Persona ${id} no encontrada`);
    return persona;
  }

  async update(id: string, dto: UpdatePersonaDto) {
    const persona = await this.findOne(id);
    return this.repo.save(this.repo.merge(persona, dto)).catch(conflicto);
  }

  async remove(id: string) {
    const persona = await this.findOne(id);
    await this.repo.remove(persona).catch(conflicto);
    return { mensaje: `Persona ${id} eliminada` };
  }
}
