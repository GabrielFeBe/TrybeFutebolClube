import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private service: MatchesService;
  constructor(service :MatchesService) {
    this.service = service;
  }

  async findAllMatches(req:Request, res : Response) {
    const allTeams = await this.service.findAllMatches(req.query);
    return res.status(200).json(allTeams);
  }

  async endingMatch(req:Request, res : Response) {
    const { id } = req.params;
    const sucess = await this.service.endingMatch(+id);
    return res.status(200).json({ message: sucess });
  }

  async updatingMatch(req:Request, res : Response) {
    const { id } = req.params;
    const sucess = await this.service.updatingMatch(+id, req.body);
    return res.status(200).json({ message: sucess });
  }

  async addingNewMatch(req:Request, res : Response) {
    const sucess = await this.service.addingNewMatch(req.body);
    return res.status(201).json(sucess);
  }
}
