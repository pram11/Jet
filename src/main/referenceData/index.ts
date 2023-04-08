import fs from 'fs';
import path from 'path';
import { ipcMain, IpcMainEvent } from 'electron';
export const getReferenceData = async (): Promise<any> => {
  //read reference data from file
  const referenceDataPath = path.join(__dirname, './referenceData.json');
  //parse reference data which is in json format to object
  const fileData = fs.readFileSync(referenceDataPath, 'utf8');
  const result = await JSON.parse(fileData);
  console.log('getReferenceData: result:', result);
  return result;
};
export const onRequestReferenceData = async (
  event: IpcMainEvent,
  arg: { name: string; args: object[] }[]
) => {
  const referenceData = await getReferenceData();
  console.log('referenceData', referenceData);
  console.log('onRequestReferenceData: event:', arg[0]);
  switch (arg[0].name) {
    case 'languages':
      console.log('onRequestReferenceData: event:', 'arg:', arg);
      event.reply('getReferenceData', { data: referenceData['language-code'] });
      break;
    default:
      console.log(`onRequestReferenceData: event:${event}, arg:${arg}`);
      event.reply('getReferenceData', 'unknown request');
  }
};

//read
