import { UserController } from "./UserController";
import { UserService, User } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

describe('UserController', () => {
    const mockDb: User[] = []
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService);

    const mockResponse = makeMockResponse()
    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Hudson',
                email: 'hud@test.com'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve verificar a resposta de erro caso o usuário não informe o name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'hud@test.com'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })

    it('Deve verificar a resposta de erro caso o usuário não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'Hudson F',
                email: ''
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
    })

    it('Deve verificar se a função getAllusers está sendo chamada', () => {
        const mockRequest = {} as Request
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockUserService.getAllUsers).toBeCalled()

    })
})
