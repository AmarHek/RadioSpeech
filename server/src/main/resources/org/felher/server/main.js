(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _text_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./text/text.component */ "./src/app/text/text.component.ts");
/* harmony import */ var _upload_upload_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./upload/upload.component */ "./src/app/upload/upload.component.ts");
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./list/list.component */ "./src/app/list/list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _text_text_component__WEBPACK_IMPORTED_MODULE_7__["TextComponent"],
                _upload_upload_component__WEBPACK_IMPORTED_MODULE_8__["UploadComponent"],
                _list_list_component__WEBPACK_IMPORTED_MODULE_9__["ListComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot([
                    { path: 'text/:name', component: _text_text_component__WEBPACK_IMPORTED_MODULE_7__["TextComponent"] },
                    { path: 'upload', component: _upload_upload_component__WEBPACK_IMPORTED_MODULE_8__["UploadComponent"] },
                    { path: 'list', component: _list_list_component__WEBPACK_IMPORTED_MODULE_9__["ListComponent"] },
                ], { useHash: true })
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/list/list.component.css":
/*!*****************************************!*\
  !*** ./src/app/list/list.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/list/list.component.html":
/*!******************************************!*\
  !*** ./src/app/list/list.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ul>\n  <li *ngFor=\"let generator of generators\">\n    <a [routerLink]=\"['/', 'text', generator]\">{{generator}}</a> <button (click)=\"remove(generator)\">remove</button>\n  </li>\n</ul>\n\n<div *ngIf=\"generators.length === 0\">\n  Es wurde noch nichts hochgeladen\n</div>\n"

/***/ }),

/***/ "./src/app/list/list.component.ts":
/*!****************************************!*\
  !*** ./src/app/list/list.component.ts ***!
  \****************************************/
/*! exports provided: ListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListComponent", function() { return ListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListComponent = /** @class */ (function () {
    function ListComponent(http) {
        this.http = http;
        this.generators = [];
    }
    ListComponent.prototype.ngOnInit = function () {
        this.updateList();
    };
    ListComponent.prototype.remove = function (generator) {
        var _this = this;
        this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].urlRoot + 'remove', JSON.stringify(generator)).subscribe(function (result) { _this.updateList(); }, function (error) { return window.alert("unknown error: " + JSON.stringify(error)); });
    };
    ListComponent.prototype.updateList = function () {
        var _this = this;
        this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].urlRoot + 'list', '').subscribe(function (result) { _this.generators = result; }, function (error) { return window.alert("unknown error: " + JSON.stringify(error)); });
    };
    ListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-list',
            template: __webpack_require__(/*! ./list.component.html */ "./src/app/list/list.component.html"),
            styles: [__webpack_require__(/*! ./list.component.css */ "./src/app/list/list.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/text/text.component.css":
/*!*****************************************!*\
  !*** ./src/app/text/text.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "td.box {\n\tpadding: 5px 20px;\n\tpadding-right: 2px;\n}\n\ntd.title {\n\tpadding: 5px 20px;\n\tpadding-left:  2px;\n}\n\ntd.category {\n\tfont-size: 120%;\n\tfont-weight: bold;\n}\n\n#normal-button {\n\tfont-weight: bold;\n\tcolor: black;\n}\n\n"

/***/ }),

