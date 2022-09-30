import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from 'src/entity/education.entity';
import { Position } from 'src/entity/positions.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret123!',
      database: 'user-svc',
      entities: [User, Education, Position],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
