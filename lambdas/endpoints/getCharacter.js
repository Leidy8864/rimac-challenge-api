const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const character = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!character) {
        return Responses._204({ message: 'Failed to get character by ID' });
    }

    return Responses._200({ character });
};