/***/ "./src/app/text/text.component.html":
/*!******************************************!*\
  !*** ./src/app/text/text.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row text-center\">\n    <div class=\"col\">\n      <h1 class=\"text-center\">Der Web-Befundgenerator</h1>\n    </div>\n  </div>\n  <div class=\"row mt-1\">\n    <div class=\"col\">\n      <table>\n\t<tbody>\n\t  <tr *ngFor=\"let category of parts\">\n\t    <td class=\"category\">{{category.name}}</td>\n\t    <ng-container *ngFor=\"let sel of category.selectables\" class=\"col-3\">\n\t      <ng-container *ngIf=\"sel.kind === 'box'\">\n\t\t<td class=\"box\"> <input (click)=\"clicked(sel)\" type=\"checkbox\" [(ngModel)]=\"sel.value\"/> </td>\n\t\t<td class=\"title\"> {{sel.name}} </td>\n\t      </ng-container>\n\t      <ng-container *ngIf=\"sel.kind === 'group'\">\n\t\t<ng-container *ngFor=\"let option of sel.options\" class=\"col-3\">\n\t\t  <td class=\"box\"> <input (click)=\"clicked(option, sel)\" [name]=\"sel.name\" [value]=\"option.name\" type=\"radio\" [(ngModel)]=\"sel.value\"/> </td>\n\t\t  <td class=\"title\"> {{option.name}} </td>\n\t\t</ng-container>\n\t      </ng-container>\n\t    </ng-container>\n\t  </tr>\n\t</tbody>\n      </table>\n    </div>\n  </div>\n  <div class=\"row mt-3\">\n    <div class=\"col\">\n      <button id=\"normal-button\" (click)=\"makeNormal()\" class=\"btn btn-outline-secondary float-left \">Rest normal</button>\n    </div>\n  </div>\n  <div class=\"row mt-3\">\n    <div class=\"col\">\n      <button id=\"ready-button\" (click)=\"copyText('output1')\" class=\"btn btn-outline-secondary float-left\">Befund kopieren</button>\n      <button id=\"ready-button\" (click)=\"copyText('output2')\" class=\"btn btn-outline-secondary float-right\">Beurteilung kopieren</button>\n    </div>\n  </div>\n  <div class=\"row mt-3\">\n    <div class=\"col\">\n      <textarea placeholder=\"Wenn Sie hier etwas eingeben, wird es bei der Berichtgenerierung überschrieben\" id=\"output1\" rows=20 class=\"w-100\" [(ngModel)]=\"text\"></textarea>\n    </div>\n    <div class=\"col\">\n      <textarea placeholder=\"Wenn Sie hier etwas eingeben, wird es bei der Beurteilungsgenerierung überschrieben\" id=\"output2\" rows=20 class=\"w-100\" [(ngModel)]=\"judgement\"></textarea>\n    </div>\n  </div>\n  <div class=\"row mt-3\">\n    <div class=\"col text-center\">\n       <button (click)=\"saveDialog()\" class=\"btn btn-outline-secondary\">Input als neuen default Dialog speichern</button>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal fade\" id=\"variableDialog\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"variableDialogLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"variableDialogLabel\">Parameter zum Textbaustein eingeben</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n\t<table>\n\t  <tr *ngFor=\"let v of modalVariables\">\n\t    <td class=\"text-right\">{{v.textBefore}}</td>\n\t    <td *ngIf=\"v.kind === 'oc'\">\n\t      <span *ngFor=\"let vv of v.values\">\n\t\t<input type=\"radio\" name=\"{{v.id}}\" [value]=\"vv\" [(ngModel)]=\"v.value\"/> {{vv}}\n\t      </span>\n\t    </td>\n\t    <td *ngIf=\"v.kind === 'mc'\">\n\t      <span *ngFor=\"let vv of v.values\">\n\t\t<input type=\"checkbox\" name=\"{{v.id}}\" [value]=\"vv[0]\" [(ngModel)]=\"vv[1]\"/> {{vv[0]}}\n\t      </span>\n\t    </td>\n\t    <td *ngIf=\"v.kind === 'text'\">\n\t      <input type=\"text\" [(ngModel)]=\"v.value\"/>\n\t    </td>\n\t    <td *ngIf=\"v.kind === 'number'\">\n\t      <input type=\"number\" class=\"w-100\" [(ngModel)]=\"v.value\"/>\n\t    </td>\n\t    <td *ngIf=\"v.kind === 'date'\">\n\t      <ngb-datepicker [(ngModel)]=\"v.value\"></ngb-datepicker>\n\t    </td>\n\t    <td *ngIf=\"v.kind === 'ratio'\">\n\t      <input type=\"number\" [(ngModel)]=\"v.numerator\" /> / <input type=\"number\" [(ngModel)]=\"v.denominator\" />\n\t    </td>\n\t    <td class=\"text-left\">{{v.textAfter}}</td>\n\t  </tr>\n\t</table>\n      </div>\n      <div class=\"modal-footer\">\n\t<button (click)=\"endVariableSelection()\" type=\"button\" data-dismiss=\"modal\" class=\"btn btn-primary\">Ok</button>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/text/text.component.ts":
/*!****************************************!*\
  !*** ./src/app/text/text.component.ts ***!
  \****************************************/
