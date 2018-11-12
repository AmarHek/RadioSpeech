import { Component } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dateParser: NgbDateParserFormatter) {
    if (localStorage.getItem("emptyDialog")) {
      this.parts = JSON.parse(localStorage.getItem("emptyDialog"))
    } else {
      this.parts = [
        {
          "kind" : "category",
          "name" : "Gesamt I",
          "selectables" : [
            {
              "kind" : "box",
              "name" : "Thorax p.a.",
              "value" : false,
              "text" : "Projektionsradiographie: Thorax in 1 Ebene ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : null
            },
            {
              "kind" : "box",
              "name" : "Thorax 2 Ebenen",
              "value" : false,
              "text" : "Projektionsradiographie: Thorax in 2 Ebenen ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : null
            },
            {
              "kind" : "box",
              "name" : "Thorax im Liegen",
              "value" : false,
              "text" : "Projektionsradiographie: Thorax im Liegen ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : null
            }
          ]
        },
        {
          "kind" : "category",
          "name" : "Gesamt II",
          "selectables" : [
            {
              "kind" : "group",
              "name" : "CG1",
              "options" : [
                {
                  "kind" : "option",
                  "name" : "von heute mit VA gestern",
                  "text" : "vom %Heute% mit Voraufnahmen vom %Gestern%. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "von heute mit VA variabel",
                  "text" : "vom %Heute% mit Voraufnahmen vom %G1%. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                    {
                      "kind" : "date",
                      "id" : "G1",
                      "textBefore" : "Voraufnahme [Datum]",
                      "textAfter" : "",
                      "value" : {
                        "year" : 2019,
                        "month" : 1,
                        "day" : 1
                      }
                    }
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "von heute ohne VA",
                  "text" : "vom %Heute% ohne Voraufnahmen. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "von variabel mit VA",
                  "text" : "vom %G2% mit Voraufnahmen vom %G3%. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                    {
                      "kind" : "date",
                      "id" : "G2",
                      "textBefore" : "von [Datum] ",
                      "textAfter" : "",
                      "value" : {
                        "year" : 2019,
                        "month" : 1,
                        "day" : 1
                      }
                    },
                    {
                      "kind" : "date",
                      "id" : "G3",
                      "textBefore" : "Voraufnahme [Datum]",
                      "textAfter" : "",
                      "value" : {
                        "year" : 2019,
                        "month" : 1,
                        "day" : 1
                      }
                    }
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "von variabel ohne VA",
                  "text" : "vom %G4% ohne Voraufnahmen. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                    {
                      "kind" : "date",
                      "id" : "G4",
                      "textBefore" : "von [Datum] ",
                      "textAfter" : "",
                      "value" : {
                        "year" : 2019,
                        "month" : 1,
                        "day" : 1
                      }
                    }
                  ]
                }
              ],
              "value" : null
            }
          ]
        },
        {
          "kind" : "category",
          "name" : "Gesamt III",
          "selectables" : [
            {
              "kind" : "box",
              "name" : "Indikation geprüft",
              "value" : true,
              "text" : "Indikation überprüft und nach § 23 RöV bestätigt.",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : null
            }
          ]
        },
        {
          "kind" : "category",
          "name" : "Instrumentierung",
          "selectables" : [
            {
              "kind" : "box",
              "name" : "ZVK",
              "value" : false,
              "text" : "\n\nZVK %I1% %I2%. ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
                {
                  "kind" : "oc",
                  "id" : "I1",
                  "textBefore" : " [re. / li.] ",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "re.",
                    "li."
                  ]
                },
                {
                  "kind" : "oc",
                  "id" : "I2",
                  "textBefore" : " [jugulär / subclaviculär]",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "jugulär",
                    "subclaviculär"
                  ]
                }
              ],
              "enumeration" : null
            },
            {
              "kind" : "box",
              "name" : "Shaldon-Katheter",
              "value" : false,
              "text" : "\n\nShaldon-Katheter %I3 %I4%. ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
                {
                  "kind" : "oc",
                  "id" : "I3",
                  "textBefore" : " [re. / li.] ",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "re.",
                    "li."
                  ]
                },
                {
                  "kind" : "oc",
                  "id" : "I4",
                  "textBefore" : " [jugulär / subclaviculär]",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "jugulär",
                    "subclaviculär"
                  ]
                }
              ],
              "enumeration" : null
            },
            {
              "kind" : "box",
              "name" : "Schrittmacher",
              "value" : false,
              "text" : "\n\nSchrittmacher %I5% pektoral, %I6% konnektierte Sondenkabel in Projektion auf %I7% endend. ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
                {
                  "kind" : "oc",
                  "id" : "I5",
                  "textBefore" : " [re. / li.] ",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "re.",
                    "li."
                  ]
                },
                {
                  "kind" : "oc",
                  "id" : "I6",
                  "textBefore" : "[1 / 2 / 3] konnektierte Sondenkabel",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "1",
                    "2",
                    "3"
                  ]
                },
                {
                  "kind" : "oc",
                  "id" : "I7",
                  "textBefore" : "in Projektion auf [rechtes Atrium, rechten Ventrikel, Sinus coronarius, epikardial]",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "rechtes Atrium",
                    "rechten Ventrikel",
                    "Sinus coronarius",
                    "epikardial"
                  ]
                }
              ],
              "enumeration" : null
            },
            {
              "kind" : "box",
              "name" : "Drainage",
              "value" : false,
              "text" : "\n\n Drainage %I8% %I9%. ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
                {
                  "kind" : "oc",
                  "id" : "I8",
                  "textBefore" : " [re./li.] ",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "re.",
                    "li."
                  ]
                },
                {
                  "kind" : "oc",
                  "id" : "I9",
                  "textBefore" : " [pleural, mediastinal, perikardial]",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "pleural",
                    "mediastinal",
                    "perikardial"
                  ]
                }
              ],
              "enumeration" : null
            }
          ]
        },
        {
          "kind" : "block",
          "text" : "\n\nZwerchfell, Pleura: \n",
          "judgementText" : null
        },
        {
          "kind" : "category",
          "name" : "Zwerchfell",
          "selectables" : [
            {
              "kind" : "box",
              "name" : "normal",
              "value" : false,
              "text" : "Beidseits Zwerchfelle orthotop, glatt begrenzt, Randwinkel entfaltet. ",
              "judgementText" : null,
              "normal" : true,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : null
            },
            {
              "kind" : "group",
              "name" : "CG2",
              "options" : [
                {
                  "kind" : "option",
                  "name" : "Erguss klein",
                  "text" : "Beidseits Zwerchfelle orthotop, glatt begrenzt, Randwinkel verplumpt. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : "Z-EK",
                  "variables" : [
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "Erguss mittel",
                  "text" : "Beidseits Zwerchfelle orthotop, unscharf, bei flächiger Transparenzminderung des Unterfelds. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "Erguss groß",
                  "text" : "Beidseits Zwerchfelle orthotop, unscharf, bei flächiger Transparenzminderung des Unter- und MIttelfelds. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                }
              ],
              "value" : null
            }
          ]
        },
        {
          "kind" : "category",
          "name" : "Pleura",
          "selectables" : [
            {
              "kind" : "box",
              "name" : "normal",
              "value" : false,
              "text" : "Keine pleurale Dehiszenz. ",
              "judgementText" : null,
              "normal" : true,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : null
            },
            {
              "kind" : "box",
              "name" : "Dehiszenz",
              "value" : false,
              "text" : "Pleurale Dehiszenz. ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : "P-D",
              "variables" : [
              ],
              "enumeration" : null
            },
            {
              "kind" : "box",
              "name" : "Pneumothorax",
              "value" : false,
              "text" : "Pneumothorax %P1% %P2% mit %P3% cm pleuraler Dehiszenz. ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
                {
                  "kind" : "oc",
                  "id" : "P1",
                  "textBefore" : "[re. / li. / bds.]",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "re.",
                    "li.",
                    "bds."
                  ]
                },
                {
                  "kind" : "oc",
                  "id" : "P2",
                  "textBefore" : "[apikal / lateral / basal / mantelförmig]",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "apikal",
                    "lateral",
                    "basal",
                    "mantelförmig"
                  ]
                },
                {
                  "kind" : "text",
                  "id" : "P3",
                  "textBefore" : "mit ",
                  "textAfter" : " mm pleuraler Dehiszenz.",
                  "value" : ""
                }
              ],
              "enumeration" : null
            }
          ]
        },
        {
          "kind" : "block",
          "text" : "\n\nMediastinum: \n",
          "judgementText" : null
        },
        {
          "kind" : "conditional",
          "precondition" : [
            [
              {
                "id" : "Z-EK",
                "negated" : false
              },
              {
                "id" : "P-D",
                "negated" : false
              }
            ]
          ],
          "normalText" : null,
          "judgementText" : "Text-Neu-1"
        },
        {
          "kind" : "category",
          "name" : "Mediastinum ",
          "selectables" : [
            {
              "kind" : "box",
              "name" : "normal",
              "value" : false,
              "text" : "Mediastinum mittelständig. ",
              "judgementText" : null,
              "normal" : true,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : null
            },
            {
              "kind" : "box",
              "name" : "verlagert",
              "value" : false,
              "text" : "Mediastinum nach %M1% verlagert. ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
                {
                  "kind" : "oc",
                  "id" : "M1",
                  "textBefore" : "nach  [re. / li.] ",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "re.",
                    "li."
                  ]
                }
              ],
              "enumeration" : null
            },
            {
              "kind" : "box",
              "name" : "verbreitert",
              "value" : false,
              "text" : "Mediastinum im %M2% Anteil verbreitert. ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
                {
                  "kind" : "oc",
                  "id" : "M2",
                  "textBefore" : "im  [oberen / mittleren / unteren] Anteil",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "oberen",
                    "mittleren",
                    "unteren"
                  ]
                }
              ],
              "enumeration" : null
            }
          ]
        },
        {
          "kind" : "category",
          "name" : "Aorta",
          "selectables" : [
            {
              "kind" : "box",
              "name" : "Aorta unauffällig",
              "value" : false,
              "text" : "Thorakale Aorta unauffällig konfiguriert.",
              "judgementText" : null,
              "normal" : true,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : null
            },
            {
              "kind" : "box",
              "name" : "Aorta elongiert",
              "value" : false,
              "text" : "elongiert",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : "AZ1"
            },
            {
              "kind" : "box",
              "name" : "Aorta arteriosklerotisch",
              "value" : false,
              "text" : "arteriosklerotisch verkalkt",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : "AZ1"
            },
            {
              "kind" : "box",
              "name" : "Aorta dilatiert",
              "value" : false,
              "text" : "aneurysmatisch dilatiert",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : "AZ1"
            }
          ]
        },
        {
          "kind" : "enumeration",
          "text" : "Thorakale Aorta ",
          "judgementText" : null,
          "id" : "AZ1"
        },
        {
          "kind" : "block",
          "text" : "\n\nHerzsilhouette  ",
          "judgementText" : null
        },
        {
          "kind" : "category",
          "name" : "Herz",
          "selectables" : [
            {
              "kind" : "box",
              "name" : "Herz normal",
              "value" : false,
              "text" : " unauffällig. ",
              "judgementText" : null,
              "normal" : true,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : null
            },
            {
              "kind" : "group",
              "name" : "CG3",
              "options" : [
                {
                  "kind" : "option",
                  "name" : "Herz verbreitert",
                  "text" : " im Querdurchmesser verbreitert.  ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "Herz verbreitert, aortal",
                  "text" : "\nHerz im Querdurchmesser verbreitert und aortal konfiguriert. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "Herz verbreitert, mitral",
                  "text" : "\nHerz im Querdurchmesser verbreitert und mitral konfiguriert. Trachealbifurkation aufgeweitet. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                }
              ],
              "value" : null
            },
            {
              "kind" : "box",
              "name" : "Herz-Thorax-Relation",
              "value" : false,
              "text" : "Die Herz-Thorax-Relation beträgt %H1%. ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
                {
                  "kind" : "ratio",
                  "id" : "H1",
                  "textBefore" : "Herz-Thorax-Relation x:y",
                  "textAfter" : "",
                  "numerator" : 0.0,
                  "denominator" : 0.0,
                  "fractionDigits" : 2
                }
              ],
              "enumeration" : null
            }
          ]
        },
        {
          "kind" : "block",
          "text" : "\n\nLungenkerne und -peripherie: \n",
          "judgementText" : null
        },
        {
          "kind" : "category",
          "name" : "Hilus",
          "selectables" : [
            {
              "kind" : "box",
              "name" : "normal",
              "value" : false,
              "text" : "Hili gefäßtypisch konfiguriert. ",
              "judgementText" : null,
              "normal" : true,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : null
            },
            {
              "kind" : "group",
              "name" : "CG5",
              "options" : [
                {
                  "kind" : "option",
                  "name" : "unscharf",
                  "text" : "Hili unscharf konfiguriert. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "unscharf, verplumpt.",
                  "text" : "Hili unscharf konfiguriert, verplumpt. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                }
              ],
              "value" : null
            }
          ]
        },
        {
          "kind" : "category",
          "name" : "Lunge",
          "selectables" : [
            {
              "kind" : "box",
              "name" : "normal",
              "value" : false,
              "text" : "Zentrale und periphere Lungengefäßzeichnung regulär, keine alveolären oder interstitiellen Verdichtungen abgrenzbar. ",
              "judgementText" : null,
              "normal" : true,
              "conditionalId" : null,
              "variables" : [
              ],
              "enumeration" : null
            },
            {
              "kind" : "group",
              "name" : "CG4",
              "options" : [
                {
                  "kind" : "option",
                  "name" : "pv-Stau I",
                  "text" : "Pulmonalvenöse Umverteilung mit dilatierten, scharf begrenzten Oberlappengefäßen (vaskuläre Kranialisation) und normalem Lungeninterstitium. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "pv-Stau II",
                  "text" : "Mäßige Hypervolämie mit dilatierten, unscharf begrenzten Oberlappengefäßen und Bronchialmanschettenzeichen. ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "pv-Stau III",
                  "text" : "Deutliche Hypervolämie mit zentral unscharf begrenzten Lungengefäßen, Bronchialmanschettenzeichen und vermehrter interstitieller Zeichnung einschließlich Kerley-Linien (interstitielles Lungenödem). ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                },
                {
                  "kind" : "option",
                  "name" : "pv-Stau IV",
                  "text" : "Massive Hypervolämie mit zentral und peripher unscharf abgrenzbaren Lungengefäßen sowie deutlich vermehrt interstitieller und fleckförmiger Zeichnung (interstitelles und alveoläres Lungenödem). ",
                  "judgementText" : null,
                  "normal" : false,
                  "conditionalId" : null,
                  "variables" : [
                  ]
                }
              ],
              "value" : null
            },
            {
              "kind" : "box",
              "name" : "Dystelektasen",
              "value" : false,
              "text" : "[%D1%] Minderbelüftungen [%D2%] [betont im %D3%]. ",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
                {
                  "kind" : "oc",
                  "id" : "D1",
                  "textBefore" : "",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "Streifenförmige",
                    "Flächige"
                  ]
                },
                {
                  "kind" : "oc",
                  "id" : "D2",
                  "textBefore" : "",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "re.",
                    "li.",
                    "bds."
                  ]
                },
                {
                  "kind" : "oc",
                  "id" : "D3",
                  "textBefore" : "",
                  "textAfter" : "",
                  "value" : null,
                  "values" : [
                    "Oberfeld",
                    "Mittelfeld",
                    "Unterfeld"
                  ]
                }
              ],
              "enumeration" : null
            },
            {
              "kind" : "box",
              "name" : "Raumforderung",
              "value" : false,
              "text" : "Tumorverdächtige Raumforderung mit folgenden Charakteristika: Lage im %L1%, Ausdehnung über %L2% cm, Form %L3%,  Begrenzung %L4%.",
              "judgementText" : null,
              "normal" : false,
              "conditionalId" : null,
              "variables" : [
                {
                  "kind" : "text",
                  "id" : "L1",
                  "textBefore" : "Lage im ",
                  "textAfter" : "",
                  "value" : ""
                },
                {
                  "kind" : "text",
                  "id" : "L2",
                  "textBefore" : "Ausdehung über ",
                  "textAfter" : " cm",
                  "value" : ""
                },
                {
                  "kind" : "text",
                  "id" : "L3",
                  "textBefore" : "Form ",
                  "textAfter" : "",
                  "value" : ""
                },
                {
                  "kind" : "text",
                  "id" : "L4",
                  "textBefore" : "Begrenzung ",
                  "textAfter" : "",
                  "value" : ""
                }
              ],
              "enumeration" : null
            }
          ]
        }
      ];

      ;
    }
  }

  text: string = "";
  judgement: string = "";
  modalVariables: Variable[] = [];

  parts: TopLevel[] = [];

  makeText(): void {
    const [suppressedNormal, suppressedJudgement] = getSuppressedConditionalIds(this.parts);

    const normalExtractor: TextExtractor = new class {
      ofCheckbox(c: CheckBox): string | undefined { return c.text; }
      ofOption(o: Option): string | undefined { return o.text; }
      ofEnumeration(e: Enumeration): string | undefined { return e.text; }
      ofBlock(b: Block): string | undefined { return b.text; }
      ofConditional(c: Conditional): string | undefined { return c.normalText; }
    }

    const judgementExtractor: TextExtractor = new class {
      ofCheckbox(c: CheckBox): string | undefined { return c.judgementText; }
      ofOption(o: Option): string | undefined { return o.judgementText; }
      ofEnumeration(e: Enumeration): string | undefined { return e.judgementText; }
      ofBlock(b: Block): string | undefined { return b.judgementText; }
      ofConditional(c: Conditional): string | undefined { return c.judgementText; }
    }

    const makeText = (parts: TopLevel[], extractor: TextExtractor, suppressed: string[]): string => {
      return parts.map(c => {
        if (c.kind === "category") {
          return getTexts(c.selectables, suppressed, extractor).map(t => expandVariablesInString(t, parts)).join("")
        } else if (c.kind === "block") {
          return extractor.ofBlock(c) || "";
        } else if (c.kind === "enumeration") {
          return makeEnumeration(c, parts, extractor);
        } else if (c.kind === "conditional") {
          if (checkConditional(c, parts)) {
            const data = extractor.ofConditional(c);
            if (data) {
              return expandVariablesInString(data, parts);
            } else {
              return "";
            }
          }
        } else {
          throw new Error("unkonwn top level kind");
        }
      }).join("");
    }

    this.text = makeText(this.parts, normalExtractor, suppressedNormal);
    this.judgement = makeText(this.parts, judgementExtractor, suppressedJudgement);
  }

  copyText(): void {
    (document.getElementById("output") as HTMLInputElement).select();
    document.execCommand('copy');
  }

  makeNormal(): void {
    for (const p of this.parts) {
      if (p.kind === "category") {
        makeNormalCategory(p);
      }
    }
    this.makeText();
  }

  clicked(clicked: Clickable, parent?: Group): void {
    if (clicked.kind === "box" && clicked.variables.length > 0 && !clicked.value) {
      $('#variableDialog').modal('show');
      this.modalVariables = clicked.variables;
    } else if (clicked.kind === "option" && clicked.variables.length > 0 && parent && parent.value !== clicked.name) {
      $('#variableDialog').modal('show');
      this.modalVariables = clicked.variables;
    }
    setTimeout(() => this.makeText(), 0);
  }

  endVariableSelection(): void {
    this.makeText();
  }

  saveDialog(): void {
    localStorage.setItem("emptyDialog", JSON.stringify(JSON.parse(this.text)));
    this.parts = JSON.parse(this.text);
    this.text = "";
  }
}

