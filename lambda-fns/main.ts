import createCharacter from './createCharacter';
import deleteCharacter from './deleteCharacter';
import getCharacterById from './getCharacterById';
import listCharacters from './listCharacters';
import updateCharacter from './updateCharacter';
import Character from './Character';

type AppSyncEvent = {
   info: {
     fieldName: string
  },
   arguments: {
     characterId: string,
     character: Character,
  }
}

exports.handler = async (event:AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "getCharacterById":
            return await getCharacterById(event.arguments.characterId);
        case "createCharacter":
            return await createCharacter(event.arguments.character);
        case "listCharacters":
            return await listCharacters();
        case "deleteCharacter":
            return await deleteCharacter(event.arguments.characterId);
        case "updateCharacter":
            return await updateCharacter(event.arguments.character);
        default:
            return null;
    }
}