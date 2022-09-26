import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGUE_KEY = '@languague:key';

async function saveLanguague(languague) {
  try {
    await AsyncStorage.setItem(LANGUAGUE_KEY, JSON.stringify(languague));
    return JSON.stringify(languague);
  } catch (error) {
    console.log('Error de sintaxis');
    return 'Error de sintaxis';
  }
}

async function getLanguague() {
  try {
    const item = await AsyncStorage.getItem(LANGUAGUE_KEY);
    return JSON.parse(item);
  } catch (error) {
    console.log('Error de sintaxis');
    return null;
  }
}

async function deleteLanguague() {
  try {
    await AsyncStorage.removeItem(LANGUAGUE_KEY);
    const item = await AsyncStorage.getItem(LANGUAGUE_KEY);
    return item == null ? 'lenguajes removida' : 'lenguajes no removida';
  } catch (error) {
    console.log('Error de sintaxis');
    return null;
  }
}

export {saveLanguague, getLanguague, deleteLanguague};
