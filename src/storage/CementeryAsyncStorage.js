import AsyncStorage from '@react-native-async-storage/async-storage';

const CEMENTERY_KEY = '@usuario:key';

async function saveUsuario(usuario) {
  try {
    await AsyncStorage.setItem(CEMENTERY_KEY, JSON.stringify(usuario));
    return JSON.stringify(usuario);
  } catch (error) {
    //Error
    console.log('error al guardar: ' + error.message);
    return 'Error de sintaxis';
  }
}

async function getUsuario() {
  try {
    const item = await AsyncStorage.getItem(CEMENTERY_KEY);
    return JSON.parse(item);
  } catch (error) {
    // Error retrieving data
    console.log('Error al recuperar:' + error.message);
    return null;
  }
}

async function deleteUsuario() {
  try {
    await AsyncStorage.removeItem(CEMENTERY_KEY);
    const item = await AsyncStorage.getItem(CEMENTERY_KEY);
    return item == null ? 'usuario removido' : 'usuario no removido';
  } catch (error) {
    console.log('Error al eliminar' + error.message);
    return 'Error de sintaxis';
  }
}

export {saveUsuario, getUsuario, deleteUsuario};
