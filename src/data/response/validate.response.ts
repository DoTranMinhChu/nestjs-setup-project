export class ValidateResponse {
  alive: boolean;
  jwtPayload: any;

  constructor(alive: boolean, jwtPayload?: any) {
    this.alive = alive;
    this.jwtPayload = jwtPayload;
  }
}
