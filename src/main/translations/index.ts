import { getTranslationFile } from '../utils/file';

const getTranslatedData = async (languageCode: string) => {
  console.log('languageCode:', languageCode);
  const translation = getTranslationFile(languageCode);
  return translation;
};

export { getTranslatedData };
