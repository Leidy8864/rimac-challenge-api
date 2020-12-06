const getCharacter = require('../../lambdas/endpoints/getCharacter');
const eventGenerator = require('../testUtils/eventGenerator');
const validators = require('../testUtils/validators');
const Dynamo = require('../../lambdas/common/Dynamo');

describe('get character integration tests', () => {
    test('it should take an ID and return an API Gateway response', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                ID: '3',
            },
        });

        const res = await getCharacter.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test('it should return 400 if we dont pass an ID', async () => {
        const event = eventGenerator({});
        const res = await getCharacter.handler(event);
        expect(res.statusCode).toBe(400);
    });

    test('it should return 204 if it is an incorrect ID', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                ID: 'x',
            },
        });

        const res = await getCharacter.handler(event);

        expect(res.statusCode).toBe(204);
    });

    test('returns a 200 and the character data when a valid ID', async () => {
        const ID = '2';

        const character = {
            ID,
            name: 'Leia Organa',
            description: 'Leader in the Rebel Alliance, the New Republic, and the Resistance.',
        };
        await Dynamo.write(character, 'character-table');

        const event = eventGenerator({
            pathParametersObject: {
                ID,
            },
        });

        const res = await getCharacter.handler(event);

        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual({ character });
    });
});