function getSuppressedConditionalIds(data: TopLevel[]): string[][] {
  const suppressedNormal: string[] = [];
  const suppressedJudgement: string[] = [];

  for (const topLevel of data) {
    if (topLevel.kind === "conditional") {
      if (checkConditional(topLevel, data)) {
        for (const anded of topLevel.precondition) {
          for (const literal of anded) {
            if (!literal.negated) {
              if (topLevel.normalText) {
                suppressedNormal.push(literal.id);
              }
              if (topLevel.judgementText) {
                suppressedJudgement.push(literal.id);
              }
            }
          }
        }
      }
    }
  }

  return [suppressedNormal, suppressedJudgement];
}

function checkConditional(c: Conditional, data: TopLevel[]): boolean {
  outer:
  for (let anded of c.precondition) {
    for (let literal of anded) {
      if (isClicked(literal.id, data) == literal.negated) {
        continue outer;
      }
    }
    return true;
  }
  return false;
}

function isClicked(clickableId: string, data: TopLevel[]): boolean {
  for (const category of data.filter(p => p.kind === "category").map(c => c as Category)) {
    for (const selectable of category.selectables) {
      if (selectable.kind === 'box') {
        if (selectable.value && selectable.conditionalId === clickableId) {
          return true;
        }
      } else {
        for (const option of selectable.options) {
          if (option.conditionalId === clickableId && selectable.value === option.name) {
            return true;
          }
        }
      }
    }
  }

  return false;
}


