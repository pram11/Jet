import { getTranslationFile, getConfigFile } from '../utils/file';

const getFallbackTranslatedCode = async () => {
  const config = getConfigFile();
  const translation = getTranslationFile(config['fallback-language']);
  return translation;
};

const getTranslatedData = async (languageCode: string) => {
  console.log('languageCode:', languageCode);
  if (!languageCode) {
    languageCode = await getFallbackTranslatedCode();
  }
  const translation = getTranslationFile(languageCode);
  return translation;
};

export { getTranslatedData };
