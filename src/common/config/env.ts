export default {
  DATABASE: {
    TYPE: "postgres",
    PORT: +process.env.DATABASE_PORT || 5432,
    HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE: process.env.DATABASE_NAME || 'postgres',
    USERNAME: process.env.DATABASE_USER || 'postgres',
    PASSWORD: process.env.DATABASE_PASSWORD || 'postgres',
  }
}