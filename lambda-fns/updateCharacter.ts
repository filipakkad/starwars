import Character from "./Character";
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

type Params = {
  TableName: string | undefined,
  Key: string | {},
  ExpressionAttributeValues: any,
  ExpressionAttributeNames: any,
  UpdateExpression: string,
  ReturnValues: string
}

async function updateCharacter(character: any) {
  let params : Params = {
    TableName: process.env.STARWARS_TABLE,
    Key: {
      id: character.id
    },
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "UPDATED_NEW"
  };
  let prefix = "set ";
  let attributes = Object.keys(character);

  attributes.forEach((attribute) => {
    if (attribute !== "id") {
      params["UpdateExpression"] += prefix + "#" + attribute + " = :" + attribute;
      params["ExpressionAttributeValues"][":" + attribute] = character[attribute];
      params["ExpressionAttributeNames"]["#" + attribute] = attribute;
      prefix = ", ";
    }
  })

  try {
    await docClient.update(params).promise()
    return character
  } catch (err) {
    console.log('DynamoDB error: ', err)
    return null
  }
}

export default updateCharacter;