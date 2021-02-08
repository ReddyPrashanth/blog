import { Address } from './address.entity';
import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, Address])
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
