import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { User } from './users/user.entity'; // Importe sua entidade User do TypeORM
import { AuthModule } from './auth/auth.module';
import { FilmesModule } from './filmes/filmes.module';
import { Filme } from './filmes/entities/filme.entity';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User,Filme], // Adicione todas as entidades que você deseja usar aqui
        synchronize: true, // Este é o modo seguro de desenvolvimento. Desative em produção!
      }),
      inject: [ConfigService],
    }),
    UserModule, AuthModule, FilmesModule, 
     // Importe o módulo do usuário aqui se ele usa o TypeOrm também
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
