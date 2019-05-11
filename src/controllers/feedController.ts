import { Get, Route, Example, Put } from 'tsoa';
import { User } from '../models/interfaces/User.interface';
/* eslint-disable @typescript-eslint/no-explicit-any */
const events = [
  {
    score: '1x1',
    message: {
      icon: 4,
      text: 'GOl do palmeiras =(',
    },
  },
  {
    score: '1x0',
    message: {
      icon: 4,
      text: 'GOl do coringao',
    },
  },
];
@Route('feed')
class FeedController {
  public constructor() {}

  /** Retorna todas as partidas seguidas */
  @Get()
  @Example<User>({
    id: 1,
    nome: 'John',
    email: 'JohnGC@gmail.com',
    nomeOrganizacao: 'Cool Org',
  })
  public getFeed(): any {
    return events;
  }

  /**
   * Adicionar evento
   * @param event Evento a ser adicionado
   */
  @Put('{event}')
  public addEvent(event: any): boolean {
    events.unshift(event);
    return true;
  }
}
export default new FeedController();
