import { Get, Route, Example } from 'tsoa';
import { User } from '../models/interfaces/User.interface';
/* eslint-disable @typescript-eslint/no-explicit-any */

@Route('feed')
class FeedController {
  public constructor() {}

  /** Retorna todas as partidas seguidas */
  @Get()
  @Example<User>({
    id: 1,
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
