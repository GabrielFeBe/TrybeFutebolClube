import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Matches from '../database/models/Matches.model';
import Teams from '../database/models/Teams.model';
import { matchesLB } from './mock/matchesForLeaderBoardMock';
import { teamsLB } from './mock/teamsForLeaderBoardMock';
import { leaderBoardHomeMock } from './mock/leaderBoardHomeMock';
import { leaderBoardAwayMock } from './mock/leaderBoardAwayMock';
import { leaderBoardAllMock } from './mock/leaderBoardAllMock';

chai.use(chaiHttp);

const { expect } = chai;

// const headers = {
//   Authorization: 'Bearer YOUR_ACCESS_TOKEN',
// };

describe('Login Routes Test', () => {
  afterEach(sinon.restore)





  it(' get leaderboard home route with right answer', async () => {
    const matchesMocked = Matches.bulkBuild(matchesLB)
    const teamMocked = Teams.bulkBuild(teamsLB)
    sinon.stub(Matches, 'findAll').resolves(matchesMocked)
    sinon.stub(Teams, 'findAll').resolves(teamMocked)
    const response = await chai.request(app).get('/leaderboard/home').send()

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.equal(leaderBoardHomeMock);
  });
  it(' get leaderboard away route with right answer', async () => {
    const matchesMocked = Matches.bulkBuild(matchesLB)
    const teamMocked = Teams.bulkBuild(teamsLB)
    sinon.stub(Matches, 'findAll').resolves(matchesMocked)
    sinon.stub(Teams, 'findAll').resolves(teamMocked)
    const response = await chai.request(app).get('/leaderboard/away').send()

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.equal(leaderBoardAwayMock);
  });
  it(' get leaderboard All route with right answer', async () => {
    const matchesMocked = Matches.bulkBuild(matchesLB)
    const teamMocked = Teams.bulkBuild(teamsLB)
    sinon.stub(Matches, 'findAll').resolves(matchesMocked)
    sinon.stub(Teams, 'findAll').resolves(teamMocked)
    const response = await chai.request(app).get('/leaderboard').send()

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.equal(leaderBoardAllMock);
  });


});
