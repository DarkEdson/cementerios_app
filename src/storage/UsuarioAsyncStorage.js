import AsyncStorage from '@react-native-async-storage/async-storage';

const USUARIO_KEY = '@usuario:key';

async function saveUsuario(usuario) {
  try {
    console.log('dentro del asynstorage');
    console.log(usuario);
    await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
    return JSON.stringify(usuario);
  } catch (error) {
    //Error
    console.log('error al guardar: ' + error.message);
    return 'Error de sintaxis';
  }
}

async function getUsuario() {
  try {
    const item = await AsyncStorage.getItem(USUARIO_KEY);
    return JSON.parse(item);
  } catch (error) {
    // Error retrieving data
    console.log('Error al recuperar:' + error.message);
    return null;
  }
}

async function deleteUsuario() {
  try {
    await AsyncStorage.removeItem(USUARIO_KEY);
    await AsyncStorage.removeItem('errorInfo');
    await AsyncStorage.removeItem('tokenUserInfo');
    const item = await AsyncStorage.getItem(USUARIO_KEY);
    const item2 = await AsyncStorage.getItem('errorInfo');
    return item == null && item2 == null
      ? 'usuario removido'
      : 'usuario no removido';
  } catch (error) {
    console.log('Error al eliminar' + error.message);
    return 'Error de sintaxis';
  }
}

export {saveUsuario, getUsuario, deleteUsuario};
