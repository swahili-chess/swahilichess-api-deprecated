import postgres from 'postgres'
import { config } from 'dotenv'; 

config(); 

const sql = postgres({
  host: process.env.HOST,
  port: process.env.PORT,          
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,         
});

export default async function getUserNames() {
  const users = await sql`
    select
    name
    from lichess
  `
  return users
}




