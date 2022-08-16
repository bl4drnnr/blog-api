import { IsNotEmpty, Length } from 'class-validator';

export class DistributeRoleDto {
  @IsNotEmpty()
  @Length(8, 32)
  readonly username: string;

  @IsNotEmpty()
  readonly value: string;
}
