import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Matches from '../database/models/Matches.model';
import { bodyToCreateMock, invalidBodyToCreateMockE, invalidBodyToCreateMockIn, matchCreationMock, matches, mockFinished, mockInProgress } from './mock/matchesMock';
import Teams from '../database/models/Teams.model';
import { userMock } from './mock/userMock';

chai.use(chaiHttp);

const { expect } = chai;



describe('Matches Routes Test', () => {
  afterEach(sinon.restore)


  it(' get all matches ', async () => {
    const teamMocked = Matches.bulkBuild(matches, {
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ]
    })
    sinon.stub(Matches, 'findAll').resolves(teamMocked)
    const response = await chai.request(app).get('/matches').send()
    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.equal(matches);
  });
  it(' get all matches com query in progress true', async () => {
    const teamMocked = Matches.bulkBuild(matches, {
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ]
    })
    sinon.stub(Matches, 'findAll').resolves(teamMocked)
    const query = { inProgress: true }
    const response = await chai.request(app).get('/matches').query(query)

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.equal(mockInProgress);
  });
  it(' get all matches com query in progress false', async () => {
    const teamMocked = Matches.bulkBuild(matches, {
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ]
    })
    sinon.stub(Matches, 'findAll').resolves(teamMocked)
    const query = { inProgress: false }
    const response = await chai.request(app).get('/matches').query(query)

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.equal(mockFinished);
  });


  it('creating match', async () => {
    const teamMocked = Matches.build(matchCreationMock)
    sinon.stub(Matches, 'create').resolves(teamMocked)
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    };
    sinon.stub(jwt, 'verify').resolves(userMock)

    const response = await chai.request(app).post('/matches').set(headers).send(bodyToCreateMock)

    expect(response.status).to.be.eq(201);
    expect(response.body).to.deep.equal(matchCreationMock);

  });
  it('creating  invalid match Equal id', async () => {
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    };
    sinon.stub(jwt, 'verify').resolves(userMock)

    const response = await chai.request(app).post('/matches').set(headers).send(invalidBodyToCreateMockE)

    expect(response.status).to.be.eq(422);

  });
  it('creating  invalid match inexistent id', async () => {
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    };
    sinon.stub(jwt, 'verify').resolves(userMock)

    const response = await chai.request(app).post('/matches').set(headers).send(invalidBodyToCreateMockIn)

    expect(response.status).to.be.eq(404);

  });



  it('finishing match', async () => {
    sinon.stub(Matches, 'update').resolves()
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    };
    sinon.stub(jwt, 'verify').resolves(userMock)

    const response = await chai.request(app).patch('/matches/1/finish').set(headers).send()


    expect(response.status).to.be.eq(200);

  });
  it('updating match', async () => {
    sinon.stub(Matches, 'update').resolves()
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    };
    sinon.stub(jwt, 'verify').resolves(userMock)

    const response = await chai.request(app).patch('/matches/1').set(headers).send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    })

    expect(response.status).to.be.eq(200);

  });



});
