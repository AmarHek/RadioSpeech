export interface Pathology {
  name: string;
  englishName: string;
  templateMaps: TemplateMap[];
}

export type TemplateMap = CheckBoxMap | OptionMap;

interface CheckBoxMap {
  categoryName: string;
  kind: "box";
  name: string;
}

interface OptionMap {
  categoryName: string;
  kind: "option";
  groupName: string;
  name: string;
}
