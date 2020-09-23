import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import {JwtService} from '@nestjs/jwt'
import { UserCredentialsDTO } from 'src/user/dtos/user.credentialsDTO';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    async signIn(userCredentials: UserCredentialsDTO): Promise<{token: string}> {
        const user = await this.userRepository.validateUser(userCredentials);
        if(!user){
            throw new UnauthorizedException('Ooops, Usuário ou senha invalidos.');
        }

        const payload = {email: user.password}
        const token = this.jwtService.sign(payload);
        return {token};
    }
}
