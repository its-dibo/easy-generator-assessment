import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BasicEntity } from '#utils/basic.entity.js';

@Entity('users')
export class UserEntity extends BasicEntity {
  @Column({ nullable: false, type: 'varchar', length: 100 })
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  @ApiProperty({ minLength: 2 })
  name: string;

  @Column({ unique: true, nullable: false, type: 'varchar', length: 250 })
  @IsEmail()
  @ApiProperty({ format: 'email' })
  email: string;

  @Column({ select: false, nullable: false, type: 'text' })
  @IsString()
  @MinLength(8)
  @ApiProperty({ format: 'password', minLength: 8 })
  password: string;
}
