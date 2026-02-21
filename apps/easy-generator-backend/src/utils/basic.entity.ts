import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export class BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /**
   * for soft delete
   */
  @DeleteDateColumn()
  deleted_at: Date;

  /**
   * the version number of the updated row
   * @example 1
   */
  @VersionColumn()
  _version: number;
}

/**
 * a class represents a schema response as `{data, count}`
 *
 * @example  @ApiOkResponse({ type: EntityWithCount<UserEntity> })
 */
export class EntityWithCount<T> {
  data: T[];
  count: number;
}
