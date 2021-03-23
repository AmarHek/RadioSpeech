export class Keyword2 {
    name: string;
    synonym: string;
    variables: MyVariable[];
    category: string;
    position: number;
    active: string;
    text: string;
    normal: boolean;
    code: string;

    constructor() {}
}

export class MyVariable {
    kind: string;
    textAfter = '';
    textBefore = '';
    options: string[] = [];
    varFound: string[] = [];
}

export class Category {
    keys: Keyword2[];
    name: string;
    active: boolean;
    position: number;
    condition: string;
}

export class Disease {
    name: string;
    categories: Category[];
    active: boolean;
    number: number;
    position: number[];
    firstTime: boolean;
    positionEnd: number[];
}

export class TextDic {
    disName: string;
    reports: {text: string, category: string, key: string, code: string, condition: string}[];
}
