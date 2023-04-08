const ipcRenderer = window.electron.ipcRenderer;
const getTranslatedData = async (language: string) => {
  const request = await ipcRenderer.sendMessage('getTranslatedData', [
    { name: 'getTranslatedData', args: [language] },
  ]);

  return new Promise((resolve, reject) => {
    ipcRenderer.on('getTranslatedData', (event, arg) => {
      resolve({ event: event, arg: arg });
    });
  });
};

export { getTranslatedData };
