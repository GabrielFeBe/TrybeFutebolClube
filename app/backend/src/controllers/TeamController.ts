import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private service:TeamService;
  constructor(Service:TeamService) {
    this.service = Service;
  }

  async findAllTeam(_req:Request, res : Response) {
    const allTeams = await this.service.findAllTeams();
    return res.status(200).json(allTeams);
  }

  async findTeamById(req:Request, res :Response) {
    const { id } = req.params;

    const team = await this.service.findTeamById(+id);
    return res.status(200).json(team);
  }
}
