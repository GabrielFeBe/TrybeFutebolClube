import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import User from '../database/models/User.model';
import { userMock } from './mock/userMock';

chai.use(chaiHttp);

const { expect } = chai;

const headers = {
  Authorization: 'Bearer YOUR_ACCESS_TOKEN',
};

describe('Login Routes Test', () => {
  afterEach(sinon.restore)


  it('login test with valid infos', async () => {
    const userMocked = User.build(userMock)
    sinon.stub(User, 'findOne').resolves(userMocked)
    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    })

    expect(response.status).to.be.eq(200);
  });


  it('login test with invalid email', async () => {

    const response = await chai.request(app).post('/login').send({
      email: 'admin.com',
      password: 'secret_admin'
    })

    expect(response.status).to.be.eq(401);
  });
  it('login test with invalid password', async () => {

    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '12345'
    })

    expect(response.status).to.be.eq(401);
  });

  it('login get role test', async () => {
    sinon.stub(jwt, 'verify').resolves(userMock)
    const response = await chai.request(app).get('/login/role').set(headers).send({})
    // console.log(response)

    expect(response.status).to.be.eq(200);
    expect(response.body.role).to.be.eq(userMock.role);

  });



});