function getTexts(ss: Selectable[], suppressed: string[], textExtractor: TextExtractor): string[] {
  const ret: string[] = [];

  for (const s of ss) {
    if (s.kind === "box" && s.value && !s.enumeration && (!s.conditionalId || suppressed.indexOf(s.conditionalId) == -1)) {
      const result = textExtractor.ofCheckbox(s);
      if (result) {
        ret.push(s.text);
      }
    } else if (s.kind === "group") {
      for (const o of s.options) {
        if (s.value === o.name && (!o.conditionalId || suppressed.indexOf(o.conditionalId) == -1)) {
          const result = textExtractor.ofOption(o);
          if (result) {
            ret.push(o.text);
          }
        }
      }
    }
  }

  return ret;
}

function expandVariablesInString(s: string, data: TopLevel[]): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const lookup: (string) => string = (name) => {
    if (name === "%Gestern%") {
      return makeDateString(yesterday);
    } else if (name === "%Heute%") {
      return makeDateString(today);
    } else if (name === "%Morgen%") {
      return makeDateString(tomorrow);
    }
    const vars = allVariables(data);
    const matching = vars.find(v => "%" + v.id + "%" === name);
    if (matching) {
      return textOfVariable(matching) || "-";
    } else {
      return "-";
    }
  }

  return s.replace(/%[^%]+%/g, lookup);
}

