import { EntityManager } from "typeorm"
import { User } from "../entities/User"

export class UserRepository {
    private manager: EntityManager

    constructor(manager: EntityManager) {
        this.manager = manager
    }

    createUser = async (user: User): Promise<User> => await this.manager.save(user)

    getUser = async (idUser: string): Promise<User | null> => await this.manager.findOne(User, {
        where: {
            id_user: idUser
        }
    })

}