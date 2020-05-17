import * as Localization from 'expo-localization';
import * as React from 'react';
import * as Updates from 'expo-updates';

import { Alert, AsyncStorage } from 'react-native';

import { Provider } from '../contexts/ThemeContext';
import i18n from 'i18n-js';

const STORAGE_KEY_LOCALE = 'LOCALE_LANGUAGE';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: { welcome: 'Hello', name: 'jinbeom' },
  kr: { welcome: '안녕하세요' },
};

interface Props {
  children: React.ReactElement;
}

const ThemeProvider: React.FC<Props> = (props: Props) =>
{
  const [language, setLanguage] = React.useState<string>();
  // Set the locale once at the beginning of your app.
  retrieveLocaleData()
    .then((locale: string | null) => {
      console.log('>>> language: ', language)
      if (locale)
      {
        i18n.locale = locale;
        setLanguage(locale)
      }
      else
      {
        i18n.locale = Localization.locale;
        setLanguage(Localization.locale)
      }
    })
    .catch((error) => Alert.alert('Error!!', error?.message))

  return (
    <Provider
      value={{
        language,
        changeLanguageType: (lan: string): void => {
          console.log('>>> changeLanguageType: ', lan)
          storeLocaleData(lan)
            .then(() => { Updates.reloadAsync() })
            .catch((error) => Alert.alert('Error!!', error?.message))
        }
      }}
    >
      {props.children}
    </Provider>
  );
};

// Actions
const retrieveLocaleData = (): Promise<string | null> => {
  return AsyncStorage.getItem(STORAGE_KEY_LOCALE);
};

const storeLocaleData = (language: string): Promise<void> => {
  return AsyncStorage.setItem(STORAGE_KEY_LOCALE, language);
};

export { ThemeProvider, i18n };
