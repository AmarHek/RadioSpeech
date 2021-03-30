export class KeywordAlt {
    name: string;
    synonym: string;
    kind: string;
    category: string;
    position: number;
    id: string;
    variables3D: string[][][] = [];
    variables2D: string[][] = []; // das sind die möglichen Variablen für das KeywordAlt
    buttons2D: string[][] = [];
    foundVariables: string[] = []; // und das sind die wirklich gefunden Variablen im Input
    textBefore = new Array<string>();
    textAfter = new Array<string>();
    variableKind1D: string[] = [];
    overlap: KeywordAlt[] = [];




    constructor(name: string, kind: string, category: string) {
       this.name = name;
       this.kind = kind;
       this.category = category;
    }
}
