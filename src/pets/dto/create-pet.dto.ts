import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  breed: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