function makeDateString(d: Date): string {
  return d.toLocaleDateString("de-DE", { year: 'numeric', month: 'numeric', day: 'numeric' });
}

function allVariables(data: TopLevel[]): Variable[] {
  let vars: Variable[] = [];

  for (const c of data) {
    if (c.kind === "category") {
      for (const sel of c.selectables) {
        if (sel.kind === "box" && sel.value) {
          vars = vars.concat(sel.variables);
        } else if (sel.kind === "group") {
          for (const o of sel.options) {
            if (sel.value === o.name) {
              vars = vars.concat(o.variables);
            }
          }
        }
      }
    }
  }

  return vars;
}

function textOfVariable(v: Variable): string | undefined {
  if (v.kind === "oc") {
    return v.value;
  } else if (v.kind === "text") {
    return v.value;
  } else if (v.kind === "number") {
    return "" + v.value;
  } else if (v.kind === "date") {
    return v.value.day + "." + v.value.month + "." + v.value.year;
  } else if (v.kind === "ratio") {
    return (v.numerator / v.denominator).toLocaleString("de-DE", { maximumFractionDigits: v.fractionDigits });
  }
}

function makeNormalCategory(c: Category): void {
  if (hasSelection(c)) return;

  for (const entry of c.selectables) {
    if (entry.kind === "box") {
      if (entry.normal) {
        entry.value = true;
      }
    } else if (entry.kind === "group") {
      for (const o of entry.options) {
        if (o.normal) {
          entry.value = o.name;
        }
      }
    }
  }
}

