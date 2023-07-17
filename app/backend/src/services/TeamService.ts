import Teams from '../database/models/Teams.model';

export default class TeamService {
  constructor(private Model = Teams) {}

  public async findAllTeams() {
    const allTeams = await this.Model.findAll();
    return allTeams;
  }

  public async findTeamById(id:number) {
    const allTeams = await this.Model.findByPk(id);
    return allTeams;
  }
}
