import Teams from '../database/models/Teams.model';
import Matches from '../database/models/Matches.model';
import LeaderBoardRS from './LeaderBoardRS';

export default class LeaderBoardService {
  constructor(private TModel = Teams) {
  }

  async leaderBoardHome() {
    const teams = await this.TModel.findAll();
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const arrangedTeams = LeaderBoardRS.reducerFunc(teams, matches, 'homeTeamId');
    console.log(arrangedTeams[0]);

    return arrangedTeams;
  }

  async leaderBoardAway() {
    const teams = await this.TModel.findAll();
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const arrangedTeams = LeaderBoardRS.reducerFunc(teams, matches, 'awayTeamId');
    console.log(arrangedTeams[0]);
    return arrangedTeams;
  }

  async leaderBoardAll() {
    const teams = await this.TModel.findAll();
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const arrangedTeamHome = LeaderBoardRS.reducerFunc(teams, matches, 'homeTeamId');
    const arrangedTeamsAway = LeaderBoardRS.reducerFunc(teams, matches, 'awayTeamId');
    const arrangedTeamsAll = arrangedTeamHome.map((homeT, i) => {
      const newObj = homeT;
      newObj.goalsFavor += arrangedTeamsAway[i].goalsFavor;
      newObj.goalsOwn += arrangedTeamsAway[i].goalsOwn;
      newObj.totalDraws += arrangedTeamsAway[i].totalDraws;
      newObj.totalGames += arrangedTeamsAway[i].totalGames;
      newObj.totalLosses += arrangedTeamsAway[i].totalLosses;
      newObj.totalPoints += arrangedTeamsAway[i].totalPoints;
      newObj.totalVictories += arrangedTeamsAway[i].totalVictories;
      return newObj;
    });
    return arrangedTeamsAll;
  }
}
