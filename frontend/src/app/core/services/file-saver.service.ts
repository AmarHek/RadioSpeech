import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSaverService {

  constructor() { }

  async getHandle(suggestedName: string,) {
    // set some options, like the suggested file name and the file type.
    const options = {
      suggestedName,
      types: [
        {
          description: "Text Files",
          accept: {
            "text/plain": [".txt"],
          },
        },
      ],
    };

    // prompt the user for the location to save the file.
    const handle = await window.showSaveFilePicker(options);

    return handle;
  }

  async save(handle, text) {
    // creates a writable, used to write data to the file.
    const writable = await handle.createWritable();

    // write a string to the writable.
    await writable.write(text);

    // close the writable and save all changes to disk.
    // this will prompt the user for write permission to the file, if it's the first time.
    await writable.close();
  }

}

