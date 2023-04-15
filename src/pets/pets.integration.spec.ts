import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PetsModule } from './pets.module';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

describe('PetsController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PetsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /pets', () => {
    test.skip('should return an array of pets', async () => {
      const res = await request(app.getHttpServer())
        .get('/pets')
        .expect(HttpStatus.OK);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /pets/:id', () => {
    test.skip('should return a pet', async () => {
      const res = await request(app.getHttpServer())
        .get('/pets/1')
        .expect(HttpStatus.OK);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('breed');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('age');
    });

    test.skip('should return a 404 if pet is not found', async () => {
      await request(app.getHttpServer())
        .get('/pets/999')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('POST /pets', () => {
    test.skip('should create a pet', async () => {
      const petDto: CreatePetDto = { breed: 'Labrador', name: 'Buddy', age: 3 };
      const res = await request(app.getHttpServer())
        .post('/pets')
        .send(petDto)
        .expect(HttpStatus.CREATED);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('breed', petDto.breed);
      expect(res.body).toHaveProperty('name', petDto.name);
      expect(res.body).toHaveProperty('age', petDto.age);
    });
  });

  describe('PUT /pets/:id', () => {
    test.skip('should update a pet', async () => {
      const petDto: UpdatePetDto = { breed: 'Labrador Retriever' };
      const res = await request(app.getHttpServer())
        .put('/pets/1')
        .send(petDto)
        .expect(HttpStatus.OK);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('breed', petDto.breed);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('age');
    });

    test.skip('should return a 404 if pet is not found', async () => {
      const petDto: UpdatePetDto = { breed: 'Labrador Retriever' };
      await request(app.getHttpServer())
        .put('/pets/999')
        .send(petDto)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /pets/:id', () => {
    test.skip('should remove a pet', async () => {
      await request(app.getHttpServer())
        .delete('/pets/1')
        .expect(HttpStatus.OK);
      await request(app.getHttpServer())
        .get('/pets/1')
        .expect(HttpStatus.NOT_FOUND);
    });

    test.skip('should return a 404 if pet is not found', async () => {
      await request(app.getHttpServer())
        .delete('/pets/999')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
