const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function getCharacterByid(characterId: string) {
    const params = {
        TableName: process.env.STARWARS_TABLE,
        Key: { id: characterId }
    }
    try {
        const { Item } = await docClient.get(params).promise()
        return Item
    } catch (err) {
        console.log('DynamoDB error: ', err)
    }
}

export default getCharacterByid