import IMatches from '../Interfaces/Matches';
import ILeaderBoard from '../Interfaces/LeaderBoard';
import Teams from '../database/models/Teams.model';
import Matches from '../database/models/Matches.model';

export default class LeaderBoardService {
  constructor(private TModel = Teams) {
  }

  async getTeams() {
    const teams = await this.TModel.findAll();
    const objOfTeams: Record<number, ILeaderBoard> = {};
    teams.forEach((team) => {
      objOfTeams[team.id] = {
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        efficiency: '0',
        goalsBalance: 0,
      };
    });
    return objOfTeams;
  }

  async leaderBoardHome() {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const objOfTeams: Record<number, ILeaderBoard> = await this.getTeams();
    matches.forEach((match) => {
      LeaderBoardService.homeGoalsBalance(objOfTeams, match);
      if (match.homeTeamGoals === match.awayTeamGoals) {
        LeaderBoardService.drawHome(objOfTeams, match);
      }
      if (match.homeTeamGoals > match.awayTeamGoals) {
        LeaderBoardService.homeVictory(objOfTeams, match);
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        LeaderBoardService.homeLoss(objOfTeams, match);
      }
    });
    const homeArrangedTeams = LeaderBoardService.arrangeTeams(objOfTeams);

    return homeArrangedTeams;
  }

  // disable max lines
  // eslint-disable-next-line max-lines-per-function
  async leaderBoardAway() {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const objOfTeams: Record<number, ILeaderBoard> = await this.getTeams();
    matches.forEach((match) => {
      LeaderBoardService.awayGoalsBalance(objOfTeams, match);
      if (match.homeTeamGoals === match.awayTeamGoals) {
        LeaderBoardService.drawAway(objOfTeams, match);
      }
      if (match.homeTeamGoals > match.awayTeamGoals) {
        LeaderBoardService.awayLoss(objOfTeams, match);
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        LeaderBoardService.awayVictory(objOfTeams, match);
      }
    });
    const arragedAlway = LeaderBoardService.arrangeTeams(objOfTeams);
    return arragedAlway;
  }

  async leaderBoardAll() {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const objOfTeams: Record<number, ILeaderBoard> = await this.getTeams();

    matches.forEach((match) => {
      LeaderBoardService.goalsBalance(objOfTeams, match);

      if (match.homeTeamGoals === match.awayTeamGoals) {
        LeaderBoardService.AllDraw(objOfTeams, match);
      }
      if (match.homeTeamGoals > match.awayTeamGoals) {
        LeaderBoardService.homeAllVictory(objOfTeams, match);
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        LeaderBoardService.awayAllVictory(objOfTeams, match);
      }
    });

    const arrangedTeams = LeaderBoardService.arrangeTeams(objOfTeams);

    return arrangedTeams;
  }

  static AllDraw(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    LeaderBoardService.drawAway(objOfTeams, match);
    LeaderBoardService.drawHome(objOfTeams, match);
  }

  static drawHome(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    const homeTeam = objOfTeams[match.homeTeamId];
    homeTeam.totalDraws += 1;
    homeTeam.totalPoints += 1;
    homeTeam.totalGames += 1;
    homeTeam.efficiency = ((homeTeam.totalPoints / (homeTeam.totalGames * 3)) * 100).toFixed(2);
  }

  static drawAway(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    const awayTeam = objOfTeams[match.awayTeamId];
    awayTeam.totalPoints += 1;
    awayTeam.totalDraws += 1;
    awayTeam.totalGames += 1;
    awayTeam.efficiency = ((awayTeam.totalPoints / (awayTeam.totalGames * 3)) * 100).toFixed(2);
  }

  static goalsBalance(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    LeaderBoardService.awayGoalsBalance(objOfTeams, match);
    LeaderBoardService.homeGoalsBalance(objOfTeams, match);
  }

  static awayGoalsBalance(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    const awayTeam = objOfTeams[match.awayTeamId];
    awayTeam.goalsFavor += match.awayTeamGoals;
    awayTeam.goalsOwn += match.homeTeamGoals;
    awayTeam.goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
  }

  static homeGoalsBalance(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    const homeTeam = objOfTeams[match.homeTeamId];
    homeTeam.goalsFavor += match.homeTeamGoals;
    homeTeam.goalsOwn += match.awayTeamGoals;
    homeTeam.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
  }

  static homeAllVictory(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    LeaderBoardService.homeVictory(objOfTeams, match);
    LeaderBoardService.awayLoss(objOfTeams, match);
  }

  static homeVictory(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    const homeTeam = objOfTeams[match.homeTeamId];
    homeTeam.totalVictories += 1;
    homeTeam.totalPoints += 3;
    homeTeam.totalGames += 1;
    homeTeam.efficiency = ((homeTeam.totalPoints / (homeTeam.totalGames * 3)) * 100).toFixed(2);
  }

  static awayLoss(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    const awayTeam = objOfTeams[match.awayTeamId];
    awayTeam.totalLosses += 1;
    awayTeam.totalGames += 1;
    awayTeam.efficiency = ((awayTeam.totalPoints / (awayTeam.totalGames * 3)) * 100).toFixed(2);
  }

  static awayVictory(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    const awayTeam = objOfTeams[match.awayTeamId];
    awayTeam.totalVictories += 1;
    awayTeam.totalPoints += 3;
    awayTeam.totalGames += 1;
    awayTeam.efficiency = ((awayTeam.totalPoints / (awayTeam.totalGames * 3)) * 100).toFixed(2);
  }

  static homeLoss(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    const homeTeam = objOfTeams[match.homeTeamId];
    homeTeam.totalLosses += 1;
    homeTeam.totalGames += 1;
    homeTeam.efficiency = ((homeTeam.totalPoints / (homeTeam.totalGames * 3)) * 100).toFixed(2);
  }

  static awayAllVictory(objOfTeams:Record<number, ILeaderBoard>, match:IMatches) {
    LeaderBoardService.awayVictory(objOfTeams, match);
    LeaderBoardService.homeLoss(objOfTeams, match);
  }

  static arrangeTeams(objOfTeams:Record<number, ILeaderBoard>) {
    const arrayOfTeams = Object.values(objOfTeams);
    const arrangedTeams = arrayOfTeams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return arrangedTeams;
  }
}
