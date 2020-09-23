import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDTO } from './dtos/user.credentialsDTO';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    async createUser(userCredentials: UserCredentialsDTO): Promise<void> {
      const user = this.userRepository.createUser(userCredentials);

        if(!user){
            throw new NotFoundException('Ooops, erro ao cadastrar, verifique os dados');
        }

        return user;
    }
}
