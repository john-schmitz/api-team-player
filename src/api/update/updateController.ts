/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Update } from '../../models/entity/Update';
import { Match } from '../../models/entity/Match';

class UpdateController {
  public async add(updateParms: Record<string, any>, matchId: string) {
    const match = await Match.findOne({ where: { id: matchId } });
    if (!match) {
    }
    const update = new Update();
    update.date = new Date();
    update.scorePrincipal = updateParms.scorePrincipal;
    update.scoreVisitor = updateParms.scoreVisitor;
    update.action = updateParms.action;
    update.match = match;
    update.save();
  }
}
export default new UpdateController();
