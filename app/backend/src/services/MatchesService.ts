import IMatches from '../Interfaces/Matches';
import Teams from '../database/models/Teams.model';
import Matches from '../database/models/Matches.model';
import UnprocessableEntity from '../Error/UnprocessableEntity';
import NotFound from '../Error/NotFound';

interface Query {
  inProgress?:string
}

const obj:Record<string, boolean> = {
  true: true,
  false: false,
};

interface UBody {
  homeTeamGoals:number,
  awayTeamGoals:number,
}

export default class MatchesService {
  constructor(private Model = Matches) {}

  async findAllMatches(query:Query) {
    const matches = await this.Model.findAll({
      include:
      [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!query.inProgress) return matches;

    const filteredMatches = matches.filter((match) =>
      match.inProgress === obj[query.inProgress as string]);
    return filteredMatches;
  }

  async endingMatch(idP:number) {
    await this.Model.update({ inProgress: false }, { where: { id: idP } });
    return 'Finished';
  }

  async updatingMatch(idP:number, updateBody:UBody) {
    await this.Model.update({ homeTeamGoals: updateBody.homeTeamGoals,
      awayTeamGoals: updateBody.awayTeamGoals }, { where: { id: idP } });
    return 'Updated';
  }

  async addingNewMatch(bodyToAdd:Omit<IMatches, 'inProgress'>) {
    if (bodyToAdd.awayTeamId === bodyToAdd.homeTeamId) {
      throw new UnprocessableEntity('It is not possible to create a match with two equal teams');
    }

    const validatingTeams = await Teams.count({
      where: { id: [bodyToAdd.awayTeamId, bodyToAdd.homeTeamId] } });
    if (validatingTeams !== 2) {
      throw new NotFound('There is no team with such id!');
    }

    const addingMatch = await this.Model.create({ inProgress: true,
      awayTeamGoals: bodyToAdd.awayTeamGoals,
      homeTeamGoals: bodyToAdd.homeTeamGoals,
      awayTeamId: bodyToAdd.awayTeamId,
      homeTeamId: bodyToAdd.homeTeamId,
    });
    return addingMatch;
  }
}
