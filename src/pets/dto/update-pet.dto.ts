import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdatePetDto {
  @IsString()
  breed?: string;

  @IsString()
  name?: string;

  @IsNumber()
  age?: number;
}
