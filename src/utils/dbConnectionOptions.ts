export const options = (): any => {
  const info = {
    synchronize: true,
    logging: true,
    entities: ['dist/models/entity/*.js'],
    cli: {
      entitiesDir: 'src/models/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
    logger: 'file',
  };
  if (process.env.DATABASE_URL) {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ...info,
    };
  }
  if (process.env.NODE_ENV === 'test') {
    info.entities = ['src/models/entity/*.ts'];
    return {
      type: process.env.DATABASE_TYPE_TEST,
      host: process.env.DATABASE_HOST_TEST,
      port: process.env.DATABASE_PORT_TEST,
      username: process.env.DATABASE_USER_TEST,
      password: process.env.DATABASE_PASSWORD_TEST,
      database: process.env.DATABASE_NAME_TEST,
      ...info,
    };
  }
  return {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ...info,
  };
};
