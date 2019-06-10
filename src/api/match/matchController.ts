/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { Match } from '../../models/entity/Match';
import matchService from './matchService';

class MatchController {
  public async getAllMatches(): Promise<Match[]> {
    return await matchService.getAllMatches();
  }

  public async findMatchById(id: string): Promise<Match> {
    return await matchService.findMatchById(id);
  }

  public async add(matchParm: Record<string, any>) {
    matchService.add(matchParm);
  }
}
export default new MatchController();
