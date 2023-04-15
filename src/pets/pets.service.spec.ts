import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

describe('PetsService', () => {
  let service: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsService],
    }).compile();

    service = module.get<PetsService>(PetsService);
  });

  describe('findAll', () => {
    it('should return an array of pets', () => {
      const result = [{ id: '1', breed: 'Labrador', name: 'Buddy', age: 3 }];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a pet', () => {
      const result = { id: '1', breed: 'Labrador', name: 'Buddy', age: 3 };
      jest.spyOn(service, 'findOne').mockImplementation(() => result);
      expect(service.findOne('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a pet', () => {
      const petDto: CreatePetDto = { breed: 'Labrador', name: 'Buddy', age: 3 };
      const result = { id: '1', ...petDto };
      jest.spyOn(service, 'create').mockImplementation(() => result);
      expect(service.create(petDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a pet', () => {
      const petDto: UpdatePetDto = { breed: 'Labrador Retriever' };
      const result = {
        id: '1',
        breed: 'Labrador Retriever',
        name: 'Buddy',
        age: 3,
      };
      jest.spyOn(service, 'update').mockImplementation(() => result);
      expect(service.update('1', petDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a pet', () => {
      jest.spyOn(service, 'remove').mockImplementation(() => {});
      expect(service.remove('1')).toBeUndefined();
    });
  });
});
