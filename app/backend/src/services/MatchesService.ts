import Teams from '../database/models/Teams.model';
import Matches from '../database/models/Matches.model';

interface Query {
  inProgress?:string
}

const obj:Record<string, boolean> = {
  true: true,
  false: false,
};

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
    console.log(typeof query.inProgress);
    return filteredMatches;
  }
}
