import ILeaderBoard from '../Interfaces/LeaderBoard';
import Matches from '../Interfaces/Matches';
import Teams from '../Interfaces/Teams';
import funcs from './LeaderBoardFunctions';

const defaultObj = {
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

type GameFilter = 'homeTeamId' | 'awayTeamId';

export default class LeaderBoardRS {
  static sortingStatus(array: ILeaderBoard[]) {
    const sortingStatusArr = array.sort((a, b) => {
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
    return sortingStatusArr;
  }

  static reducerFunc(teams:Teams[], matches:Matches[], game:GameFilter) {
    return teams.map((team) => {
      const homeTeam = matches.filter((match) => +match[game] === +team.id);
      const objOfStatus = homeTeam.reduce((acc, curr) => {
        const { homeTeamGoals: hg, awayTeamGoals: ag } = curr;
        const { reducerLoss: Loss,
          reducerTotalPoints: Points,
          reducerVictorys: Victories } = funcs;
        acc.goalsFavor += game === 'homeTeamId' ? curr.homeTeamGoals : curr.awayTeamGoals;
        acc.goalsOwn += game === 'homeTeamId' ? curr.awayTeamGoals : curr.homeTeamGoals;
        acc.totalDraws += funcs.reducerDraws(hg, ag);
        acc.totalGames += 1;
        acc.totalLosses += game === 'homeTeamId' ? Loss(hg, ag) : Loss(ag, hg);
        acc.totalPoints += game === 'homeTeamId' ? Points(hg, ag) : Points(ag, hg);
        acc.totalVictories += game === 'homeTeamId' ? Victories(hg, ag) : Victories(ag, hg);
        return acc;
      }, { ...defaultObj });
      return { name: team.teamName, ...objOfStatus };
    });
  }

  static addingEff(arrO:Omit<ILeaderBoard, 'efficiency' | 'goalsBalance'>[]) {
    return arrO.map((obj) => {
      const status = { ...obj,
        goalsBalance: obj.goalsFavor - obj.goalsOwn,
        efficiency: ((obj.totalPoints / (obj.totalGames * 3)) * 100).toFixed(2),
      };
      return status;
    });
  }
}
