import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Teams from '../database/models/Teams.model';
import { teams } from './mock/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;



describe('Login Routes Test', () => {
  afterEach(sinon.restore)


  it('testing get team by id', async () => {
    const teamMocked = Teams.build(teams[0])
    sinon.stub(Teams, 'findByPk').resolves(teamMocked)
    const response = await chai.request(app).get('/teams/1').send()

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.equal(teams[0]);
  });


  it('get all teams', async () => {
    const teamMocked = Teams.bulkBuild(teams)
    sinon.stub(Teams, 'findAll').resolves(teamMocked)
    const response = await chai.request(app).get('/teams').send(
    )

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.equal(teams);

  });



});
