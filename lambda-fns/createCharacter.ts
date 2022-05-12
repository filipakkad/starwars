const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
import Character from './Character';

async function createCharacter(character: Character) {
    const params = {
        TableName: process.env.STARWARS_TABLE,
        Item: character
    }
    try {
        await docClient.put(params).promise();
        return character;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}

export default createCharacter;