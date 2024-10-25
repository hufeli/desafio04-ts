import { UserController } from "./UserController"
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock"

const mockUserService = {
    createUser: jest.fn()
}

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {

            return mockUserService
        })
    }
})

describe('UserController', () => {
    const userController = new UserController()

    const mockResponse = makeMockResponse()
    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Hudson',
                email: 'hud@test.com',
                password: '123456'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    // it('Deve deletar um usuário', () => {
    //     const mockRequest = {
    //         body: {
    //             email: 'joana@dio.com'
    //         }
    //     } as Request
    //     userController.deleteUser(mockRequest, mockResponse)

    //     expect(mockResponse.state.status).toBe(204)
    //     expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' })
    // })

    it('Deve verificar a resposta de erro caso o usuário não informe o name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'hud@test.com'
                , password: '123456'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! todos os campos são obrigatórios' })
    })

    it('Deve verificar a resposta de erro caso o usuário não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'Hudson F',
                email: '',
                password: '123456'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! todos os campos são obrigatórios' })
    })

    it('Deve verificar a resposta de erro caso o usuário não informe o password', () => {
        const mockRequest = {
            body: {
                name: 'Hudson F',
                email: 'hud@test.com',
                password: ''
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! todos os campos são obrigatórios' })
    })

})
