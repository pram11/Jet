import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '@forms/signin';
import './startup.css';
import { ConfigData } from '@/main/config/config';
import LanguageSelectModal from '@renderer/components/modal/LanguageSelectModal';
const ipcRenderer = window.electron.ipcRenderer;
const getServerStatus = async () => {
  const request = await ipcRenderer.sendMessage('serverRequest', [
    { name: 'getServerStatus', args: [{}] },
  ]);
  return new Promise((resolve, reject) => {
    ipcRenderer.on('serverRequest', (event, arg) => {
      resolve({ event: event, arg: arg });
    });
  });
};
const getConfigFile = async () => {
  const request = await ipcRenderer.sendMessage('getConfiguration', [
    { name: '', args: [{}] },
  ]);
  return new Promise((resolve, reject) => {
    ipcRenderer.on('getConfiguration', (event, arg) => {
      resolve({ event: event, arg: arg });
    });
  });
};
const getTranslation = (language: string) => {
  async function temp(language: string) {
    const translatedRequest = ipcRenderer.sendMessage('getTranslatedData', [
      { name: 'getTranslatedData', arg: language },
    ]);
    const translatedData = await new Promise((resolve, reject) => {
      ipcRenderer.on('getTranslatedData', (event, arg) => {
        resolve({ event: event, arg: arg });
      });
    });
    return translatedData;
  }
  return temp(language);
};

const StartUp = () => {
  const navigate = useNavigate();
  const [languageSelectModal, setLanguageSelectModal] = useState(false);
  const [translation, setTranslation] = useState({
    jet: 'Jet',
    'jet-label': 'a bluesky client',
    'signin-title': 'Sign in',
    'signin-button': 'Sign in',
  });
  useEffect(() => {
    getConfigFile().then(async (response: any) => {
      const configData: ConfigData = response['event']['data'];
      const language = configData['user-config']['language'];
      console.log('language:', language);
      if (language === null) {
        setLanguageSelectModal(true);
        const translations = await getTranslation('en-US');
        setTranslation(toObject(translations['event']['data']));
      } else {
        const translations = await getTranslation(language);
        setTranslation(toObject(translations['event']['data']));
      }
    });
  }, []);

  useEffect(() => {
    const serverStatus = async () => {
      const status = await getServerStatus();
      console.log('serverStatus:', status);
      return status;
    };
    serverStatus();
  }, []);

  const onSelectLanguage = async (language: any) => {
    console.log('onSelectLanguage:', language);
    setLanguageSelectModal(false);
    const translations = await getTranslation(language);
    console.log('translations:', translations);

    setTranslation(toObject(translations['event']['data']));
  }; //
  const toObject = (arr: any) => {
    let result = {};
    console.log('arr:', arr, typeof arr);
    arr.forEach((item: { key: string; value: string }) => {
      result[item['key']] = item['value'];
    });
    return result;
  };

  return (
    <>
      {languageSelectModal && (
        <LanguageSelectModal
          onSelect={(language: string) => onSelectLanguage(language)}
        />
      )}
      <div className="start-up-wrapper">
        <div className="jet-wrapper">
          <h1 className="jet-title">{translation.jet}</h1>
          <h2>{translation['jet-label']}</h2>
        </div>

        <div>
          <SignInForm translation={translation} />
        </div>
        <button
          onClick={() => {
            navigate('/list');
          }}
        >
          go list(dev)
        </button>
      </div>
    </>
  );
};

export default StartUp;
