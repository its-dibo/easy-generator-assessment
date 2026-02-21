import { UserEntity } from '#api/users/entities/user.entity.js';

export class AuthResponseDto extends UserEntity {
  access_token: string;
}
