export default class InvalidMatch extends Error {
  public constructor() {
    super();
    this.name = 'Invalid Match';
  }
}