/*! exports provided: TextComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextComponent", function() { return TextComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TextComponent = /** @class */ (function () {
    function TextComponent(dateParser, http, route) {
        var _this = this;
        this.dateParser = dateParser;
        this.http = http;
        this.route = route;
        this.text = "";
        this.judgement = "";
        this.modalVariables = [];
        this.parts = [];
        route.paramMap.subscribe(function (ps) {
            if (ps.get('name')) {
                http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urlRoot + 'get', JSON.stringify(ps.get('name'))).subscribe(function (worked) { _this.parts = worked; }, function (error) { return window.alert("An unknown error occured: " + JSON.stringify(error)); });
            }
        });
    }
    TextComponent.prototype.makeText = function () {
        var _a = getSuppressedConditionalIds(this.parts), suppressedNormal = _a[0], suppressedJudgement = _a[1];
        var normalExtractor = new /** @class */ (function () {
            function class_1() {
            }
            class_1.prototype.ofCheckbox = function (c) { return c.text; };
            class_1.prototype.ofOption = function (o) { return o.text; };
            class_1.prototype.ofEnumeration = function (e) { return e.text; };
            class_1.prototype.ofBlock = function (b) { return b.text; };
            class_1.prototype.ofConditional = function (c) { return c.normalText; };
            return class_1;
        }());
        var judgementExtractor = new /** @class */ (function () {
            function class_2() {
            }
            class_2.prototype.ofCheckbox = function (c) { return c.judgementText; };
            class_2.prototype.ofOption = function (o) { return o.judgementText; };
            class_2.prototype.ofEnumeration = function (e) { return e.judgementText; };
            class_2.prototype.ofBlock = function (b) { return b.judgementText; };
            class_2.prototype.ofConditional = function (c) { return c.judgementText; };
            return class_2;
        }());
        var makeText = function (parts, extractor, suppressed) {
            return parts.map(function (c) {
                if (c.kind === "category") {
                    return getTexts(c.selectables, suppressed, extractor).map(function (t) { return expandVariablesInString(t, parts); }).join("");
                }
                else if (c.kind === "block") {
                    return extractor.ofBlock(c) || "";
                }
                else if (c.kind === "enumeration") {
                    return makeEnumeration(c, parts, extractor);
                }
                else if (c.kind === "conditional") {
                    if (checkConditional(c, parts)) {
                        var data = extractor.ofConditional(c);
                        if (data) {
                            return expandVariablesInString(data, parts);
                        }
                        else {
                            return "";
                        }
                    }
                }
                else {
                    throw new Error("unkonwn top level kind");
                }
            }).join("");
        };
        this.text = makeText(this.parts, normalExtractor, suppressedNormal);
        this.judgement = makeText(this.parts, judgementExtractor, suppressedJudgement);
    };
    TextComponent.prototype.copyText = function (id) {
        document.getElementById(id).select();
        document.execCommand('copy');
    };
    TextComponent.prototype.makeNormal = function () {
        for (var _i = 0, _a = this.parts; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.kind === "category") {
                makeNormalCategory(p);
            }
        }
        this.makeText();
    };
    TextComponent.prototype.clicked = function (clicked, parent) {
        var _this = this;
        if (clicked.kind === "box" && clicked.variables.length > 0 && !clicked.value) {
            $('#variableDialog').modal('show');
            this.modalVariables = clicked.variables;
        }
        else if (clicked.kind === "option" && clicked.variables.length > 0 && parent && parent.value !== clicked.name) {
            $('#variableDialog').modal('show');
            this.modalVariables = clicked.variables;
        }
        setTimeout(function () { return _this.makeText(); }, 0);
    };
    TextComponent.prototype.endVariableSelection = function () {
        this.makeText();
    };
    TextComponent.prototype.saveDialog = function () {
        localStorage.setItem("emptyDialog", JSON.stringify(JSON.parse(this.text)));
        this.parts = JSON.parse(this.text);
        this.text = "";
    };
    TextComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-text',
            template: __webpack_require__(/*! ./text.component.html */ "./src/app/text/text.component.html"),
            styles: [__webpack_require__(/*! ./text.component.css */ "./src/app/text/text.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbDateParserFormatter"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], TextComponent);
    return TextComponent;
}());

