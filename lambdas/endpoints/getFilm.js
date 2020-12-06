const getFilmSwapi = require("../client/getFilmSwapi");
const Responses = require('../common/API_Responses');

exports.handler = async event => {

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const film = await getFilmSwapi(ID).catch(err => {
        console.log('error in swapi get', err);
        return null;
    });

    if (!film) {
        return Responses._204({ message: 'Failed to get film ' });
    }
    
    return Responses._200({ film });
}