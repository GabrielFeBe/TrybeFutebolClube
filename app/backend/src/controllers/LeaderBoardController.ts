import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoards';

export default class LeaderBoardController {
  private service:LeaderBoardService;
  constructor(Service:LeaderBoardService) {
    this.service = Service;
  }

  async leaderBoardHome(req:Request, res : Response) {
    const sucess = await this.service.leaderBoardHome();

    return res.status(200).json(sucess);
  }

  async leaderBoardAway(req:Request, res : Response) {
    const sucess = await this.service.leaderBoardAway();

    return res.status(200).json(sucess);
  }

  async leaderBoardAll(req:Request, res : Response) {
    const sucess = await this.service.leaderBoardAll();

    return res.status(200).json(sucess);
  }
}
