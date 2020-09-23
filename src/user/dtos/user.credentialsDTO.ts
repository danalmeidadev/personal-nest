import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class UserCredentialsDTO {
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(40)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha deve conter letras maiuculas, minusculas e caracteres',
  })
  password: string;
}
