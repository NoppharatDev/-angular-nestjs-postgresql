import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepositoryModule } from './repositories/user/user.module';
import { BcryptModule } from '@services/bcrypt/bcrypt.module';

@Module({
  imports: [
    BcryptModule,
    UserRepositoryModule
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
