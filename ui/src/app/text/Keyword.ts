export class Keyword {
    name: string;
    synonym: string;
    kind: string;
    category: string;
    position: number;
    id: string;
    variables3D: string[][][] = new Array();
    variables2D: string[][] = new Array(); //das sind die möglichen Variablen für das Keyword
    buttons2D: string[][] = new Array();
    foundVariables: string[] = new Array(); //und das sind die wirklich gefunden Variablen im Input
    textBefore = new Array<string>();
    textAfter = new Array<string>();
    variableKind1D: string[] = new Array();
    overlap: Keyword[] = new Array();

   
    

    constructor(name: string, kind: string, category: string) {
       this.name = name;
       this.kind = kind;
       this.category = category;
    }
}
