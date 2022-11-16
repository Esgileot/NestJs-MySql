require('dotenv').config()

import { NestFactory } from '@nestjs/core'
const { Sequelize } = require('sequelize')
import { AppModule } from './app.module'

const sequelize = new Sequelize(
  process.env.db_name,
  process.env.db_username,
  process.env.db_password, {
  dialect: 'mysql'
})

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule)
    await sequelize.authenticate(console.log("Connected"))
    await app.listen(process.env.PORT)
  } catch (error) {
    console.log(error)
  }
}
bootstrap()
