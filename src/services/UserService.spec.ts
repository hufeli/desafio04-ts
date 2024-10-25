import { UserService } from "./UserService"

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    intialize: jest.fn()
})

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {

    const userService = new UserService(mockUserRepository)

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => (
            {
                id_user: '123456',
                name: 'Hudson',
                email: 'hud@test.com',
                password: '123456'
            }))
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

})
