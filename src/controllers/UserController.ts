import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        if (!user.name || !user.email ||!user.password) {
            return response.status(400).json({ message: 'Bad request! todos os campos são obrigatórios' })
        }

        this.userService.createUser(user.name, user.email, user.password)
        return response.status(201).json({ message: 'Usuário criado' })
    }

    // deleteUser = (request: Request, response: Response) => {
    //     const user = request.body
    //     if (!user.email) {
    //         return response.status(400).json({ message: 'Bad request! Email obrigatório' })
    //     }


    //     return response.status(204).json({ message: 'Usuário deletado'})
    // }

    getUser = (request: Request, response: Response) => {
        return response.status(200)
    }
}
