export interface userDefault {
  email: string;
  id?: number;
  role:string;
}

export interface JwtPayload {
  id: number;
  email: string;
  role:string;

  // outras propriedades, se houver
}

export interface TokenGenerator {
  generate(user: userDefault): string
  verifyToken(token:string): JwtPayload
}
