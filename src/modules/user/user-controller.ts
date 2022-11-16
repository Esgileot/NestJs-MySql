import { HttpException, HttpStatus, Controller, Body, Param, Get, Post } from '@nestjs/common'
import { UserService } from './user-service'

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAll(): Promise<any> {
        try {
            const result = await this.userService.getAll()
            return result
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST, { cause: new Error("Some Error") })
        }
    }

    @Post("user")
    async createUser(@Body() body): Promise<any> {
        try {
            const { name } = body
            console.log(name)
            const result = await this.userService.createUser(name)
            return result
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST, { cause: new Error("Some Error") })
        }
    }

    @Post("replace")
    async replaceUser(@Body() body): Promise<any> {
        try {
            const { nextRank, currentRank } = body
            const result = await this.userService.replaceUser(currentRank, nextRank)
            return result
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST, { cause: new Error("Some Error") })
        }
    }

    @Post("update")
    async updateUser(@Body() body): Promise<any> {
        try {
            const { newName, oldName } = body
            console.log(newName, oldName)
            const result = await this.userService.updateUser(newName, oldName)
            return result
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST, { cause: new Error("Some Error") })
        }
    }

    @Post("delete/:id")
    async deleteUser(@Param("id") id): Promise<any> {
        try {
            const rank = id
            const result = await this.userService.deleteUser(rank)
            return result
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST, { cause: new Error("Some Error") })
        }
    }
}
