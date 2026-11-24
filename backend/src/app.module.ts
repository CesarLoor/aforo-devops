import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PersonaModule } from './persona/persona.module.js';

@Module({
  imports: [
    // Lee el mismo .env de la raíz que usa docker-compose (POSTGRES_PASSWORD)
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '../.env'] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: Number(config.get('DB_PORT', 5434)),
        username: config.get('DB_USER', 'aforo'),
        password: config.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: config.get('DB_NAME', 'aforo_db'),
        autoLoadEntities: true,
        // Las tablas se crean con SQL (database/01_schema.sql); TypeORM no debe modificarlas
        synchronize: false,
      }),
    }),
    PersonaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
