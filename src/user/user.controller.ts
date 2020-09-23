import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserCredentialsDTO } from './dtos/user.credentialsDTO';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() userCredentials: UserCredentialsDTO) {
      return this.userService.createUser(userCredentials);
    }
}
