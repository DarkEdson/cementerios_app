import {Platform} from 'react-native';

export default async function normalizePath(path) {
    console.log('ENTRE A NORMALIZAR EL PATH');
    if (Platform.OS === 'ios') {
      const filePrefix = 'file://';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (e) {}
      }
    }
    return path;
  }