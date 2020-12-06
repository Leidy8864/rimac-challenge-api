const getFilm = require('../../lambdas/endpoints/getFilm');
const eventGenerator = require('../testUtils/eventGenerator');
const validators = require('../testUtils/validators');

describe('get film integration tests', () => {
    test('it should take an ID and return an API Gateway response', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                ID: '1',
            },
        });

        const res = await getFilm.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test('it should return 400 if we dont pass an ID', async () => {
        const event = eventGenerator({});
        const res = await getFilm.handler(event);
        expect(res.statusCode).toBe(400);
    });

    test('it should return 204 if it is an incorrect ID', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                ID: 'x',
            },
        });

        const res = await getFilm.handler(event);

        expect(res.statusCode).toBe(204);
    });

    test('returns a 200 and the film data when a valid ID', async () => {
        const ID = '1';

        const film = {
            titulo: "A New Hope",
            fecha_creacion: "2014-12-10T14:23:31.880000Z",
            director: "George Lucas",
            episodio_id: 4,
            apertura: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
            planetas: [
                "http://swapi.dev/api/planets/1/",
                "http://swapi.dev/api/planets/2/",
                "http://swapi.dev/api/planets/3/"
            ],
            productor: "Gary Kurtz, Rick McCallum"
        };

        const event = eventGenerator({
            pathParametersObject: {
                ID,
            },
        });

        const res = await getFilm.handler(event);

        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual({ film });
    });
});
