import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import Teams from '../database/models/Teams.model';
import { teams } from './mock/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;



describe('Login Routes Test', () => {
  afterEach(sinon.restore)


  it('login test with valid infos', async () => {
    const userMocked = Teams.build(teams[0])
    sinon.stub(Teams, 'findOne').resolves(userMocked)
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



});
