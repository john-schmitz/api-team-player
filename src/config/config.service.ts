import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService implements TypeOrmOptionsFactory, JwtOptionsFactory {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      PORT: Joi.number().default(process.env.PORT),
      DATABASE_URL: Joi.string().default(process.env.DATABASE_URL),
      CORS: Joi.boolean().required(),
      DATABASE_SYNCHRONIZE: Joi.boolean().default(
        process.env.DATABASE_SYNCHRONIZE,
      ),
      JWT_SECRET: Joi.string().default(process.env.JWT_SECRET),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get PORT(): string {
    return String(this.envConfig.PORT);
  }

  get DATABASE_URL(): string {
    return String(this.envConfig.DATABASE_URL);
  }

  get CORS(): boolean {
    return Boolean(this.envConfig.CORS);
  }

  get DATABASE_SYNCHRONIZE(): boolean {
    return Boolean(this.envConfig.DATABASE_SYNCHRONIZE);
  }

  get JWT_SECRET(): string {
    return String(this.envConfig.JWT_SECRET);
  }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      database: 'Ifxy4XDwLK',
      url: this.DATABASE_URL,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: this.DATABASE_SYNCHRONIZE,
    };
  }

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    };
  }
}
