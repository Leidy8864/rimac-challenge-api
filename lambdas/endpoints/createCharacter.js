const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;
    const character = JSON.parse(event.body);
    character.ID = ID;

    const newCharacter = await Dynamo.write(character, tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    });

    if (!newCharacter) {
        return Responses._400({ message: 'Failed to write character by ID' });
    }

    return Responses._200({ newCharacter });
};
