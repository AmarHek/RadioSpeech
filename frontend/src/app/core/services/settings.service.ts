import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  /**
   * This object represents all available settings.
   * The ID attributes are used to get or set specific settings.
   * The valid_values sub-object contains all valid settings as string values.
   * The first value in the valid_values array will be used as a default value.
   */
  Settings = {
    ColorTheme: {
      ID: "setting_color_theme",
      valid_values: {
        standard: "standard",
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
  getSetting(setting_id: string): string {
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
  getDefaultValueForSetting(setting_id: string): string {
    for (const setting in this.Settings) {
      if (this.Settings[setting].ID === setting_id) {
        return <string>Object.values(this.Settings[setting].valid_values)[0]
      }
    }
    return ""
  }

  /**
   * Saves setting of certain ID to local storage.
   * @param setting_id ID of the setting to be set.
   * @param new_value The new value of the setting.
   */
  setSetting(setting_id: string, new_value: string) {
    // Check if the value is valid for this setting
    if (this.isValueValidForSetting(setting_id, new_value)) {
      localStorage.setItem(setting_id, new_value);
      console.log(`Set value "${new_value}" for setting "${setting_id}"`);
    } else {
      console.error(`Invalid value "${new_value}" for setting "${setting_id}"`);
    }
  }

  /**
   * Checks if a value is valid for a setting.
   * @param setting_id ID of the setting.
   * @param value Value to be checked.
   * @returns True if the value is valid, false otherwise.
   */
  isValueValidForSetting(setting_id: string, value: string): boolean {
    for (const setting in this.Settings) {
      if (this.Settings[setting].ID === setting_id) {
        return Object.values(this.Settings[setting].valid_values).includes(value);
      }
    }
    return false;
  }
}
