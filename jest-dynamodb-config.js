module.exports = {
    tables: [
        {
            TableName: 'character-table',
            KeySchema: [
                {
                    AttributeName: 'ID',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'ID',
                    AttributeType: 'S',
                },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
    ],
};
