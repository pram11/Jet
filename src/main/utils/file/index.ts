import path from 'path';
import fs from 'fs';
import { ConfigData } from '@/main/config/config';

export const getConfigFile = () => {
  const configPath = path.join(__dirname, '../../config/config.json');
  const config = fs.readFileSync(configPath, 'utf8');
  console.log('config:', config);
  return JSON.parse(config);
};

export const getTranslationFile = (languageCode: string) => {
  const translationPath = path.join(
    __dirname,
    `../../translations/${languageCode}.json`
  );
  const translation = fs.readFileSync(translationPath, 'utf8');
  console.log(`language code : ${languageCode} translation:${translation}`);
  return JSON.parse(translation);
};

export const setConfigFile = (configData: ConfigData) => {
  console.log('configData', configData);
};