function hasSelection(c: Category): boolean {
  for (const entry of c.selectables) {
    if (entry.kind === "box" && entry.value) {
      return true;
    } else if (entry.kind === "group" && entry.value) {
      return true;
    }
  }

  return false;
}

function makeEnumeration(e: Enumeration, data: TopLevel[], textExtractor: TextExtractor): string {
  const items: string[] = getRelevantEnumerationItems(e.id, data, textExtractor);
  if (items.length === 0) {
    return "";
  } else if (items.length === 1) {
    return textExtractor.ofEnumeration(e) + items[0];
  } else if (items.length === 2) {
    return textExtractor.ofEnumeration(e) + items[0] + " und " + items[1];
  } else if (items.length > 2) {
    return textExtractor.ofEnumeration(e) + items.slice(0, items.length - 1).join(", ") + " und " + items[items.length - 1];
  }
}

function getRelevantEnumerationItems(id: string, data: TopLevel[], textExtractor: TextExtractor): string[] {
  const items: string[] = [];

  for (const p of data) {
    if (p.kind === "category") {
      for (const s of p.selectables) {
        if (s.kind === "box") {
          if (s.value && s.enumeration === id) {
            const result = textExtractor.ofCheckbox(s);
            if (result) {
              items.push(expandVariablesInString(s.text, data));
            }
          }
        }
      }
    }
  }

  return items;
}

