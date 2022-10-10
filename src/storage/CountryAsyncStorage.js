import AsyncStorage from '@react-native-async-storage/async-storage';

const country_KEY = '@country:key';

async function savecountry(country) {
  try {
    await AsyncStorage.setItem(country_KEY, JSON.stringify(country));
    return JSON.stringify(country);
  } catch (error) {
    console.log('Error de sintaxis');
    return 'Error de sintaxis';
  }
}
async function updatecountry(country) {
  try {
    await AsyncStorage.setItem(country_KEY, JSON.stringify(country));
    return JSON.stringify(country);
  } catch (error) {
    console.log('Error de sintaxis');
    return 'Error de sintaxis';
  }
}

async function getcountry() {
  try {
    const item = await AsyncStorage.getItem(country_KEY);
    return JSON.parse(item);
  } catch (error) {
    console.log('Error de sintaxis');
    return null;
  }
}

async function deletecountry() {
  try {
    await AsyncStorage.removeItem(country_KEY);
    const item = await AsyncStorage.getItem(country_KEY);
    return item == null ? 'Pais removido' : 'Pais no removido';
  } catch (error) {
    console.log('Error de sintaxis');
    return null;
  }
}

export {savecountry, getcountry, deletecountry, updatecountry};
