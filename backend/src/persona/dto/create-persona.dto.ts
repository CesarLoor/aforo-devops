import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

// Valida las altas: los límites coinciden con las columnas de la tabla persona
export class CreatePersonaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombres: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  identificacion: string;

  @IsEmail({}, { message: 'correo debe ser un correo electrónico válido' })
  @MaxLength(150)
  correo: string;

  @IsOptional()
  @Matches(/^[0-9+ ]{7,20}$/, {
    message: 'telefono debe tener de 7 a 20 dígitos',
  })
  telefono?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
