import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { databaseConfig } from '#configs/database.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '#api/auth/guards/auth.guard.js';
import { UsersModule } from '#api/users/users.module.js';
import { AuthModule } from '#api/auth/auth.module.js';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
