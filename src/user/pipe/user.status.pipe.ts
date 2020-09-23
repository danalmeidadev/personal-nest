import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserStatus } from '../enum/user.enum';

export class USerStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    UserStatus.ACTIVE,
    UserStatus.INACTIVE,
    UserStatus.BLOCKED,
    UserStatus.DELETED,
  ];

  transform(value: any) {
    const valueStatus = value.toUpperCase();

    if (!this.isStatusValid(valueStatus)) {
      throw new BadRequestException(`"${valueStatus}" não é um status valido`);
    }

    return valueStatus;
  }

  private isStatusValid(status: UserStatus) {
    const index = this.allowedStatus.indexOf(status);
    return index !== -1;
  }
}
