# Example queries

Link to the API:

```
https://ijpfmhgtx5halfwqmjmomeffze.appsync-api.eu-central-1.amazonaws.com/graphql
```

API Key provided separately 

``` graphql
mutation createAnakin {
  createCharacter(character: {episodes: ["First", "Second"], id: "1", name: "Anakin"}) {
    id
  }
}

mutation createDarthVader {
  createCharacter(character: {episodes: ["First", "Second"], id: "2", name: "Darth Vader", planet: "Earth"}) {
    id
  }
}

query listCharacters {
  listCharacters {
    id
    name
    episodes
    planet
  }
}

query getAnakin {
  getCharacterById(characterId: "1") {
    name
    episodes
    planet
  }
}

query getDarthVader {
  getCharacterById(characterId: "2") {
    name
    episodes
    planet
  }
}

mutation deleteAnakin {
  deleteCharacter(characterId: "1")
}

mutation deleteDarthVader {
  deleteCharacter(characterId: "2")
}

```


# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
