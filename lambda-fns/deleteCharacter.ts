const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function deleteCharacter(characterId: string) {
	const params = {
		TableName: process.env.STARWARS_TABLE,
		Key: {
			id: characterId,
		},
	};
	try {
		await docClient.delete(params).promise();
		return characterId;
	} catch (err) {
		console.log("DynamoDB error: ", err);
		return null;
	}
}

export default deleteCharacter;
