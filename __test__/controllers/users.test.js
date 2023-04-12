const { signup } = require("../../controllers/users");
const User = require("../../models/users");

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

it('Should send a status of 400 if the user already exists', async () => {
    User.mockImplementationOnce(() => ({
        id: 1,
        email: 'email',
        password: 'password'
    }));
    await signup(request, response);
})