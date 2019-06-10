import { Get, Route, Example } from 'tsoa';
import { User } from '../../models/interfaces/User.interface';
/* eslint-disable @typescript-eslint/no-explicit-any */

@Route('feed')
class FeedController {
  public constructor() {}

  /** Retorna todas as partidas seguidas */
  @Get()
  @Example<User>({
    id: ' 8fa95b5a-4e49-4c1f-964a-2ae5c1516de6 ',
    name: 'John',
    email: 'JohnGC@gmail.com',
    nameOrganization: 'Cool Org',
    matchesId: [1, 2, 3],
  })
  public getFeed(): void {}

  /**
   * Adicionar evento
   * @param event Evento a ser adicionado
   */
}
export default new FeedController();
