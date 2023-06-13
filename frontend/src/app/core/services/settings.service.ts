import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  Settings = {
    ColorTheme: {
      ID: "setting_color_theme",
      valid_values: {
        regular: "regular",
        colorblind: "colorblind"
      }
    },
    Language: {
      ID: "setting_language",
      valid_values: {
        german: "german",
        english: "english"
      }
    }
  }

  constructor() {
  }

  /**
   * Returns the value of the setting according to the given setting ID.
   * @param setting_id ID of setting for which value should be retrieved, as defined in the Settings Object of
   * this service.
   */
  getSetting(setting_id: string) {
    const value = localStorage.getItem(setting_id);
    if (value == null) {
      return this.getDefaultValueForSetting(setting_id)
    }
    return value
  }

  /**
   * Returns default setting for setting_id. This will return the first value of the valid_settings sub-object of
   * a setting.
   * @param setting_id
   */
  getDefaultValueForSetting(setting_id: string) {
    for (const setting in this.Settings) {
      if (this.Settings[setting].ID === setting_id) {
        return Object.values(this.Settings[setting].valid_values)[0]
      }
    }
    return null
  }

  // saves setting of certain ID to local storage
  // todo check if value is valid
  setSetting(setting_id: string, new_value) {
    localStorage.setItem(setting_id, new_value)
  }

}
