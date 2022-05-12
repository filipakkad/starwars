import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

export class AppsyncCdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creates the AppSync API
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-starwars-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        },
      },
      xrayEnabled: true,
    });

    const starwarsLambda = new lambda.Function(this, 'AppSyncStarwarsHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset('lambda-fns'),
      memorySize: 1024
    });

    const lambdaDs = api.addLambdaDataSource('lambdaDatasource', starwarsLambda);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getCharacterById"
    });

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "listCharacters"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "createCharacter"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "deleteCharacter"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "updateCharacter"
    });

    const starwarsTable = new ddb.Table(this, 'CDKStarwarsTable', {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });
    // enable the Lambda function to access the DynamoDB table (using IAM)
    starwarsTable.grantFullAccess(starwarsLambda)

    // Create an environment variable that we will use in the function code
    starwarsLambda.addEnvironment('STARWARS_TABLE', starwarsTable.tableName);

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
     value: api.graphqlUrl
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || ''
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region
    });
  }
}

