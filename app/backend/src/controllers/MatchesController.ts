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
}
