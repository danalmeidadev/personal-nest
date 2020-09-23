import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserCredentialsDTO } from 'src/user/dtos/user.credentialsDTO';
import { UserRepository } from 'src/user/user.repository';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'personal!@#$%',
    });
  }

  async validate(userCredentials: UserCredentialsDTO) {
    const { email } = userCredentials;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(
        'Ooops, você precisa logar para acessar o app!',
      );
    }

    return user;
  }
}
