export class Keyword2 {
    name: string;
    synonym: string;
    variables: MyVariable[];
    category: string;
    position: number;
    active: string;
    text: string;
    buttonPos: number;
    normal: boolean;
      
    constructor(){
     
        
    }
}

export class MyVariable{
    kind: string;
    textAfter: string = "";
    textBefore: string = "";
    options: string[] = [];
    varFound: string[] = [];
}

export class Category{
    keys: Keyword2[];
    name: string;
    active: boolean;
    position: number;

    
}

export class Disease{
    name: string;
    categories: Category[];
    active: boolean;
    number: number;
    position: number;
    firstTime: boolean;
}

export class TextDic{
    disName: string;
    reports: {text: string, category: string, key: string}[];
}
