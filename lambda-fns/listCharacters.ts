const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

async function listCharacters() {
    const params = {
        TableName: process.env.STARWARS_TABLE,
    }

    try {
        const characters = await docClient.scan(params).promise()
        const { Items } = characters;
        return Items;
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null
    }
}

export default listCharacters;