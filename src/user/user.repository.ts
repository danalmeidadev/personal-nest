import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialsDTO } from './dtos/user.credentialsDTO';
import { User } from './entities/user.entity';
import { UserStatus } from './enum/user.enum';
import { UserRole } from './enum/user.role.enum';
import {compare, hash} from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCredentials: UserCredentialsDTO): Promise<void> {
    const { email, password } = userCredentials;

    const userExist = await this.findOne({where: {email}});

    if(userExist){
      throw new ConflictException('Ooops, O email informado já está cadastrado');
    } 

    const hashPassword = await hash(password, 10);
    const user = this.create({
      email,
      password: hashPassword,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
    })
    await user.save();
  }

  async validateUser(userCredentials: UserCredentialsDTO): Promise<User> {
    const {email, password} = userCredentials;

    const user = this.findOne({where: {email}});
    if(!user){
      throw new UnauthorizedException('Ooops, Usuário ou senha invalidos.');
    }
    const passwordMatched = await compare(password, (await user).password);
    if(!passwordMatched){
      throw new UnauthorizedException('Ooops, Usuário ou senha invalidos.');
    }

    return user;
  }
}
