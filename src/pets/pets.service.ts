import { Injectable } from '@nestjs/common';
import { Pet } from './interfaces/pet.interface';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  private readonly pets: Pet[] = [];

  findAll(): Pet[] {
    return this.pets;
  }

  findOne(id: string): Pet {
    return this.pets.find((pet) => pet.id === id);
  }

  create(createPetDto: CreatePetDto): Pet {
    const pet: Pet = {
      id: Date.now().toString(),
      ...createPetDto,
    };
    this.pets.push(pet);
    return pet;
  }

  update(id: string, updatePetDto: UpdatePetDto): Pet {
    const petIndex = this.pets.findIndex((pet) => pet.id === id);
    const updatedPet: Pet = {
      ...this.pets[petIndex],
      ...updatePetDto,
    };
    this.pets[petIndex] = updatedPet;
    return updatedPet;
  }

  remove(id: string): void {
    const petIndex = this.pets.findIndex((pet) => pet.id === id);
    this.pets.splice(petIndex, 1);
  }
}
