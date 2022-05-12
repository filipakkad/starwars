import { Template } from "@aws-cdk/assertions";
import * as cdk from "@aws-cdk/core";
import * as AppsyncCdkApp from "../lib/appsync-cdk-app-stack";

test("DynamoDB created", () => {
	const app = new cdk.App();
	// WHEN
	const stack = new AppsyncCdkApp.AppsyncCdkAppStack(app, "MyTestStack");
	// THEN
	const template = Template.fromStack(stack);

	template.hasResourceProperties("AWS::DynamoDB::Table", {
		BillingMode: "PAY_PER_REQUEST",
	});
});

test("Lambda created", () => {
	const app = new cdk.App();
	// WHEN
	const stack = new AppsyncCdkApp.AppsyncCdkAppStack(app, "MyTestStack");
	// THEN
	const template = Template.fromStack(stack);

	template.hasResourceProperties("AWS::Lambda::Function", {
		Handler: "main.handler",
		Runtime: "nodejs12.x",
	});
});

test("GraphQL created", () => {
	const app = new cdk.App();
	// WHEN
	const stack = new AppsyncCdkApp.AppsyncCdkAppStack(app, "MyTestStack");
	// THEN
	const template = Template.fromStack(stack);

	template.hasResourceProperties("AWS::AppSync::GraphQLApi", {
        AuthenticationType: "API_KEY",
        Name: "cdk-starwars-appsync-api",
        XrayEnabled: true
	});
});

