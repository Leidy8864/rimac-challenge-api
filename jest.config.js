module.exports = {
    verbose: true,
    preset: '@shelf/jest-dynamodb',
};

process.env = Object.assign(process.env, {
    tableName: 'character-table',
});
