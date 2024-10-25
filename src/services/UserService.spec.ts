import { UserService } from "./UserService"
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    intialize: jest.fn()
})

jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {

    const userService = new UserService(mockUserRepository)
    const mockUser = {
        id_user: '123456',
        name: 'Hudson',
        email: 'hud@test.com',
        password: '123456'
    }

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.createUser('Hudson', 'hud@test.com', '123456')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject(
            {
                id_user: '123456',
                name: 'Hudson',
                email: 'hud@test.com',
                password: '123456'
            }
        )
    })

    it('Deve buscar um usuário autenticado', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt,'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('hud@test.com', '123456')
        expect(token).toBe('token')
    })

    it('Deve lançar uma exceção quando credenciais inválidas', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('invalid@test.com', '123456')).rejects.toThrow(new Error('Invalid credentials!')  )
    })

})
