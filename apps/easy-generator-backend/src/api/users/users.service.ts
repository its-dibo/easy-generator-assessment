import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { CrudTypeOrmService } from '@impactor/nest/decorators/controller/services/crud-typeorm.service.js';

@Injectable()
export class UsersService extends CrudTypeOrmService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected repo: Repository<UserEntity>,
  ) {
    super(repo);
  }

  post(body: UserEntity, query?: any, req?: Request) {
    return bcrypt
      .hash(body.password, 10)
      .then((password) =>
        super.post({ ...body, ...(password ? { password } : {}) }, query, req),
      );
  }

  patchOne(
    body: UserEntity,
    id: string | number | Record<string, unknown>,
    req?: Request,
  ) {
    return (
      body.password ? bcrypt.hash(body.password, 10) : Promise.resolve()
    ).then((password) =>
      super.patchOne({ ...body, ...(password ? { password } : {}) }, id, req),
    );
  }

  patchMany(body: UserEntity, query?: any, req?: Request) {
    return (body.password ? bcrypt.hash(body.password, 10) : Promise.resolve())
      .then((password) => <UserEntity>{ ...body, password })
      .then((body) => super.patchMany(body, query, req));
  }

  /**
   * get a user including the hidden field `password`
   * the password field must be selected explicitly
   * @param where the condition
   * @returns
   */
  getUserWithPassword(where?: any) {
    return this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where(where)
      .getOne();
  }
}
