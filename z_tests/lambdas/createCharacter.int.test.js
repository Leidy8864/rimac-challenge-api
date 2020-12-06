const createCharacter = require('../../lambdas/endpoints/createCharacter');
const eventGenerator = require('../testUtils/eventGenerator');
const validators = require('../testUtils/validators');

describe('create character integration tests', () => {
    test('it shoudl take a body and return an API Gateway response', async () => {
        const event = eventGenerator({
            body: {
                name: 'Han Solo',
                description: 'Captain of the Millennium Falcon',
            },
        });

        const res = await createCharacter.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test('should return a 200 with the character if the character is valid', async () => {
        const event = eventGenerator({
            body: {
                name: 'Han Solo',
                description: 'Captain of the Millennium Falcon',
            },
            pathParametersObject: {
                ID: '3',
            },
        });
        const res = await createCharacter.handler(event);

        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual({
            newCharacter: {
                name: 'Han Solo',
                description: 'Captain of the Millennium Falcon',
                ID: '3',
            },
        });
    });
});
