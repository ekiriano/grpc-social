import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { DatabaseModule } from './database/database.module';
import { User } from './entity/user.entity';
import { Education } from './entity/education.entity';
import { Position } from './entity/positions.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Education, Position]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
