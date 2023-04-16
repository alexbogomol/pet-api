import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PetsModule } from './pets.module';

describe('PetsController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [PetsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/pets (GET)', () => {
    it('should return an array of pets', async () => {
      const response = await request(app.getHttpServer())
        .get('/pets')
        .expect(HttpStatus.OK);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('/pets (POST)', () => {
    it('should create a new pet', async () => {
      const pet = { name: 'Fluffy', breed: 'Persian', age: 3 };
      const response = await request(app.getHttpServer())
        .post('/pets')
        .send(pet)
        .expect(HttpStatus.CREATED);
      expect(response.body).toMatchObject(pet);
      expect(response.body.id).toBeDefined();
    });

    it('should return a 400 if missing required fields', async () => {
      const pet = { name: 'Fluffy', age: 3 };
      await request(app.getHttpServer())
        .post('/pets')
        .send(pet)
        .expect(HttpStatus.BAD_REQUEST, {
          statusCode: 400,
          message: [
              "breed must be a string",
              "breed should not be empty"
          ],
          error: "Bad Request"
      });
    });
  });

  describe('/pets/:id (GET)', () => {
    it('should return a pet by ID', async () => {
      const pet = { name: 'Fluffy', breed: 'Persian', age: 3 };
      const createResponse = await request(app.getHttpServer())
        .post('/pets')
        .send(pet);
      const id = createResponse.body.id;

      const getResponse = await request(app.getHttpServer())
        .get(`/pets/${id}`)
        .expect(HttpStatus.OK);
      expect(getResponse.body).toMatchObject(pet);
      expect(getResponse.body.id).toBe(id);
    });

    it('should return a 404 if pet is not found', async () => {
      await request(app.getHttpServer())
        .get('/pets/999')
        .expect(HttpStatus.NOT_FOUND, {
          statusCode: 404,
          message: 'Pet with id 999 not found',
          error: 'Not Found',
        });
    });
  });

  describe('/pets/:id (PUT)', () => {
    it('should update a pet by ID', async () => {
      const pet = { name: 'Fluffy', breed: 'Persian', age: 3 };
      const createResponse = await request(app.getHttpServer())
        .post('/pets')
        .send(pet);
      const id = createResponse.body.id;

      const updatedPet = { name: 'Furball', breed: 'Siamese', age: 5 };
      const updateResponse = await request(app.getHttpServer())
        .put(`/pets/${id}`)
        .send(updatedPet)
        .expect(HttpStatus.OK);
      expect(updateResponse.body).toMatchObject(updatedPet);
      expect(updateResponse.body.id).toBe(id);

      const getResponse = await request(app.getHttpServer())
        .get(`/pets/${id}`)
        .expect(HttpStatus.OK);
      expect(getResponse.body).toMatchObject(updatedPet);
      expect(getResponse.body.id).toBe(id);
    });

    it('should return a 404 if pet is not found', async () => {
      const updatedPet = { name: 'Furball', breed: 'Siamese', age: 5 };
      await request(app.getHttpServer())
        .put('/pets/999')
        .send(updatedPet)
        .expect(HttpStatus.NOT_FOUND, {
          statusCode: 404,
          message: 'Pet with id 999 not found',
          error: 'Not Found',
        });
    });

    it('should return a 400 if missing required fields', async () => {
      const pet = { name: 'Fluffy', breed: 'Persian', age: 3 };
      const createResponse = await request(app.getHttpServer())
        .post('/pets')
        .send(pet);
      const id = createResponse.body.id;

      const updatedPet = { name: 'Furball', age: 5 };
      await request(app.getHttpServer())
        .put(`/pets/${id}`)
        .send(updatedPet)
        .expect(HttpStatus.BAD_REQUEST, {
          statusCode: 400,
          message: [
              "breed must be a string"
          ],
          error: "Bad Request"
      });
    });
  });

  describe('/pets/:id (DELETE)', () => {
    it('should delete a pet by ID', async () => {
      const pet = { name: 'Fluffy', breed: 'Persian', age: 3 };
      const createResponse = await request(app.getHttpServer())
        .post('/pets')
        .send(pet);
      const id = createResponse.body.id;
      await request(app.getHttpServer())
        .delete(`/pets/${id}`)
        .expect(HttpStatus.NO_CONTENT);

      await request(app.getHttpServer())
        .get(`/pets/${id}`)
        .expect(HttpStatus.NOT_FOUND, {
          statusCode: 404,
          message: `Pet with id ${id} not found`,
          error: 'Not Found',
        });
    });

    it('should return a 404 if pet is not found', async () => {
      await request(app.getHttpServer())
        .delete('/pets/999')
        .expect(HttpStatus.NOT_FOUND, {
          statusCode: 404,
          message: 'Pet with id 999 not found',
          error: 'Not Found',
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