type Selectable = CheckBox | Group;
type Clickable  = CheckBox | Option;

export interface TextExtractor {
  ofCheckbox(c: CheckBox): string | undefined;
  ofOption(o: Option): string | undefined;
  ofEnumeration(e: Enumeration): string | undefined;
  ofBlock(e: Block): string | undefined;
  ofConditional(c: Conditional): string | undefined;
}

export interface CheckBox {
  kind:           "box";
  name:           string;
  value:          boolean;
  text:           string;
  judgementText?: string;
  conditionalId?: string;
  normal:         boolean;
  variables:      Variable[];
  enumeration?:   string;
}

export interface Group {
  kind:    "group";
  name:    string;
  options: Option[];
  value?:  string;
}

export interface Option {
  kind:           "option";
  name:           string;
  text:           string;
  conditionalId?: string;
  judgementText?: string;
  normal:         boolean;
  variables:      Variable[];
}

type TopLevel = Category | Block | Enumeration | Conditional;

export interface Category {
  kind: "category";
  name: string;
  selectables: Selectable[];
}

export interface Block {
  kind: "block";
  text?: string;
  judgementText?: string;
}

export interface Enumeration {
  kind:           "enumeration";
  text:           string;
  judgementText?: string;
  id:             string;
}

export interface Conditional {
  kind:           "conditional"
  precondition:   Literal[][];
  normalText?:    string;
  judgementText?: string;
}

export interface Literal {
  id:      string;
  negated: boolean;
}

type Variable = VariableOC | VariableText | VariableNumber | VariableDate | VariableRatio

export interface VariableCommon {
  id:         string;
  textBefore: string;
  textAfter:  string;
}

export interface VariableOC extends VariableCommon {
  kind:   "oc";
  value?: string;
  values: string[];
}

export interface VariableText extends VariableCommon {
  kind:  "text";
  value: string;
}

export interface VariableNumber extends VariableCommon {
  kind:  "number";
  value: number;
}

export interface VariableDate extends VariableCommon {
  kind:  "date";
  value: NgbDateStruct;
}

export interface VariableRatio extends VariableCommon {
  kind:           "ratio";
  numerator:      number;
  denominator:    number;
  fractionDigits: number;
}
