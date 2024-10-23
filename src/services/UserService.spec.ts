import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('Hudson', 'hud@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

    it('Deve deletar um usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.deleteUser('joana@dio.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

})
