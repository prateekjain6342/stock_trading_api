const { signup, login } = require("../../controllers/users");
const User = require("../../models/users");

const env = process.env

beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
})

afterEach(() => {
    process.env = env
})

jest.mock("../../models/users");

const request = {
    body: {
        email: 'gmail@tests.com',
        password: 'fdsergfgfgsdfsd'
    }
}

const response = {
    status: jest.fn((x) =>  x),
    send: jest.fn((x) =>  x),
    json: jest.fn((x) => x),
    'status.json': jest.fn((x) => x) 
}

describe('signup', () => {
    it('Should send a status of 400 if the user already exists', async () => {
        User.findOne.mockImplementationOnce(() => ({
            id: 1,
            email: 'gmail@tests.com',
            password: 'fdsergfgfgsdfsd'
        }));
        await signup(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledTimes(1);
    })
    
    it('Should create a new user and return 201 when no existing user is found', async () => {
        User.findOne.mockImplementationOnce(() => undefined);
        User.create.mockImplementationOnce(() => request.body);
        process.env.ACCESS_SECRET_KEY = 'accessKey'
        process.env.REFRESH_SECRET_KEY = 'refreshKey'
        await signup(request, response);
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledTimes(1);
    })
})

describe('login', () => {
    it('Should send a status of 404 if the user deos not already exists', async () => {
        User.findOne.mockImplementationOnce(() => undefined);
        await login(request, response);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledTimes(1);
    })
    
    it('Should log in the user and return 200 when user is found', async () => {
        User.findOne.mockImplementationOnce(() => ({
            email: request.body.email,
            password: '$2a$15$PONoG8CQXQCB1RnUf3Ehc.daDNELBGcfwZYDOVX4x5QLzpaM3qWrK'
        }));
        process.env.ACCESS_SECRET_KEY = 'accessKey'
        process.env.REFRESH_SECRET_KEY = 'refreshKey'
        await login(request, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledTimes(1);
    })
})

