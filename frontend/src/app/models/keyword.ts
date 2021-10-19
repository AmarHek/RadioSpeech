export interface KeySelectable {
  name: string;
  synonym: string;
  category: string;
  group?: string;
  position: number;
  active: boolean;
  variableText?: string;
}

export interface KeyVariable {
  category?: string;
  selectable: string;
  id: string;
  kind: string;
  name?: string;
  synonym?: string;
  value?: string;
  textBefore: string;
  textAfter: string;
  position: number;
  active: boolean;
}

export interface ColoredText {
  text: string;
  color: string;
  position: number;
}
