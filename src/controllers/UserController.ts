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

        if (!user.name || !user.email || !user.password) {
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

    getUser = async (request: Request, response: Response) => {
        const { id_user } = request.params

        const user = await this.userService.getUser(id_user)
        return response.status(200).json(
            {
                id_user: user?.id_user,
                name: user?.name,
                email: user?.email
            }
        )
    }
}