function getSuppressedConditionalIds(data) {
    var suppressedNormal = [];
    var suppressedJudgement = [];
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var topLevel = data_1[_i];
        if (topLevel.kind === "conditional") {
            if (checkConditional(topLevel, data)) {
                for (var _a = 0, _b = topLevel.precondition; _a < _b.length; _a++) {
                    var anded = _b[_a];
                    for (var _c = 0, anded_1 = anded; _c < anded_1.length; _c++) {
                        var literal = anded_1[_c];
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
function checkConditional(c, data) {
    outer: for (var _i = 0, _a = c.precondition; _i < _a.length; _i++) {
        var anded = _a[_i];
        for (var _b = 0, anded_2 = anded; _b < anded_2.length; _b++) {
            var literal = anded_2[_b];
            if (isClicked(literal.id, data) == literal.negated) {
                continue outer;
            }
        }
        return true;
    }
    return false;
}
function isClicked(clickableId, data) {
    for (var _i = 0, _a = data.filter(function (p) { return p.kind === "category"; }).map(function (c) { return c; }); _i < _a.length; _i++) {
        var category = _a[_i];
        for (var _b = 0, _c = category.selectables; _b < _c.length; _b++) {
            var selectable = _c[_b];
            if (selectable.kind === 'box') {
                if (selectable.value && selectable.conditionalId === clickableId) {
                    return true;
                }
            }
            else {
                for (var _d = 0, _e = selectable.options; _d < _e.length; _d++) {
                    var option = _e[_d];
                    if (option.conditionalId === clickableId && selectable.value === option.name) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
function getTexts(ss, suppressed, textExtractor) {
    var ret = [];
    for (var _i = 0, ss_1 = ss; _i < ss_1.length; _i++) {
        var s = ss_1[_i];
        if (s.kind === "box" && s.value && !s.enumeration && (!s.conditionalId || suppressed.indexOf(s.conditionalId) == -1)) {
            var result = textExtractor.ofCheckbox(s);
            if (result) {
                ret.push(result);
            }
        }
        else if (s.kind === "group") {
            for (var _a = 0, _b = s.options; _a < _b.length; _a++) {
                var o = _b[_a];
                if (s.value === o.name && (!o.conditionalId || suppressed.indexOf(o.conditionalId) == -1)) {
                    var result = textExtractor.ofOption(o);
                    if (result) {
                        ret.push(result);
                    }
                }
            }
        }
    }
    return ret;
}
function expandVariablesInString(s, data) {
    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    var lookup = function (name) {
        if (name === "%Gestern%") {
            return makeDateString(yesterday);
        }
        else if (name === "%Heute%") {
            return makeDateString(today);
        }
        else if (name === "%Morgen%") {
            return makeDateString(tomorrow);
        }
        var vars = allVariables(data);
        var matching = vars.find(function (v) { return "%" + v.id + "%" === name; });
        if (matching) {
            return textOfVariable(matching) || "-";
        }
        else {
            return "-";
        }
    };
    return s.replace(/%[^%]+%/g, lookup);
}
function makeDateString(d) {
    return d.toLocaleDateString("de-DE", { year: 'numeric', month: 'numeric', day: 'numeric' });
}
function allVariables(data) {
    var vars = [];
    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
        var c = data_2[_i];
        if (c.kind === "category") {
            for (var _a = 0, _b = c.selectables; _a < _b.length; _a++) {
                var sel = _b[_a];
                if (sel.kind === "box" && sel.value) {
                    vars = vars.concat(sel.variables);
                }
                else if (sel.kind === "group") {
                    for (var _c = 0, _d = sel.options; _c < _d.length; _c++) {
                        var o = _d[_c];
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
function textOfVariable(v) {
    if (v.kind === "oc") {
        return v.value;
    }
    else if (v.kind === "mc") {
        return v.values.filter(function (v) { return v[1]; }).map(function (v) { return v[0]; }).join(", ");
    }
    else if (v.kind === "text") {
        return v.value;
    }
    else if (v.kind === "number") {
        return "" + v.value;
    }
    else if (v.kind === "date") {
        return v.value.day + "." + v.value.month + "." + v.value.year;
    }
    else if (v.kind === "ratio") {
        return (v.numerator / v.denominator).toLocaleString("de-DE", { maximumFractionDigits: v.fractionDigits });
    }
    return assertUnreachable(v);
}
function makeNormalCategory(c) {
    if (hasSelection(c))
        return;
    for (var _i = 0, _a = c.selectables; _i < _a.length; _i++) {
        var entry = _a[_i];
        if (entry.kind === "box") {
            if (entry.normal) {
                entry.value = true;
            }
        }
        else if (entry.kind === "group") {
            for (var _b = 0, _c = entry.options; _b < _c.length; _b++) {
                var o = _c[_b];
                if (o.normal) {
                    entry.value = o.name;
                }
            }
        }
    }
}
function hasSelection(c) {
    for (var _i = 0, _a = c.selectables; _i < _a.length; _i++) {
        var entry = _a[_i];
        if (entry.kind === "box" && entry.value) {
            return true;
        }
        else if (entry.kind === "group" && entry.value) {
            return true;
        }
    }
    return false;
}
function makeEnumeration(e, data, textExtractor) {
    var items = getRelevantEnumerationItems(e.id, data, textExtractor);
    if (items.length === 0) {
        return "";
    }
    else if (items.length === 1) {
        return textExtractor.ofEnumeration(e) + items[0];
    }
    else if (items.length === 2) {
        return textExtractor.ofEnumeration(e) + items[0] + " und " + items[1];
    }
    else if (items.length > 2) {
        return textExtractor.ofEnumeration(e) + items.slice(0, items.length - 1).join(", ") + " und " + items[items.length - 1];
    }
}
function getRelevantEnumerationItems(id, data, textExtractor) {
    var items = [];
    for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
        var p = data_3[_i];
        if (p.kind === "category") {
            for (var _a = 0, _b = p.selectables; _a < _b.length; _a++) {
                var s = _b[_a];
                if (s.kind === "box") {
                    if (s.value && s.enumeration === id) {
                        var result = textExtractor.ofCheckbox(s);
                        if (result) {
                            items.push(expandVariablesInString(result, data));
                        }
                    }
                }
            }
        }
    }
    return items;
}
function assertUnreachable(x) {
    throw new Error("should not be reachable: " + x);
}


/***/ }),

/***/ "./src/app/upload/upload.component.css":
/*!*********************************************!*\
  !*** ./src/app/upload/upload.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "td {\n\tpadding: 5px;\n}\n"

/***/ }),

/***/ "./src/app/upload/upload.component.html":
/*!**********************************************!*\
  !*** ./src/app/upload/upload.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form>\n  <table>\n    <tr><td>file</td><td><input type=\"file\" id=\"uploadFile\"/></td></tr>\n    <tr><td>name</td><td><input type=\"text\" name=\"name\" [(ngModel)]=\"name\"></td></tr>\n    <tr><td></td><td><button (click)=\"upload()\">Upload</button></td></tr>\n  </table>\n</form>\n"

/***/ }),

/***/ "./src/app/upload/upload.component.ts":
/*!********************************************!*\
  !*** ./src/app/upload/upload.component.ts ***!
  \********************************************/
/*! exports provided: UploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadComponent", function() { return UploadComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UploadComponent = /** @class */ (function () {
    function UploadComponent(http) {
        this.http = http;
        this.name = "";
    }
    UploadComponent.prototype.ngOnInit = function () {
    };
    UploadComponent.prototype.upload = function () {
        var _this = this;
        var reader = new FileReader();
        reader.readAsDataURL(document.getElementById('uploadFile').files[0]);
        reader.onload = function () {
            var base64 = reader.result.replace(/^.*?base64,/, "");
            var data = { name: _this.name, data: base64 };
            _this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].urlRoot + 'upload', data, { 'observe': 'response' }).subscribe(function (result) {
                window.alert("Upload Erfolgreich");
            }, function (error) {
                if (error instanceof ErrorEvent) {
                    window.alert("an unkown error has occurred");
                }
                else {
                    window.alert("parsing failure: " + error.error);
                }
            });
        };
        reader.onerror = function (error) {
            window.alert('The following error occured:\n' + error);
        };
    };
    UploadComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-upload',
            template: __webpack_require__(/*! ./upload.component.html */ "./src/app/upload/upload.component.html"),
            styles: [__webpack_require__(/*! ./upload.component.css */ "./src/app/upload/upload.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UploadComponent);
    return UploadComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    urlRoot: 'http://localhost:1337/',
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/felher/work/univsersity/code/radiologie-befundung/ui/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map