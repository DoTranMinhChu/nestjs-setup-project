import { Environment } from '@constant/environment.enum';

export interface ServerConfig {
  port: number;
  env: Environment;
}
