import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { Post } from './models/post.model';
import { User } from './models/user.model';
import { Session } from './models/session.model';
import { SharedModule } from './shared/shared.module';
import { RoleModule } from './role/role.module';
import { Role } from "./models/role.model";
import { UserRole } from "./models/user-role.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [Post, User, Session, Role, UserRole],
      autoLoadModels: true
    }),
    UserModule,
    AuthModule,
    PostModule,
    SharedModule,
    RoleModule
  ]
})
export class AppModule {}
