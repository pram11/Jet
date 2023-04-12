import SelectInput from '@components/input/SelectInput';
import { MouseEventHandler, useEffect, useState } from 'react';
const ipcRenderer = window.electron.ipcRenderer;
type LanguageData = {
  event: any;
  arg: any;
};

const getLanguages = (): Promise<LanguageData> => {
  console.log('on getLanguages');
  ipcRenderer.sendMessage('getReferenceData', [
    { name: 'languages', args: [{}] },
  ]);
  return new Promise<LanguageData>((resolve, reject) => {
    ipcRenderer.on('getReferenceData', (event: any, arg: any) => {
      const result: LanguageData = { event: event, arg: arg };
      console.log('result:', result);
      resolve(result);
    });
  });
};

const languageSelectModal = (props: any) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [languageOptions, setLanguages] = useState<any>([]);
  const selectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('on selectLanguage:', event.target.value);
    setSelectedLanguage(event.target.value);
  };
  useEffect(() => {
    const getLanguagesOptions = async () => {
      const languageData: LanguageData = await getLanguages();
      const languages = languageData['event']['data'].map((language: any) => {
        return { value: language['code'], label: language['name'] };
      });

      setLanguages(languages);
    };
    getLanguagesOptions();
  }, []);

  return (
    <div className="language-select-modal">
      <div className="language-select-modal-wrapper">
        <div className="language-select-modal-header">
          <h1 className="language-select-modal-title">Select Language</h1>
        </div>
        <div className="language-select-modal-body">
          <SelectInput
            label="Language"
            value={selectedLanguage === null ? '' : selectedLanguage}
            options={languageOptions}
            onChange={selectLanguage}
          />
          <button onClick={() => props.onSelect(selectedLanguage)}>
            select
          </button>
        </div>
      </div>
    </div>
  );
};

export default languageSelectModal;
