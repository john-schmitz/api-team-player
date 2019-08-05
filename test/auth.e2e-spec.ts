import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getConnection } from 'typeorm';
describe('AuthController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('auth/register (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'johnteste@hotmail.com',
        name: 'John Schmitz',
        password: '123456',
      })
      .set('Accept', 'application/json')
      .expect(201)
      .expect({
        access_token: / /g
        ,
        profile: {
          email: 'johnteste@hotmail.com',
          name: 'John Schmitz',
        },
    });
  });
});
