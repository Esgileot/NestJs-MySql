import { Injectable } from '@nestjs/common'
const { Op } = require("sequelize")
import { UserModel } from './user-models/user-model'
import { UserDto } from './dto/user-dto'

@Injectable()
export class UserService {

    async getAll(): Promise<UserDto> {
        const len = await UserModel.count()
        const result = await UserModel.findAll({ where: { rank: { [Op.between]: [1, len] } } })

        return result
    }

    async createUser(name: string): Promise<UserDto> {
        const rank = await UserModel.count() + 1
        const result = await UserModel.create({ name: name, rank: rank })

        return result
    }

    async replaceUser(currentRank: number, nextRank: number): Promise<UserDto> {
        const maxRank = await UserModel.count()
        if (nextRank > maxRank) {
            nextRank = maxRank
        }

        const tempRank = maxRank + 1
        await UserModel.update({ rank: tempRank }, { where: { rank: currentRank } })
        await UserModel.update({ rank: currentRank }, { where: { rank: nextRank } })
        await UserModel.update({ rank: nextRank }, { where: { rank: tempRank } })

        const result = UserModel.findByPk(nextRank)
        return result
    }

    async updateUser(newName: string, oldName: string): Promise<UserDto> {
        await UserModel.update({ name: newName }, { where: { name: oldName } })
        const result = await UserModel.findByPk(newName)

        return result
    }

    async deleteUser(rank: number): Promise<UserDto> {
        const result = await UserModel.findByPk(rank)

        await UserModel.destroy({ where: { rank: rank } })
        await UserModel.increment({ rank: -1 }, {
            where: { rank: { [Op.gt]: rank } }
        });

        return result
    }
}