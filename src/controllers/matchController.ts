/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { Match } from '../models/entity/Match';

class MatchController {
  public async getAllMatches(): Promise<Match[]> {
    return await getRepository(Match).find();
  }

  public async findMatchById(id: number): Promise<Match> {
    return await getRepository(Match).findOne({ where: { id: id } });
  }

  public async add(matchParm: Record<string, any>) {
    const match = new Match();
    match.namePrincipal = matchParm.namePrincipal;
    match.nameVisitor = matchParm.nameVisitor;
    match.modality = matchParm.modality;
    match.place = matchParm.place;
    match.date = matchParm.date;
    match.save();
  }
}
export default new MatchController();
