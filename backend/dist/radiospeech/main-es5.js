(function () {
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkradiospeech"] = self["webpackChunkradiospeech"] || []).push([["main"], {
    /***/
    98255:
    /*!*******************************************************!*\
      !*** ./$_lazy_route_resources/ lazy namespace object ***!
      \*******************************************************/

    /***/
    function _(module) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = 98255;
      module.exports = webpackEmptyAsyncContext;
      /***/
    },

    /***/
    90158:
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppRoutingModule": function AppRoutingModule() {
          return (
            /* binding */
            _AppRoutingModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      79661);
      /* harmony import */


      var _app_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/view */
      79642);
      /* harmony import */


      var _app_feature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/feature */
      35292);
      /* harmony import */


      var _app_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @app/helpers */
      8807);
      /* harmony import */


      var _app_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @app/models */
      42139);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var routes = [{
        path: "login",
        component: _app_view__WEBPACK_IMPORTED_MODULE_0__.LoginComponent
      }, {
        path: "list",
        component: _app_feature__WEBPACK_IMPORTED_MODULE_1__.ListComponent,
        canActivate: [_app_helpers__WEBPACK_IMPORTED_MODULE_2__.AuthGuard],
        data: {
          roles: [_app_models__WEBPACK_IMPORTED_MODULE_3__.Role.User, _app_models__WEBPACK_IMPORTED_MODULE_3__.Role.Moderator, _app_models__WEBPACK_IMPORTED_MODULE_3__.Role.Admin]
        }
      }, {
        path: "main/:id",
        component: _app_feature__WEBPACK_IMPORTED_MODULE_1__.UiBaseComponent,
        canActivate: [_app_helpers__WEBPACK_IMPORTED_MODULE_2__.AuthGuard],
        data: {
          roles: [_app_models__WEBPACK_IMPORTED_MODULE_3__.Role.User, _app_models__WEBPACK_IMPORTED_MODULE_3__.Role.Moderator, _app_models__WEBPACK_IMPORTED_MODULE_3__.Role.Admin]
        }
      }, {
        path: "listMat",
        component: _app_feature__WEBPACK_IMPORTED_MODULE_1__.ListMaterialComponent,
        canActivate: [_app_helpers__WEBPACK_IMPORTED_MODULE_2__.AuthGuard],
        data: {
          roles: [_app_models__WEBPACK_IMPORTED_MODULE_3__.Role.Moderator, _app_models__WEBPACK_IMPORTED_MODULE_3__.Role.Admin]
        }
      }, {
        path: "mainMat/:id",
        component: _app_feature__WEBPACK_IMPORTED_MODULE_1__.JudgeMatComponent,
        canActivate: [_app_helpers__WEBPACK_IMPORTED_MODULE_2__.AuthGuard],
        data: {
          roles: [_app_models__WEBPACK_IMPORTED_MODULE_3__.Role.Moderator, _app_models__WEBPACK_IMPORTED_MODULE_3__.Role.Admin]
        }
      }, {
        path: "radiolearn",
        component: _app_feature__WEBPACK_IMPORTED_MODULE_1__.ListMaterialComponent,
        canActivate: [_app_helpers__WEBPACK_IMPORTED_MODULE_2__.AuthGuard],
        data: {
          roles: [_app_models__WEBPACK_IMPORTED_MODULE_3__.Role.User, _app_models__WEBPACK_IMPORTED_MODULE_3__.Role.Moderator, _app_models__WEBPACK_IMPORTED_MODULE_3__.Role.Admin]
        }
      }, {
        path: "admin",
        component: _app_view__WEBPACK_IMPORTED_MODULE_0__.AdminComponent,
        canActivate: [_app_helpers__WEBPACK_IMPORTED_MODULE_2__.AuthGuard],
        data: {
          roles: [_app_models__WEBPACK_IMPORTED_MODULE_3__.Role.Admin]
        }
      }, {
        path: "**",
        redirectTo: "/list"
      }];

      var _AppRoutingModule = function _AppRoutingModule() {
        _classCallCheck(this, _AppRoutingModule);
      };

      _AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
        return new (t || _AppRoutingModule)();
      };

      _AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: _AppRoutingModule
      });
      _AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](_AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    55041:
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppComponent": function AppComponent() {
          return (
            /* binding */
            _AppComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _app_view_header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/view/header/header.component */
      64721);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      79661);

      var _AppComponent = function _AppComponent() {
        _classCallCheck(this, _AppComponent);
      };

      _AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || _AppComponent)();
      };

      _AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _AppComponent,
        selectors: [["app-root"]],
        decls: 2,
        vars: 0,
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "router-outlet");
          }
        },
        directives: [_app_view_header_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet],
        styles: [".app[_ngcontent-%COMP%] {\n  border: 1px solid #a8d8f0;\n  padding: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLHlCQUFBO0VBQ0EsVUFBQTtBQUFGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRib3JkZXItY29sb3I6IGhzbCgyMDAsIDcwJSwgODAlKTtcclxuLmFwcHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyLWNvbG9yO1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    36747:
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppModule": function AppModule() {
          return (
            /* binding */
            _AppModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/platform-browser */
      4919);
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      92352);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/common/http */
      34301);
      /* harmony import */


      var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/material/core */
      14147);
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app.component */
      55041);
      /* harmony import */


      var _app_feature_feature_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/feature/feature.module */
      40828);
      /* harmony import */


      var _app_view_view_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @app/view/view.module */
      63070);
      /* harmony import */


      var _app_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @app/shared/shared.module */
      44466);
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./app-routing.module */
      90158);
      /* harmony import */


      var _app_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @app/helpers */
      8807);
      /* harmony import */


      var _app_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @app/core */
      3825);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _AppModule = function _AppModule() {
        _classCallCheck(this, _AppModule);
      };

      _AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || _AppModule)();
      };

      _AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
        type: _AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
      });
      _AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
        providers: [_app_core__WEBPACK_IMPORTED_MODULE_6__.PopoutService, {
          provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.DateAdapter,
          useClass: _app_helpers__WEBPACK_IMPORTED_MODULE_5__.AppDateAdapter
        }, {
          provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MAT_DATE_FORMATS,
          useValue: _app_helpers__WEBPACK_IMPORTED_MODULE_5__.APP_DATE_FORMATS
        }, {
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HTTP_INTERCEPTORS,
          useClass: _app_helpers__WEBPACK_IMPORTED_MODULE_5__.JwtInterceptor,
          multi: true
        }, {
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HTTP_INTERCEPTORS,
          useClass: _app_helpers__WEBPACK_IMPORTED_MODULE_5__.ErrorInterceptor,
          multi: true
        }],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_4__.AppRoutingModule, _app_feature_feature_module__WEBPACK_IMPORTED_MODULE_1__.FeatureModule, _app_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _app_view_view_module__WEBPACK_IMPORTED_MODULE_2__.ViewModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](_AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_4__.AppRoutingModule, _app_feature_feature_module__WEBPACK_IMPORTED_MODULE_1__.FeatureModule, _app_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _app_view_view_module__WEBPACK_IMPORTED_MODULE_2__.ViewModule]
        });
      })();
      /***/

    },

    /***/
    3825:
    /*!*******************************!*\
      !*** ./src/app/core/index.ts ***!
      \*******************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthenticationService": function AuthenticationService() {
          return (
            /* reexport safe */
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService
          );
        },

        /* harmony export */
        "BackendCallerService": function BackendCallerService() {
          return (
            /* reexport safe */
            _services_backend_caller_service__WEBPACK_IMPORTED_MODULE_1__.BackendCallerService
          );
        },

        /* harmony export */
        "DataParserService": function DataParserService() {
          return (
            /* reexport safe */
            _services_dataParser_service__WEBPACK_IMPORTED_MODULE_2__.DataParserService
          );
        },

        /* harmony export */
        "DisplayService": function DisplayService() {
          return (
            /* reexport safe */
            _services_display_service__WEBPACK_IMPORTED_MODULE_3__.DisplayService
          );
        },

        /* harmony export */
        "FilesSortingService": function FilesSortingService() {
          return (
            /* reexport safe */
            _services_files_sorting_service__WEBPACK_IMPORTED_MODULE_4__.FilesSortingService
          );
        },

        /* harmony export */
        "InputParserService": function InputParserService() {
          return (
            /* reexport safe */
            _services_input_parser_service__WEBPACK_IMPORTED_MODULE_5__.InputParserService
          );
        },

        /* harmony export */
        "MatDialogService": function MatDialogService() {
          return (
            /* reexport safe */
            _services_mat_dialog_service__WEBPACK_IMPORTED_MODULE_6__.MatDialogService
          );
        },

        /* harmony export */
        "PopoutService": function PopoutService() {
          return (
            /* reexport safe */
            _services_popout_service__WEBPACK_IMPORTED_MODULE_7__.PopoutService
          );
        },

        /* harmony export */
        "POPOUT_MODALS": function POPOUT_MODALS() {
          return (
            /* reexport safe */
            _services_popout_tokens__WEBPACK_IMPORTED_MODULE_8__.POPOUT_MODALS
          );
        },

        /* harmony export */
        "POPOUT_MODAL_DATA": function POPOUT_MODAL_DATA() {
          return (
            /* reexport safe */
            _services_popout_tokens__WEBPACK_IMPORTED_MODULE_8__.POPOUT_MODAL_DATA
          );
        },

        /* harmony export */
        "UserService": function UserService() {
          return (
            /* reexport safe */
            _services_user_service__WEBPACK_IMPORTED_MODULE_9__.UserService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _services_authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./services/authentication.service */
      81745);
      /* harmony import */


      var _services_backend_caller_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./services/backend-caller.service */
      30860);
      /* harmony import */


      var _services_dataParser_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./services/dataParser.service */
      22256);
      /* harmony import */


      var _services_display_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./services/display.service */
      4110);
      /* harmony import */


      var _services_files_sorting_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./services/files-sorting.service */
      77);
      /* harmony import */


      var _services_input_parser_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./services/input-parser.service */
      17229);
      /* harmony import */


      var _services_mat_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./services/mat-dialog.service */
      94755);
      /* harmony import */


      var _services_popout_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./services/popout.service */
      79524);
      /* harmony import */


      var _services_popout_tokens__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./services/popout.tokens */
      36366);
      /* harmony import */


      var _services_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./services/user.service */
      88386);
      /***/

    },

    /***/
    81745:
    /*!*********************************************************!*\
      !*** ./src/app/core/services/authentication.service.ts ***!
      \*********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthenticationService": function AuthenticationService() {
          return (
            /* binding */
            _AuthenticationService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      76491);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      33927);
      /* harmony import */


      var _env_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @env/environment */
      92340);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      79661);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common/http */
      34301);

      var _AuthenticationService = /*#__PURE__*/function () {
        function _AuthenticationService(router, http) {
          _classCallCheck(this, _AuthenticationService);

          this.router = router;
          this.http = http;
          this.userSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(JSON.parse(localStorage.getItem("user")));
          this.user = this.userSubject.asObservable();
        }

        _createClass(_AuthenticationService, [{
          key: "userValue",
          get: function get() {
            return this.userSubject.value;
          }
        }, {
          key: "login",
          value: function login(username, password) {
            var _this = this;

            return this.http.post(_env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.backend + _env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.authentication + "signIn", {
              username: username,
              password: password
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (user) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem("user", JSON.stringify(user));

              _this.userSubject.next(user);

              return user;
            }));
          }
        }, {
          key: "logout",
          value: function logout() {
            // remove user from local storage to log user out
            localStorage.removeItem("user");
            this.userSubject.next(null);
            this.router.navigate(["/login"]).then();
          }
        }]);

        return _AuthenticationService;
      }();

      _AuthenticationService.ɵfac = function AuthenticationService_Factory(t) {
        return new (t || _AuthenticationService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
      };

      _AuthenticationService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: _AuthenticationService,
        factory: _AuthenticationService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    30860:
    /*!*********************************************************!*\
      !*** ./src/app/core/services/backend-caller.service.ts ***!
      \*********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "BackendCallerService": function BackendCallerService() {
          return (
            /* binding */
            _BackendCallerService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../environments/environment */
      92340);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common/http */
      34301); // -----------------------------------
      // This class administrates the list of templates and executes all api calls
      // -----------------------------------


      var _BackendCallerService = /*#__PURE__*/function () {
        function _BackendCallerService(http) {
          _classCallCheck(this, _BackendCallerService);

          this.http = http;
          this.templateUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.backend + _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.database + _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.template;
          this.materialUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.backend + _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.database + _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.material;
        }

        _createClass(_BackendCallerService, [{
          key: "getTemplateById",
          value: function getTemplateById(id) {
            return this.http.get(this.templateUrl + id);
          } // TEMPLATE API

        }, {
          key: "addTemplate",
          value: function addTemplate(template) {
            return this.http.post(this.templateUrl, template);
          }
        }, {
          key: "addTemplateFromJSON",
          value: function addTemplateFromJSON(jsonData) {
            return this.http.post(this.templateUrl + "json/", jsonData);
          }
          /*
          addTemplateFromExcel(postData: FormData) {
          this.http
            .post<{ message: string; templateId: string }>(
              this.activeUrl + "excel",
              postData
            )
            .subscribe((res) => {
              let str = "";
              if (res.templateId === "false") {
                str =
                  "Fehler beim Hochladen der Excel Datei. Die Tabelle wurde nicht korrekt befüllt. \n Folgender Fehler ist aufgetreten: \n\n";
              }
              window.alert(str + res.message);
            });
          }*/

        }, {
          key: "deleteTemplate",
          value: function deleteTemplate(id) {
            return this.http["delete"](this.templateUrl + id);
          }
        }, {
          key: "updateTemplate",
          value: function updateTemplate(template) {
            return this.http.put(this.templateUrl + template._id, {
              parts: template.parts,
              name: template.name
            });
          }
        }, {
          key: "getTemplateList",
          value: function getTemplateList() {
            return this.http.get(this.templateUrl);
          } // MATERIAL API

        }, {
          key: "addMaterial",
          value: function addMaterial(formData) {
            return this.http.post(this.materialUrl, formData);
          }
        }, {
          key: "getMaterialById",
          value: function getMaterialById(id) {
            return this.http.get(this.materialUrl + id);
          }
        }, {
          key: "deleteMaterial",
          value: function deleteMaterial(objectID, scanID) {
            return this.http.post(this.materialUrl + "delete/", {
              objectID: objectID,
              scanID: scanID
            });
          }
        }, {
          key: "getMaterials",
          value: function getMaterials() {
            return this.http.get(this.materialUrl + "sample/");
          }
        }, {
          key: "queryMaterials",
          value: function queryMaterials(query) {
            return this.http.post(this.materialUrl + "query/", query);
          }
        }, {
          key: "updateMaterial",
          value: function updateMaterial(material) {
            return this.http.put(this.materialUrl + material._id, {
              template: material.template,
              coordinates: material.coordinates,
              judged: true
            });
          }
        }]);

        return _BackendCallerService;
      }();

      _BackendCallerService.ɵfac = function BackendCallerService_Factory(t) {
        return new (t || _BackendCallerService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
      };

      _BackendCallerService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _BackendCallerService,
        factory: _BackendCallerService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    22256:
    /*!*****************************************************!*\
      !*** ./src/app/core/services/dataParser.service.ts ***!
      \*****************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DataParserService": function DataParserService() {
          return (
            /* binding */
            _DataParserService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _models_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../models/generator */
      70091);
      /* harmony import */


      var _models_templateModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../models/templateModel */
      37771);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _DataParserService = /*#__PURE__*/function () {
        function _DataParserService() {
          _classCallCheck(this, _DataParserService);
        }

        _createClass(_DataParserService, [{
          key: "convertModel",
          value: function convertModel(parts, parseOptional) {
            var newParts = [];

            var _iterator = _createForOfIteratorHelper(parts),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var part = _step.value;

                if (part.kind === "block") {
                  newParts.push(_models_templateModel__WEBPACK_IMPORTED_MODULE_1__.convertBlock(part));
                } else if (part.kind === "enumeration") {
                  newParts.push(_models_templateModel__WEBPACK_IMPORTED_MODULE_1__.convertEnum(part));
                } else if (part.kind === "category") {
                  var newPart = _models_templateModel__WEBPACK_IMPORTED_MODULE_1__.convertCategory(part);

                  if (parseOptional) {
                    newPart = this.parseOptionalCategory(newPart);
                  }

                  newParts.push(newPart);
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return newParts;
          }
        }, {
          key: "extractCategories",
          value: function extractCategories(parts, parseOptional) {
            var res = [];

            var _iterator2 = _createForOfIteratorHelper(parts),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var el = _step2.value;

                if (el.kind === "category") {
                  if (parseOptional) {
                    var parsedCat = this.parseOptionalCategory(el);
                    res.push(parsedCat);
                  } else {
                    res.push(el);
                  }
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            return res;
          }
        }, {
          key: "parseOptionalCategory",
          value: function parseOptionalCategory(cat) {
            var parsedName = this.parseCategoryTitle(cat.name);
            return {
              kind: cat.kind,
              name: parsedName[0],
              optional: parsedName[1],
              selectables: cat.selectables
            };
          }
        }, {
          key: "parseCategoryTitle",
          value: function parseCategoryTitle(catName) {
            if (catName.includes("<", 0)) {
              return [catName.substring(1, catName.length), true];
            } else {
              return [catName, false];
            }
          } // Takes list of categories to transform them into list of rows without groups, only singular buttons

        }, {
          key: "extractRows",
          value: function extractRows(categories, maxRowLength) {
            var rows = [];

            var _iterator3 = _createForOfIteratorHelper(categories),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var category = _step3.value;
                var splits = this.getSplits(category, maxRowLength);
                var split_cats = this.splitCategory(category, splits);
                rows = rows.concat(split_cats);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            return rows;
          }
        }, {
          key: "splitCategory",
          value: function splitCategory(category, splits) {
            // let n_categories = Math.ceil(category.selectables.length / splitLength);
            var res = [];
            var pos = 0;

            var _iterator4 = _createForOfIteratorHelper(splits),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var split = _step4.value;
                var name = void 0;

                if (pos === 0) {
                  name = category.name;
                } else {
                  name = "";
                }

                var temp_sels = [];
                temp_sels = category.selectables.slice(pos, pos + split);
                res.push({
                  kind: "category",
                  name: name,
                  optional: category.optional,
                  selectables: temp_sels
                });
                pos += split;
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            return res;
          }
        }, {
          key: "getSplits",
          value: function getSplits(category, maxRowLength) {
            // Variation of getRowLengths: returns the number of selectables per row instead of number of options
            var rowSplits = [];
            var currentSplit = 0;
            var rowCounter = 0;

            var _iterator5 = _createForOfIteratorHelper(category.selectables),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var sel = _step5.value;

                if (rowCounter >= maxRowLength) {
                  rowSplits.push(currentSplit);
                  currentSplit = 0;
                  rowCounter = 0;
                }

                if (sel.kind === "box") {
                  rowCounter += 1;
                  currentSplit += 1;
                } else if (sel.kind === "group") {
                  if (rowCounter + sel.options.length > maxRowLength) {
                    rowSplits.push(currentSplit);
                    rowCounter = sel.options.length;
                    currentSplit = 1;
                  } else {
                    rowCounter += sel.options.length;
                    currentSplit += 1;
                  }
                }

                if (category.selectables.indexOf(sel) === category.selectables.length - 1 && currentSplit !== 0) {
                  rowSplits.push(currentSplit);
                }
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }

            return rowSplits;
          } // extracts group identifiers and corresponding values for ngModel application

        }, {
          key: "extractGroups",
          value: function extractGroups(categories) {
            var groupValues = new Map();

            var _iterator6 = _createForOfIteratorHelper(categories),
                _step6;

            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var category = _step6.value;

                var _iterator7 = _createForOfIteratorHelper(category.selectables),
                    _step7;

                try {
                  for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                    var sel = _step7.value;

                    if (sel.kind === "group") {
                      console.log(sel.name, sel.value);
                      groupValues.set(sel.name, sel.value);
                    }
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }

            return groupValues;
          }
        }, {
          key: "makeText",
          value: function makeText(parts) {
            var _models_generator__WE = _models_generator__WEBPACK_IMPORTED_MODULE_0__.getSuppressedConditionalIds(parts),
                _models_generator__WE2 = _slicedToArray(_models_generator__WE, 2),
                suppressedNormal = _models_generator__WE2[0],
                suppressedJudgement = _models_generator__WE2[1];

            var normalExtractor = _models_generator__WEBPACK_IMPORTED_MODULE_0__.normalExtractor();

            var judgementExtractor = _models_generator__WEBPACK_IMPORTED_MODULE_0__.judgementExtractor();

            var report = _models_generator__WEBPACK_IMPORTED_MODULE_0__.makeText(parts, normalExtractor, suppressedNormal);

            var judgement = _models_generator__WEBPACK_IMPORTED_MODULE_0__.makeText(parts, judgementExtractor, suppressedJudgement);

            return [report, judgement];
          }
        }, {
          key: "makeNormal",
          value: function makeNormal(parts) {
            var _iterator8 = _createForOfIteratorHelper(parts),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var p = _step8.value;

                if (p.kind === "category") {
                  _models_generator__WEBPACK_IMPORTED_MODULE_0__.makeNormalCategory(p);
                }
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
          }
        }]);

        return _DataParserService;
      }();

      _DataParserService.ɵfac = function DataParserService_Factory(t) {
        return new (t || _DataParserService)();
      };

      _DataParserService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
        token: _DataParserService,
        factory: _DataParserService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    4110:
    /*!**************************************************!*\
      !*** ./src/app/core/services/display.service.ts ***!
      \**************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DisplayService": function DisplayService() {
          return (
            /* binding */
            _DisplayService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      79661);

      var NAVBAR_HEADER_TOGGLE_1 = "main";
      var NAVBAR_HEADER_TOGGLE_2 = "login";

      var _DisplayService = /*#__PURE__*/function () {
        function _DisplayService(router) {
          _classCallCheck(this, _DisplayService);

          this.router = router;
          this.displayHeader = true;
        }

        _createClass(_DisplayService, [{
          key: "updateDisplay",
          value: function updateDisplay() {
            this.displayHeader = !(this.router.url.includes(NAVBAR_HEADER_TOGGLE_1) || this.router.url.includes(NAVBAR_HEADER_TOGGLE_2));
          }
        }]);

        return _DisplayService;
      }();

      _DisplayService.ɵfac = function DisplayService_Factory(t) {
        return new (t || _DisplayService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
      };

      _DisplayService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _DisplayService,
        factory: _DisplayService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    77:
    /*!********************************************************!*\
      !*** ./src/app/core/services/files-sorting.service.ts ***!
      \********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FilesSortingService": function FilesSortingService() {
          return (
            /* binding */
            _FilesSortingService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _FilesSortingService = /*#__PURE__*/function () {
        function _FilesSortingService() {
          _classCallCheck(this, _FilesSortingService);

          this.identifier = new RegExp("thisShouldNotMatchAnything");
        }

        _createClass(_FilesSortingService, [{
          key: "setIdentifier",
          value: function setIdentifier(id) {
            // TODO: Currently only string + n integers possible, make more options available
            var nIntegers = id.split("*").length - 1;
            var preString = id.split("*").join("");
            this.identifier = new RegExp("^" + preString + "\\d{" + nIntegers + "}" + "\\D");
          } // searches for the identifier in filenames and returns boolean value based on if a match is found or not

        }, {
          key: "identifierSearch",
          value: function identifierSearch(files) {
            var _this2 = this;

            return files.map(function (file) {
              return _this2.identifier.test(file.name);
            });
          }
        }, {
          key: "fileMatchSearch",
          value: function fileMatchSearch(baseFiles, checkFiles) {
            var _this3 = this;

            return checkFiles.map(function (file) {
              return baseFiles.some(function (baseFile) {
                var match = baseFile.name.match(_this3.identifier);

                if (match !== undefined) {
                  var id = match[0];
                  return file.name.includes(id);
                } else {
                  return false;
                }
              });
            });
          }
        }, {
          key: "getFileTuples",
          value: function getFileTuples(baseFiles, checkFiles1, checkFiles2) {
            if (checkFiles1 === undefined) {
              checkFiles1 = [];
            }

            if (checkFiles2 === undefined) {
              checkFiles2 = [];
            }

            var result = [];

            var _iterator9 = _createForOfIteratorHelper(baseFiles),
                _step9;

            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var baseFile = _step9.value;
                var match = baseFile.name.match(this.identifier);

                if (match !== undefined) {
                  (function () {
                    var id = match[0];
                    var checkFile1 = checkFiles1.find(function (file) {
                      return file.name.includes(id);
                    });
                    var checkFile2 = checkFiles2.find(function (file) {
                      return file.name.includes(id);
                    });
                    result.push([baseFile, checkFile1, checkFile2]); // TODO: Maybe add removal of already pushed files
                  })();
                }
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }

            return result;
          }
        }]);

        return _FilesSortingService;
      }();

      _FilesSortingService.ɵfac = function FilesSortingService_Factory(t) {
        return new (t || _FilesSortingService)();
      };

      _FilesSortingService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _FilesSortingService,
        factory: _FilesSortingService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    17229:
    /*!*******************************************************!*\
      !*** ./src/app/core/services/input-parser.service.ts ***!
      \*******************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "InputParserService": function InputParserService() {
          return (
            /* binding */
            _InputParserService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _helpers_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../helpers/util */
      26545);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _InputParserService = /*#__PURE__*/function () {
        function _InputParserService() {
          _classCallCheck(this, _InputParserService);

          this.selectableKeywords = [];
          this.variableKeywords = [];
          this.foundKeywords = [];
          this.foundVariables = new Map();
        }

        _createClass(_InputParserService, [{
          key: "init",
          value: function init(rootEl) {
            this.varKeyDictionary = new Map();
            this.initializeKeywords(rootEl);
            this.initializeDictionary();
          }
        }, {
          key: "autocorrect",
          value: function autocorrect(inputString) {
            var possibleWords = Array.from(this.primaryDictionary);
            var inputSplit = inputString.split(" ");
            inputSplit.forEach(function (word, idx) {
              var distances = possibleWords.map(function (possibleWord) {
                return (0, _helpers_util__WEBPACK_IMPORTED_MODULE_0__.levenshtein)(word.toLowerCase(), possibleWord.toLocaleLowerCase());
              });

              if (!distances.includes(0)) {
                if (word.length >= 3 && word.length < 8) {
                  if (distances.includes(1)) {
                    var replacement = distances.indexOf(1);
                    inputSplit[idx] = possibleWords[replacement];
                  }
                } else if (word.length >= 8) {
                  if (distances.includes(1)) {
                    var _replacement = distances.indexOf(1);

                    inputSplit[idx] = possibleWords[_replacement];
                  } else if (distances.includes(2)) {
                    var _replacement2 = distances.indexOf(2);

                    inputSplit[idx] = possibleWords[_replacement2];
                  }
                }
              }
            });
            return inputSplit.join(" ");
          } // Takes list of Selectables from a category and converts their variables into Keywords and adds them to the varKeyDict

        }, {
          key: "extractVariableKeywords",
          value: function extractVariableKeywords(selectables, category) {
            var varKeys;
            var id;

            var _iterator10 = _createForOfIteratorHelper(selectables),
                _step10;

            try {
              for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                var sel = _step10.value;

                if (sel.kind === "box") {
                  id = category + sel.name;
                  varKeys = this.getVariableKeywords(sel.variables, category, sel.name);

                  if (varKeys.length > 0) {
                    this.varKeyDictionary.set(id, varKeys);
                  }
                } else if (sel.kind === "group") {
                  var _iterator11 = _createForOfIteratorHelper(sel.options),
                      _step11;

                  try {
                    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                      var option = _step11.value;
                      id = category + option.name;
                      varKeys = this.getVariableKeywords(option.variables, category, option.name);

                      if (varKeys.length > 0) {
                        this.varKeyDictionary.set(id, varKeys);
                      }
                    }
                  } catch (err) {
                    _iterator11.e(err);
                  } finally {
                    _iterator11.f();
                  }
                }
              }
            } catch (err) {
              _iterator10.e(err);
            } finally {
              _iterator10.f();
            }
          } // Takes list of variables and generates Keyword Variables list

        }, {
          key: "getVariableKeywords",
          value: function getVariableKeywords(variables, category, selectable) {
            var varKeys = [];

            var _iterator12 = _createForOfIteratorHelper(variables),
                _step12;

            try {
              for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                var variable = _step12.value;

                if (variable.kind === "oc" || variable.kind === "mc") {
                  for (var i = 0; i < variable.values.length; i++) {
                    var name = void 0;

                    if (variable.kind === "mc") {
                      name = variable.values[i][0];
                    } else {
                      name = variable.values[i];
                    }

                    var _iterator13 = _createForOfIteratorHelper(variable.keys[i]),
                        _step13;

                    try {
                      for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                        var key = _step13.value;
                        varKeys.push({
                          category: category,
                          selectable: selectable,
                          id: variable.id,
                          kind: variable.kind,
                          name: name,
                          synonym: key,
                          textBefore: variable.textBefore,
                          textAfter: variable.textAfter,
                          position: -1,
                          active: false
                        });
                      }
                    } catch (err) {
                      _iterator13.e(err);
                    } finally {
                      _iterator13.f();
                    }
                  }
                } else {
                  varKeys.push({
                    category: category,
                    selectable: selectable,
                    id: variable.id,
                    kind: variable.kind,
                    textBefore: variable.textBefore,
                    textAfter: variable.textAfter,
                    position: -1,
                    active: false
                  });
                }
              }
            } catch (err) {
              _iterator12.e(err);
            } finally {
              _iterator12.f();
            }

            return varKeys;
          } // Finds all KeySelectables in an input string

        }, {
          key: "findKeywords",
          value: function findKeywords(input) {
            var foundKeywordsTemp = [];

            var _iterator14 = _createForOfIteratorHelper(this.selectableKeywords),
                _step14;

            try {
              for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                var keyword = _step14.value;
                var positions = (0, _helpers_util__WEBPACK_IMPORTED_MODULE_0__.getAllIndexOf)(keyword.synonym, input, false);

                if (positions.length >= 1) {
                  var _iterator15 = _createForOfIteratorHelper(positions),
                      _step15;

                  try {
                    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                      var pos = _step15.value;
                      var keywordWithPos = JSON.parse(JSON.stringify(keyword));
                      keywordWithPos.position = pos;
                      foundKeywordsTemp.push(keywordWithPos);
                    }
                  } catch (err) {
                    _iterator15.e(err);
                  } finally {
                    _iterator15.f();
                  }
                }
              }
            } catch (err) {
              _iterator14.e(err);
            } finally {
              _iterator14.f();
            }

            foundKeywordsTemp = this.filterOverlap(foundKeywordsTemp);
            foundKeywordsTemp.sort(this.compareKeywords);
            this.foundKeywords = foundKeywordsTemp;
          }
        }, {
          key: "findVariableKeywords",
          value: function findVariableKeywords(input, keySel, relativePosition) {
            var id = keySel.category + keySel.synonym;
            var foundVariablesTemp = [];
            var possibleVariables = this.varKeyDictionary.get(id);

            var _iterator16 = _createForOfIteratorHelper(possibleVariables),
                _step16;

            try {
              for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                var varKey = _step16.value;

                if (varKey.kind === "oc" || varKey.kind === "mc") {
                  var positions = (0, _helpers_util__WEBPACK_IMPORTED_MODULE_0__.getAllIndexOf)(varKey.synonym, input, false);

                  if (positions.length >= 1) {
                    var _iterator17 = _createForOfIteratorHelper(positions),
                        _step17;

                    try {
                      for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
                        var pos = _step17.value;
                        var varKeyWithPos = JSON.parse(JSON.stringify(varKey));
                        varKeyWithPos.position = pos + relativePosition;
                        foundVariablesTemp.push(varKeyWithPos);
                      }
                    } catch (err) {
                      _iterator17.e(err);
                    } finally {
                      _iterator17.f();
                    }
                  }
                } else if (varKey.kind === "text" || varKey.kind === "number") {
                  if (varKey.textAfter.length > 0) {
                    var posVar = input.indexOf(varKey.textBefore);
                    var posValueStart = posVar + varKey.textBefore.length;
                    var posValueEnd = input.indexOf(varKey.textAfter);
                    var value = input.substring(posValueStart, posValueEnd).trim();
                  }
                } else if (varKey.kind === "ratio") {} else if (varKey.kind === "date") {}
              }
            } catch (err) {
              _iterator16.e(err);
            } finally {
              _iterator16.f();
            }

            foundVariablesTemp.sort(this.compareKeywords);
            this.varKeyDictionary.set(id, foundVariablesTemp);
          } // Removes all synonyms/keywords that are substrings of another synonym/keyword

        }, {
          key: "filterOverlap",
          value: function filterOverlap(foundKeywords) {
            // filters out keyword synonyms that are substrings of another keyword
            var fKCopy = JSON.parse(JSON.stringify(foundKeywords));
            var toRemove = [];

            var _iterator18 = _createForOfIteratorHelper(fKCopy),
                _step18;

            try {
              var _loop = function _loop() {
                var keyword = _step18.value;
                var overlap = fKCopy.filter(function (kw) {
                  return keyword.synonym !== kw.synonym && keyword.position <= kw.position && kw.position < keyword.position + keyword.synonym.length;
                });
                toRemove = toRemove.concat(overlap);
              };

              for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
                _loop();
              }
            } catch (err) {
              _iterator18.e(err);
            } finally {
              _iterator18.f();
            }

            var _iterator19 = _createForOfIteratorHelper(toRemove),
                _step19;

            try {
              for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
                var removable = _step19.value;
                fKCopy.splice(fKCopy.indexOf(removable), 1);
              }
            } catch (err) {
              _iterator19.e(err);
            } finally {
              _iterator19.f();
            }

            return fKCopy;
          } // sorts keywords based on their position in the input string

        }, {
          key: "compareKeywords",
          value: function compareKeywords(arg1, arg2) {
            if (arg1.position > arg2.position) {
              return 1;
            } else if (arg1.position < arg2.position) {
              return -1;
            } else {
              return 0;
            }
          }
        }, {
          key: "splitInputFromKeywords",
          value: function splitInputFromKeywords(input) {
            var result = [];
            var resultWithoutKeywords = [];
            var lastPosition = 0;
            var tempString;

            var _iterator20 = _createForOfIteratorHelper(this.foundKeywords),
                _step20;

            try {
              for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
                var keyword = _step20.value;

                if (keyword.position > lastPosition) {
                  tempString = input.substring(lastPosition, keyword.position).trim();

                  if (tempString.length > 0) {
                    result.push(tempString);
                    resultWithoutKeywords.push(tempString);
                  }
                }

                tempString = input.substring(keyword.position, keyword.position + keyword.synonym.length).trim();

                if (tempString.length > 0) {
                  result.push(tempString);
                }

                lastPosition = keyword.position + keyword.synonym.length;
              }
            } catch (err) {
              _iterator20.e(err);
            } finally {
              _iterator20.f();
            }

            return [result, resultWithoutKeywords];
          }
        }, {
          key: "initializeKeywords",
          value: function initializeKeywords(rootEl) {
            var selKeys = [];

            var _iterator21 = _createForOfIteratorHelper(rootEl),
                _step21;

            try {
              for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
                var el = _step21.value;

                if (el.kind === "category") {
                  var tempSelectables = this.getSelectableKeywords(el.selectables, el.name);
                  selKeys = selKeys.concat(tempSelectables);
                  this.extractVariableKeywords(el.selectables, el.name);
                }
              }
            } catch (err) {
              _iterator21.e(err);
            } finally {
              _iterator21.f();
            }

            this.selectableKeywords = selKeys;
          }
        }, {
          key: "initializeDictionary",
          value: function initializeDictionary() {
            var _this4 = this;

            this.primaryDictionary = new Set();
            this.primaryDictionary.add("Rest");
            this.primaryDictionary.add("normal");

            var _iterator22 = _createForOfIteratorHelper(this.selectableKeywords),
                _step22;

            try {
              for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
                var selKey = _step22.value;
                var split = selKey.synonym.split(" ");
                split.forEach(function (word) {
                  return _this4.primaryDictionary.add(word);
                });
              }
            } catch (err) {
              _iterator22.e(err);
            } finally {
              _iterator22.f();
            }

            var _iterator23 = _createForOfIteratorHelper(this.variableKeywords),
                _step23;

            try {
              for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
                var varKey = _step23.value;

                if (varKey.synonym) {
                  var _split = varKey.synonym.split(" ");

                  _split.forEach(function (word) {
                    return _this4.primaryDictionary.add(word);
                  });
                }

                if (varKey.textAfter) {
                  var _split2 = varKey.textAfter.split(" ");

                  _split2.forEach(function (word) {
                    return _this4.primaryDictionary.add(word);
                  });
                }

                if (varKey.textBefore) {
                  var _split3 = varKey.textBefore.split(" ");

                  _split3.forEach(function (word) {
                    return _this4.primaryDictionary.add(word);
                  });
                }
              }
            } catch (err) {
              _iterator23.e(err);
            } finally {
              _iterator23.f();
            }
          } // Creates list of Keywords for Selectables from Selectables of category

        }, {
          key: "getSelectableKeywords",
          value: function getSelectableKeywords(selectables, category) {
            var selKeys = [];

            var _iterator24 = _createForOfIteratorHelper(selectables),
                _step24;

            try {
              for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
                var sel = _step24.value;

                if (sel.kind === "box") {
                  var _iterator25 = _createForOfIteratorHelper(sel.keys),
                      _step25;

                  try {
                    for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
                      var synonym = _step25.value;
                      selKeys.push({
                        name: sel.name,
                        synonym: synonym,
                        category: category,
                        position: -1,
                        active: false
                      });
                    }
                  } catch (err) {
                    _iterator25.e(err);
                  } finally {
                    _iterator25.f();
                  }
                } else if (sel.kind === "group") {
                  var _iterator26 = _createForOfIteratorHelper(sel.options),
                      _step26;

                  try {
                    for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
                      var option = _step26.value;

                      var _iterator27 = _createForOfIteratorHelper(option.keys),
                          _step27;

                      try {
                        for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
                          var _synonym = _step27.value;
                          selKeys.push({
                            name: option.name,
                            synonym: _synonym,
                            category: category,
                            group: sel.name,
                            position: -1,
                            active: false
                          });
                        }
                      } catch (err) {
                        _iterator27.e(err);
                      } finally {
                        _iterator27.f();
                      }
                    }
                  } catch (err) {
                    _iterator26.e(err);
                  } finally {
                    _iterator26.f();
                  }
                }
              }
            } catch (err) {
              _iterator24.e(err);
            } finally {
              _iterator24.f();
            }

            return selKeys;
          }
        }]);

        return _InputParserService;
      }();

      _InputParserService.ɵfac = function InputParserService_Factory(t) {
        return new (t || _InputParserService)();
      };

      _InputParserService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _InputParserService,
        factory: _InputParserService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    94755:
    /*!*****************************************************!*\
      !*** ./src/app/core/services/mat-dialog.service.ts ***!
      \*****************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "MatDialogService": function MatDialogService() {
          return (
            /* binding */
            _MatDialogService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/material/dialog */
      18931);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _MatDialogService = /*#__PURE__*/function () {
        function _MatDialogService() {
          _classCallCheck(this, _MatDialogService);
        }

        _createClass(_MatDialogService, [{
          key: "defaultConfig",
          value: function defaultConfig(width, data) {
            var dialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__.MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.hasBackdrop = true;

            if (width !== undefined) {
              dialogConfig.width = width;
            }

            if (data !== undefined) {
              dialogConfig.data = data;
            }

            return dialogConfig;
          }
        }]);

        return _MatDialogService;
      }();

      _MatDialogService.ɵfac = function MatDialogService_Factory(t) {
        return new (t || _MatDialogService)();
      };

      _MatDialogService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _MatDialogService,
        factory: _MatDialogService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    79524:
    /*!*************************************************!*\
      !*** ./src/app/core/services/popout.service.ts ***!
      \*************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "PopoutService": function PopoutService() {
          return (
            /* binding */
            _PopoutService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/cdk/portal */
      16529);
      /* harmony import */


      var _popout_tokens__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./popout.tokens */
      36366);
      /* harmony import */


      var _app_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/shared */
      51679);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _PopoutService = /*#__PURE__*/function () {
        function _PopoutService(injector, componentFactoryResolver, applicationRef) {
          _classCallCheck(this, _PopoutService);

          this.injector = injector;
          this.componentFactoryResolver = componentFactoryResolver;
          this.applicationRef = applicationRef;
        }

        _createClass(_PopoutService, [{
          key: "openPopoutModal",
          value: function openPopoutModal(data) {
            var _this5 = this;

            var windowInstance = this.openOnce("assets/modal/popout.html", "MODAL_POPOUT"); // Wait for window instance to be created

            setTimeout(function () {
              _this5.createCDKPortal(data, windowInstance);
            }, 1000);
          }
        }, {
          key: "openOnce",
          value: function openOnce(url, target) {
            // Open a blank "target" window
            // or get the reference to the existing "target" window
            var winRef = window.open("", target, "", true); // If the "target" window was just opened, change its url

            if (winRef.location.href === "about:blank") {
              winRef.location.href = url;
            }

            return winRef;
          }
        }, {
          key: "createCDKPortal",
          value: function createCDKPortal(data, windowInstance) {
            var _this6 = this;

            if (windowInstance) {
              // Create a PortalOutlet with the body of the new window document
              var outlet = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.DomPortalOutlet(windowInstance.document.body, this.componentFactoryResolver, this.applicationRef, this.injector); // Copy stylesheet link from parent window

              this.styleSheetElement = this.getStyleSheetElement();
              windowInstance.document.head.appendChild(this.styleSheetElement);

              this.styleSheetElement.onload = function () {
                // Clear popout modal content
                windowInstance.document.body.innerText = ""; // Create an injector with modal data

                var injector = _this6.createInjector(data); // Attach the portal


                windowInstance.document.title = "Image Display";

                var componentInstance = _this6.attachContainer(outlet, injector);

                _popout_tokens__WEBPACK_IMPORTED_MODULE_0__.POPOUT_MODALS.windowInstance = windowInstance;
                _popout_tokens__WEBPACK_IMPORTED_MODULE_0__.POPOUT_MODALS.outlet = outlet;
                _popout_tokens__WEBPACK_IMPORTED_MODULE_0__.POPOUT_MODALS.componentInstance = componentInstance;
              };
            }
          }
        }, {
          key: "isPopoutWindowOpen",
          value: function isPopoutWindowOpen() {
            return _popout_tokens__WEBPACK_IMPORTED_MODULE_0__.POPOUT_MODALS.windowInstance && !_popout_tokens__WEBPACK_IMPORTED_MODULE_0__.POPOUT_MODALS.windowInstance.closed;
          }
        }, {
          key: "focusPopoutWindow",
          value: function focusPopoutWindow() {
            _popout_tokens__WEBPACK_IMPORTED_MODULE_0__.POPOUT_MODALS.windowInstance.focus();
          }
        }, {
          key: "closePopoutModal",
          value: function closePopoutModal() {
            if (_popout_tokens__WEBPACK_IMPORTED_MODULE_0__.POPOUT_MODALS.windowInstance) {
              _popout_tokens__WEBPACK_IMPORTED_MODULE_0__.POPOUT_MODALS.windowInstance.close();
            }
          }
        }, {
          key: "attachContainer",
          value: function attachContainer(outlet, injector) {
            var containerPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.ComponentPortal(_app_shared__WEBPACK_IMPORTED_MODULE_1__.ImageDisplayComponent, null, injector);
            var containerRef = outlet.attach(containerPortal);
            return containerRef.instance;
          }
        }, {
          key: "createInjector",
          value: function createInjector(data) {
            var injectionTokens = new WeakMap();
            injectionTokens.set(_popout_tokens__WEBPACK_IMPORTED_MODULE_0__.POPOUT_MODAL_DATA, data);
            return new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.PortalInjector(this.injector, injectionTokens);
          }
        }, {
          key: "getStyleSheetElement",
          value: function getStyleSheetElement() {
            var styleSheetElement = document.createElement("link");
            document.querySelectorAll("link").forEach(function (htmlElement) {
              if (htmlElement.rel === "stylesheet") {
                var absoluteUrl = new URL(htmlElement.href).href;
                styleSheetElement.rel = "stylesheet";
                styleSheetElement.href = absoluteUrl;
              }
            });
            return styleSheetElement;
          }
        }]);

        return _PopoutService;
      }();

      _PopoutService.ɵfac = function PopoutService_Factory(t) {
        return new (t || _PopoutService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ComponentFactoryResolver), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ApplicationRef));
      };

      _PopoutService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: _PopoutService,
        factory: _PopoutService.ɵfac
      });
      /***/
    },

    /***/
    36366:
    /*!************************************************!*\
      !*** ./src/app/core/services/popout.tokens.ts ***!
      \************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "POPOUT_MODAL_DATA": function POPOUT_MODAL_DATA() {
          return (
            /* binding */
            _POPOUT_MODAL_DATA
          );
        },

        /* harmony export */
        "POPOUT_MODALS": function POPOUT_MODALS() {
          return (
            /* binding */
            _POPOUT_MODALS
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _POPOUT_MODAL_DATA = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("POPOUT_MODAL_DATA");

      var _POPOUT_MODALS = {};
      /***/
    },

    /***/
    88386:
    /*!***********************************************!*\
      !*** ./src/app/core/services/user.service.ts ***!
      \***********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "UserService": function UserService() {
          return (
            /* binding */
            _UserService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../environments/environment */
      92340);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common/http */
      34301);

      var _UserService = /*#__PURE__*/function () {
        function _UserService(http) {
          _classCallCheck(this, _UserService);

          this.http = http;
        }

        _createClass(_UserService, [{
          key: "getAll",
          value: function getAll() {
            return this.http.get("".concat(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.backend, "/users"));
          }
        }, {
          key: "getById",
          value: function getById(id) {
            return this.http.get("".concat(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.backend, "/users/").concat(id));
          }
        }]);

        return _UserService;
      }();

      _UserService.ɵfac = function UserService_Factory(t) {
        return new (t || _UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
      };

      _UserService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _UserService,
        factory: _UserService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    51975:
    /*!****************************************************************************!*\
      !*** ./src/app/feature/account-management/account-management.component.ts ***!
      \****************************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AccountManagementComponent": function AccountManagementComponent() {
          return (
            /* binding */
            _AccountManagementComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _AccountManagementComponent = /*#__PURE__*/function () {
        function _AccountManagementComponent() {
          _classCallCheck(this, _AccountManagementComponent);
        }

        _createClass(_AccountManagementComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _AccountManagementComponent;
      }();

      _AccountManagementComponent.ɵfac = function AccountManagementComponent_Factory(t) {
        return new (t || _AccountManagementComponent)();
      };

      _AccountManagementComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _AccountManagementComponent,
        selectors: [["app-account-management"]],
        decls: 2,
        vars: 0,
        template: function AccountManagementComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "account-management works!");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhY2NvdW50LW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyJ9 */"]
      });
      /***/
    },

    /***/
    40828:
    /*!*******************************************!*\
      !*** ./src/app/feature/feature.module.ts ***!
      \*******************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FeatureModule": function FeatureModule() {
          return (
            /* binding */
            _FeatureModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      40093);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/router */
      79661);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/forms */
      59298);
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      95684);
      /* harmony import */


      var _app_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/shared/shared.module */
      44466);
      /* harmony import */


      var _app_feature_judge_mat_judge_mat_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/feature/judge-mat/judge-mat.component */
      46764);
      /* harmony import */


      var _app_feature_list_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @app/feature/list/list.component */
      97948);
      /* harmony import */


      var _app_feature_list_material_list_material_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @app/feature/list-material/list-material.component */
      84006);
      /* harmony import */


      var _app_feature_ui_base_ui_base_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @app/feature/ui-base/ui-base.component */
      82786);
      /* harmony import */


      var _account_management_account_management_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./account-management/account-management.component */
      51975);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _FeatureModule = function _FeatureModule() {
        _classCallCheck(this, _FeatureModule);
      };

      _FeatureModule.ɵfac = function FeatureModule_Factory(t) {
        return new (t || _FeatureModule)();
      };

      _FeatureModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
        type: _FeatureModule
      });
      _FeatureModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__.NgbModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, _app_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](_FeatureModule, {
          declarations: [_app_feature_judge_mat_judge_mat_component__WEBPACK_IMPORTED_MODULE_1__.JudgeMatComponent, _app_feature_list_list_component__WEBPACK_IMPORTED_MODULE_2__.ListComponent, _app_feature_list_material_list_material_component__WEBPACK_IMPORTED_MODULE_3__.ListMaterialComponent, _app_feature_ui_base_ui_base_component__WEBPACK_IMPORTED_MODULE_4__.UiBaseComponent, _account_management_account_management_component__WEBPACK_IMPORTED_MODULE_5__.AccountManagementComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__.NgbModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, _app_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule],
          exports: [_app_feature_judge_mat_judge_mat_component__WEBPACK_IMPORTED_MODULE_1__.JudgeMatComponent, _app_feature_list_list_component__WEBPACK_IMPORTED_MODULE_2__.ListComponent, _app_feature_list_material_list_material_component__WEBPACK_IMPORTED_MODULE_3__.ListMaterialComponent, _app_feature_ui_base_ui_base_component__WEBPACK_IMPORTED_MODULE_4__.UiBaseComponent, _account_management_account_management_component__WEBPACK_IMPORTED_MODULE_5__.AccountManagementComponent]
        });
      })();
      /***/

    },

    /***/
    35292:
    /*!**********************************!*\
      !*** ./src/app/feature/index.ts ***!
      \**********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "JudgeMatComponent": function JudgeMatComponent() {
          return (
            /* reexport safe */
            _judge_mat_judge_mat_component__WEBPACK_IMPORTED_MODULE_0__.JudgeMatComponent
          );
        },

        /* harmony export */
        "ListComponent": function ListComponent() {
          return (
            /* reexport safe */
            _list_list_component__WEBPACK_IMPORTED_MODULE_1__.ListComponent
          );
        },

        /* harmony export */
        "ListMaterialComponent": function ListMaterialComponent() {
          return (
            /* reexport safe */
            _list_material_list_material_component__WEBPACK_IMPORTED_MODULE_2__.ListMaterialComponent
          );
        },

        /* harmony export */
        "UiBaseComponent": function UiBaseComponent() {
          return (
            /* reexport safe */
            _ui_base_ui_base_component__WEBPACK_IMPORTED_MODULE_3__.UiBaseComponent
          );
        },

        /* harmony export */
        "AccountManagementComponent": function AccountManagementComponent() {
          return (
            /* reexport safe */
            _account_management_account_management_component__WEBPACK_IMPORTED_MODULE_4__.AccountManagementComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _judge_mat_judge_mat_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./judge-mat/judge-mat.component */
      46764);
      /* harmony import */


      var _list_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./list/list.component */
      97948);
      /* harmony import */


      var _list_material_list_material_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./list-material/list-material.component */
      84006);
      /* harmony import */


      var _ui_base_ui_base_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./ui-base/ui-base.component */
      82786);
      /* harmony import */


      var _account_management_account_management_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./account-management/account-management.component */
      51975);
      /***/

    },

    /***/
    46764:
    /*!**********************************************************!*\
      !*** ./src/app/feature/judge-mat/judge-mat.component.ts ***!
      \**********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "JudgeMatComponent": function JudgeMatComponent() {
          return (
            /* binding */
            _JudgeMatComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _app_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/models */
      42139);
      /* harmony import */


      var _app_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/core */
      3825);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      79661);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      40093);
      /* harmony import */


      var _app_shared_report_report_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @app/shared/report/report.component */
      94292);
      /* harmony import */


      var _app_shared_options_options_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @app/shared/options/options.component */
      75560);

      function JudgeMatComponent_div_11_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-report", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "app-options", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("clickEvent", function JudgeMatComponent_div_11_Template_app_options_clickEvent_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r1.onClick();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("report", ctx_r0.report)("judgement", ctx_r0.judgement);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("categories", ctx_r0.categories);
        }
      }

      var _c0 = function _c0() {
        return ["/", "listMat"];
      };

      var _JudgeMatComponent = /*#__PURE__*/function () {
        function _JudgeMatComponent(backendCaller, route, router, dataParser, popoutService, authenticationService) {
          _classCallCheck(this, _JudgeMatComponent);

          this.backendCaller = backendCaller;
          this.route = route;
          this.router = router;
          this.dataParser = dataParser;
          this.popoutService = popoutService;
          this.authenticationService = authenticationService;
          this.report = "";
          this.judgement = "";
        }

        _createClass(_JudgeMatComponent, [{
          key: "onWindowClose",
          value: function onWindowClose(event) {
            this.popoutService.closePopoutModal();
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this7 = this;

            this.authenticationService.user.subscribe(function (x) {
              return _this7.user = x;
            });
            this.getData();
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.popoutService.closePopoutModal();
          }
        }, {
          key: "getData",
          value: function getData() {
            var _this8 = this;

            this.route.paramMap.subscribe(function (ps) {
              if (ps.has("id")) {
                var matID = ps.get("id");

                _this8.backendCaller.getMaterialById(matID).subscribe(function (material) {
                  if (material === undefined) {
                    window.alert("Der Eintrag mit dieser ID existiert nicht! " + "Bitte zur Aufnahmenliste zurückkehren und eines der dort aufgeführten Aufnahmen auswählen.");
                  } else {
                    _this8.material = material;
                    _this8.categories = _this8.dataParser.extractCategories(_this8.material.template.parts, false);

                    _this8.openImagePopout();
                  }
                });
              }
            });
          }
        }, {
          key: "updateText",
          value: function updateText() {
            var _this$dataParser$make = this.dataParser.makeText(this.material.template.parts);

            var _this$dataParser$make2 = _slicedToArray(_this$dataParser$make, 2);

            this.report = _this$dataParser$make2[0];
            this.judgement = _this$dataParser$make2[1];
          }
        }, {
          key: "resetText",
          value: function resetText() {
            this.report = "";
            this.judgement = "";
          }
        }, {
          key: "onClick",
          value: function onClick() {
            var _this9 = this;

            setTimeout(function () {
              return _this9.updateText();
            }, 1);
          }
        }, {
          key: "makeNormal",
          value: function makeNormal() {
            this.dataParser.makeNormal(this.material.template.parts);
            this.updateText();
            console.log(_app_core__WEBPACK_IMPORTED_MODULE_1__.POPOUT_MODALS.componentInstance);
          }
        }, {
          key: "submit",
          value: function submit() {
            var _this10 = this;

            this.backendCaller.updateMaterial(this.material).subscribe(function (res) {
              window.alert(res.message);

              _this10.router.navigateByUrl("/listMat");
            });
          }
        }, {
          key: "openImagePopout",
          value: function openImagePopout() {
            var restricted = !(this.user.role === _app_models__WEBPACK_IMPORTED_MODULE_0__.Role.Admin || this.user.role === _app_models__WEBPACK_IMPORTED_MODULE_0__.Role.Moderator);
            var modalData = {
              scans: this.material.scans,
              coordinates: this.material.coordinates,
              restricted: restricted
            };
            this.popoutService.openPopoutModal(modalData);
          }
        }]);

        return _JudgeMatComponent;
      }();

      _JudgeMatComponent.ɵfac = function JudgeMatComponent_Factory(t) {
        return new (t || _JudgeMatComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_1__.BackendCallerService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_1__.DataParserService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_1__.PopoutService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService));
      };

      _JudgeMatComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _JudgeMatComponent,
        selectors: [["app-judge-mat"]],
        hostBindings: function JudgeMatComponent_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("beforeunload", function JudgeMatComponent_beforeunload_HostBindingHandler($event) {
              return ctx.onWindowClose($event);
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresolveWindow"]);
          }
        },
        decls: 12,
        vars: 3,
        consts: [[1, "main"], [1, "header"], [1, "buttons"], ["id", "back", "title", "Go back to list", 1, "btn", "btn-outline-secondary", 3, "routerLink"], ["id", "open-images", 1, "btn", "btn-outline-secondary", 3, "click"], ["id", "normal-button", 1, "btn", "btn-outline-secondary", 3, "click"], ["id", "submit", "title", "\xC4nderungen speichern", 1, "btn", "btn-outline-primary", 3, "click"], ["class", "content", 4, "ngIf"], [1, "content"], [1, "report", 3, "report", "judgement"], [1, "options", 3, "categories", "clickEvent"]],
        template: function JudgeMatComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Zur\xFCck");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "button", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function JudgeMatComponent_Template_button_click_5_listener() {
              return ctx.openImagePopout();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Bilder anzeigen");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "button", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function JudgeMatComponent_Template_button_click_7_listener() {
              return ctx.makeNormal();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Rest normal");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "button", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function JudgeMatComponent_Template_button_click_9_listener() {
              return ctx.submit();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Speichern");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, JudgeMatComponent_div_11_Template, 3, 3, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](2, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.categories);
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _app_shared_report_report_component__WEBPACK_IMPORTED_MODULE_2__.ReportComponent, _app_shared_options_options_component__WEBPACK_IMPORTED_MODULE_3__.OptionsComponent],
        styles: [".main[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  background-color: #edf7fc;\n  display: inline-grid;\n  color: black;\n  overflow: hidden;\n}\n\n.header[_ngcontent-%COMP%] {\n  font-size: 120%;\n  font-weight: 700;\n  border-bottom: 1px solid #a8d8f0;\n  height: 47px;\n}\n\n.buttons[_ngcontent-%COMP%] {\n  padding-top: 5px;\n  padding-right: 5px;\n  float: right;\n}\n\n.btn[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n\n#normal-button[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: black;\n}\n\n.content[_ngcontent-%COMP%] {\n  height: 99%;\n  margin: 3px;\n  background-color: white;\n  overflow: hidden;\n  display: grid;\n  grid-template-columns: 20% 80%;\n  grid-column-gap: 5px;\n  grid-template-areas: \"report  options\";\n}\n\n.report[_ngcontent-%COMP%] {\n  grid-area: report;\n  height: 100%;\n  border: 1px solid #a8d8f0;\n  background-color: #edf7fc;\n}\n\n.options[_ngcontent-%COMP%] {\n  grid-area: options;\n  height: 100%;\n  width: 99.5%;\n  border: 1px solid #a8d8f0;\n  overflow-y: scroll;\n  overflow-x: auto;\n  background-color: #edf7fc;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 5px;\n  height: 5px;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  box-shadow: inset 0 0 5px grey;\n  border-radius: 5px;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: grey;\n  border-radius: 0;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #b30000;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImp1ZGdlLW1hdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EseUJBTGlCO0VBTWpCLG9CQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBRkY7O0FBS0E7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQ0FBQTtFQUNBLFlBQUE7QUFGRjs7QUFLQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBRkY7O0FBSUE7RUFDRSxnQkFBQTtBQURGOztBQUdBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0FBQUY7O0FBR0E7RUFDRSxXQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFFQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxvQkFBQTtFQUNBLHNDQUNFO0FBRko7O0FBS0E7RUFDRSxpQkFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQWhEaUI7QUE4Q25COztBQUtBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQTFEaUI7QUF3RG5COztBQUtBLFVBQUE7O0FBQ0E7RUFDRSxVQUFBO0VBQ0EsV0FBQTtBQUZGOztBQUtBLFVBQUE7O0FBQ0E7RUFDRSw4QkFBQTtFQUNBLGtCQUFBO0FBRkY7O0FBS0EsV0FBQTs7QUFDQTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7QUFGRjs7QUFLQSxvQkFBQTs7QUFDQTtFQUNFLG1CQUFBO0FBRkYiLCJmaWxlIjoianVkZ2UtbWF0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJGJvcmRlci1jb2xvcjogaHNsKDIwMCwgNzAlLCA4MCUpO1xyXG4kYmFja2dyb3VuZC1jb2xvcjogaHNsKDIwMiwgNzMlLCA5NiUpO1xyXG5cclxuLm1haW4ge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjtcclxuICBkaXNwbGF5OiBpbmxpbmUtZ3JpZDtcclxuICBjb2xvcjogYmxhY2s7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLmhlYWRlcntcclxuICBmb250LXNpemU6IDEyMCU7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGJvcmRlci1jb2xvcjtcclxuICBoZWlnaHQ6IDQ3cHg7XHJcbn1cclxuXHJcbi5idXR0b25ze1xyXG4gIHBhZGRpbmctdG9wOiA1cHg7XHJcbiAgcGFkZGluZy1yaWdodDogNXB4O1xyXG4gIGZsb2F0OiByaWdodDtcclxufVxyXG4uYnRue1xyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbn1cclxuI25vcm1hbC1idXR0b24ge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmNvbnRlbnQge1xyXG4gIGhlaWdodDogOTklO1xyXG4gIG1hcmdpbjogM3B4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcblxyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAyMCUgODAlO1xyXG4gIGdyaWQtY29sdW1uLWdhcDogNXB4O1xyXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XHJcbiAgICBcInJlcG9ydCAgb3B0aW9uc1wiO1xyXG59XHJcblxyXG4ucmVwb3J0e1xyXG4gIGdyaWQtYXJlYTogcmVwb3J0O1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyLWNvbG9yO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xyXG59XHJcblxyXG4ub3B0aW9uc3tcclxuICBncmlkLWFyZWE6IG9wdGlvbnM7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiA5OS41JTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyLWNvbG9yO1xyXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICBvdmVyZmxvdy14OiBhdXRvO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xyXG59XHJcblxyXG4vKiB3aWR0aCAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICB3aWR0aDogNXB4O1xyXG4gIGhlaWdodDogNXB4O1xyXG59XHJcblxyXG4vKiBUcmFjayAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuICBib3gtc2hhZG93OiBpbnNldCAwIDAgNXB4IGdyZXk7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4vKiBIYW5kbGUgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgYmFja2dyb3VuZDogZ3JleTtcclxuICBib3JkZXItcmFkaXVzOiAwO1xyXG59XHJcblxyXG4vKiBIYW5kbGUgb24gaG92ZXIgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZDogI2IzMDAwMDtcclxufVxyXG4iXX0= */"]
      });
      /***/
    },

    /***/
    84006:
    /*!******************************************************************!*\
      !*** ./src/app/feature/list-material/list-material.component.ts ***!
      \******************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ListMaterialComponent": function ListMaterialComponent() {
          return (
            /* binding */
            _ListMaterialComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _env_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @env/environment */
      92340);
      /* harmony import */


      var _app_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/shared */
      51679);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _app_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @app/core */
      3825);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      79661);
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/dialog */
      18931);
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      95684);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      40093);

      function ListMaterialComponent_div_16_tr_11_ng_container_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "img", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListMaterialComponent_div_16_tr_11_ng_container_6_Template_img_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11);

            var material_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

            return ctx_r9.openEditor(material_r6._id);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var material_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

          var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate3"]("src", "", ctx_r7.imageUrl, "", material_r6.scans.id, "/", material_r6.scans.lateralScan.filename, "", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](material_r6.scans.lateralScan.filename);
        }
      }

      function ListMaterialComponent_div_16_tr_11_ng_container_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "img", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListMaterialComponent_div_16_tr_11_ng_container_8_Template_img_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r15);

            var material_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

            return ctx_r13.openEditor(material_r6._id);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var material_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

          var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate3"]("src", "", ctx_r8.imageUrl, "", material_r6.scans.id, "/", material_r6.scans.preScan.filename, "", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](material_r6.scans.preScan.filename);
        }
      }

      function ListMaterialComponent_div_16_tr_11_Template(rf, ctx) {
        if (rf & 1) {
          var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "td", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "img", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListMaterialComponent_div_16_tr_11_Template_img_click_2_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r18);

            var material_r6 = restoredCtx.$implicit;

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

            return ctx_r17.openEditor(material_r6._id);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "td", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, ListMaterialComponent_div_16_tr_11_ng_container_6_Template, 4, 4, "ng-container", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "td", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, ListMaterialComponent_div_16_tr_11_ng_container_8_Template, 4, 4, "ng-container", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "td", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "table", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "td", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Modalit\xE4t:");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "td", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "td", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Template:");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "td", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "td", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Boxen vorhanden in:");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "td", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "button", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListMaterialComponent_div_16_tr_11_Template_button_click_26_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r18);

            var material_r6 = restoredCtx.$implicit;

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

            return ctx_r19.openEditor(material_r6._id);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, "Start Befundung");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "button", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListMaterialComponent_div_16_tr_11_Template_button_click_28_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r18);

            var material_r6 = restoredCtx.$implicit;

            var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

            return ctx_r20["delete"](material_r6._id, material_r6.scans.id);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29, "Entfernen");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var material_r6 = ctx.$implicit;

          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);

          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate3"]("src", "", ctx_r5.imageUrl, "", material_r6.scans.id, "/", material_r6.scans.mainScan.filename, "", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](material_r6.scans.mainScan.filename);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", material_r6.scans.lateralScan !== undefined)("ngIfElse", _r3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", material_r6.scans.preScan !== undefined)("ngIfElse", _r3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](material_r6.modality);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](material_r6.template.name);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r5.checkBoxes(material_r6.coordinates));
        }
      }

      function ListMaterialComponent_div_16_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "table", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "th", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Frontalaufnahme");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "th", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Lateralaufnahme");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "th", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Voraufnahme");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "th", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Metadaten");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, ListMaterialComponent_div_16_tr_11_Template, 30, 11, "tr", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.materials);
        }
      }

      function ListMaterialComponent_ng_template_17_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Keine Eintr\xE4ge gefunden. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
      }

      function ListMaterialComponent_ng_template_19_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Keine Aufnahme vorhanden");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
      }

      var _ListMaterialComponent = /*#__PURE__*/function () {
        function _ListMaterialComponent(backendCaller, router, dialogService, dialog) {
          _classCallCheck(this, _ListMaterialComponent);

          this.backendCaller = backendCaller;
          this.router = router;
          this.dialogService = dialogService;
          this.dialog = dialog;
          this.imageUrl = _env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.backend + "images/";
          this.materials = [];
        }

        _createClass(_ListMaterialComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.query = {
              judged: false
            };
            this.getData();
          }
        }, {
          key: "getData",
          value: function getData() {
            var _this11 = this;

            this.backendCaller.queryMaterials(this.query).subscribe(function (mats) {
              _this11.materials = mats;
            });
          }
        }, {
          key: "reload",
          value: function reload() {
            this.getData();
          }
        }, {
          key: "changeQuery",
          value: function changeQuery(newValue) {
            this.query = {
              judged: newValue
            };
            this.getData();
          }
        }, {
          key: "checkBoxes",
          value: function checkBoxes(coordinates) {
            var res = [];

            if (coordinates.main.length > 0) {
              res.push("Hauptaufnahme");
            }

            if (coordinates.lateral.length > 0) {
              res.push("Lateralaufnahme");
            }

            if (coordinates.pre.length > 0) {
              res.push("Voraufnahme");
            }

            if (res.length > 0) {
              return res.join(", ");
            } else {
              return "Keiner Aufnahme";
            }
          }
        }, {
          key: "delete",
          value: function _delete(objectID, scanID) {
            var _this12 = this;

            var dialogData = new _app_shared__WEBPACK_IMPORTED_MODULE_1__.ConfirmDialogModel("warning", "Entfernen bestätigen", "Möchten Sie diesen Eintrag wirklich entfernen?");
            var dialogConfig = this.dialogService.defaultConfig("400px", dialogData);
            dialogConfig.position = {
              top: "50px"
            };
            var dialogRef = this.dialog.open(_app_shared__WEBPACK_IMPORTED_MODULE_1__.ConfirmDialogComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(function (dialogResult) {
              if (dialogResult) {
                _this12.backendCaller.deleteMaterial(objectID, scanID).subscribe(function (res) {
                  window.alert("Eintrag erfolgreich gelöscht.");

                  _this12.getData();
                });
              }
            });
          }
        }, {
          key: "openEditor",
          value: function openEditor(matID) {
            this.router.navigate(["/", "mainMat", matID]).then();
          }
        }, {
          key: "openUploadDialog",
          value: function openUploadDialog() {
            var _this13 = this;

            var dialogConfig = this.dialogService.defaultConfig("600px");
            var dialogRef = this.dialog.open(_app_shared__WEBPACK_IMPORTED_MODULE_1__.UploadMaterialComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(function () {
              _this13.reload();
            });
          }
        }]);

        return _ListMaterialComponent;
      }();

      _ListMaterialComponent.ɵfac = function ListMaterialComponent_Factory(t) {
        return new (t || _ListMaterialComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_2__.BackendCallerService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_2__.MatDialogService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialog));
      };

      _ListMaterialComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _ListMaterialComponent,
        selectors: [["app-display-material"]],
        decls: 21,
        vars: 2,
        consts: [[1, "main"], [1, "row"], ["ngbDropdown", "", 1, "d-inline-block"], ["id", "dropdownBasic1", "ngbDropdownToggle", "", 1, "btn", "btn-outline-primary", 2, "margin-right", "10px"], ["ngbDropdownMenu", "", "aria-labelledby", "dropdownBasic1"], ["ngbDropdownItem", "", 3, "click"], ["id", "reloadButton", 1, "btn", "btn-outline-secondary", 3, "click"], ["id", "uploadButton", 1, "btn", "btn-outline-primary", 2, "float", "right", 3, "click"], ["class", "tableDiv", 4, "ngIf", "ngIfElse"], ["noEntry", ""], ["noScan", ""], [1, "tableDiv"], [1, "listMatTable"], [1, "body"], [1, "meta"], [4, "ngFor", "ngForOf"], [1, "img"], ["width", "300px", "alt", "Fehler beim Laden der Aufnahme", 3, "src", "click"], [4, "ngIf", "ngIfElse"], [1, "metatable"], [1, "metadata"], [1, "btn", "btn-outline-primary", "custom-button", 3, "click"], [1, "btn", "btn-danger", "custom-button", 3, "click"], [2, "padding", "10px"], [1, "text"]],
        template: function ListMaterialComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "h4");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Aufnahme zum Befunden ausw\xE4hlen");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "button", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Bereits bearbeitete Eintr\xE4ge anzeigen");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "button", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListMaterialComponent_Template_button_click_8_listener() {
              return ctx.changeQuery(true);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Ja");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "button", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListMaterialComponent_Template_button_click_10_listener() {
              return ctx.changeQuery(false);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Nein");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "button", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListMaterialComponent_Template_button_click_12_listener() {
              return ctx.reload();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Aufnahmen neu Laden");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "button", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListMaterialComponent_Template_button_click_14_listener() {
              return ctx.openUploadDialog();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Aufnahmen hochladen");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, ListMaterialComponent_div_16_Template, 12, 1, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, ListMaterialComponent_ng_template_17_Template, 2, 0, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, ListMaterialComponent_ng_template_19_Template, 2, 0, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](18);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](16);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.materials.length > 0)("ngIfElse", _r1);
          }
        },
        directives: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__.NgbDropdown, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__.NgbDropdownToggle, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__.NgbDropdownMenu, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__.NgbDropdownItem, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf],
        styles: [".main[_ngcontent-%COMP%] {\n  min-height: 90%;\n  height: auto;\n  background-color: #edf7fc;\n  border: 1px solid #a8d8f0;\n  margin: 10px;\n  padding: 20px;\n  border-radius: 5px;\n  width: auto;\n}\n\n.body[_ngcontent-%COMP%], .img[_ngcontent-%COMP%] {\n  border: 1px solid #a8d8f0;\n  text-align: center;\n  font-size: 15pt;\n  width: auto;\n  max-width: 400px;\n  word-break: break-word;\n}\n\n.img[_ngcontent-%COMP%] {\n  padding: 5px;\n  text-align: center;\n}\n\nimg[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.meta[_ngcontent-%COMP%] {\n  text-align: left;\n  white-space: pre-line;\n  padding: 10px;\n  font-size: 15pt;\n  min-width: 150px;\n}\n\n.metatable[_ngcontent-%COMP%] {\n  border-spacing: 10px;\n  border-collapse: separate;\n}\n\n.metadata[_ngcontent-%COMP%] {\n  word-break: break-word;\n}\n\n.custom-button[_ngcontent-%COMP%] {\n  font-size: 15pt;\n  padding: 10px 20px;\n  margin: 5px;\n}\n\n.row[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid #a8d8f0;\n}\n\n.tableDiv[_ngcontent-%COMP%] {\n  margin: 10px;\n  width: auto;\n}\n\n.listMatTable[_ngcontent-%COMP%] {\n  table-layout: fixed;\n  width: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QtbWF0ZXJpYWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUxpQjtFQU1qQix5QkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBRkY7O0FBS0E7RUFDRSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0FBRkY7O0FBS0E7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7QUFGRjs7QUFLQTtFQUNFLGVBQUE7QUFGRjs7QUFLQTtFQUNFLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBRkY7O0FBS0E7RUFDRSxvQkFBQTtFQUNBLHlCQUFBO0FBRkY7O0FBS0E7RUFDRSxzQkFBQTtBQUZGOztBQUtBO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQUZGOztBQUtBO0VBQ0UsYUFBQTtFQUNBLGdDQUFBO0FBRkY7O0FBS0E7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBQUZGOztBQUtBO0VBQ0UsbUJBQUE7RUFDQSxXQUFBO0FBRkYiLCJmaWxlIjoibGlzdC1tYXRlcmlhbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRib3JkZXItY29sb3I6IGhzbCgyMDAsIDcwJSwgODAlKTtcclxuJGJhY2tncm91bmQtY29sb3I6IGhzbCgyMDIsIDczJSwgOTYlKTtcclxuXHJcbi5tYWluIHtcclxuICBtaW4taGVpZ2h0OiA5MCU7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXItY29sb3I7XHJcbiAgbWFyZ2luOiAxMHB4O1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIHdpZHRoOiBhdXRvO1xyXG59XHJcblxyXG4uYm9keSwgLmltZywgIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyLWNvbG9yO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXNpemU6IDE1cHQ7XHJcbiAgd2lkdGg6IGF1dG87XHJcbiAgbWF4LXdpZHRoOiA0MDBweDtcclxuICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xyXG59XHJcblxyXG4uaW1nIHtcclxuICBwYWRkaW5nOiA1cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5pbWcge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLm1ldGEge1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgZm9udC1zaXplOiAxNXB0O1xyXG4gIG1pbi13aWR0aDogMTUwcHg7XHJcbn1cclxuXHJcbi5tZXRhdGFibGUge1xyXG4gIGJvcmRlci1zcGFjaW5nOiAxMHB4O1xyXG4gIGJvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7XHJcbn1cclxuXHJcbi5tZXRhZGF0YSB7XHJcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcclxufVxyXG5cclxuLmN1c3RvbS1idXR0b24ge1xyXG4gIGZvbnQtc2l6ZTogMTVwdDtcclxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XHJcbiAgbWFyZ2luOiA1cHg7XHJcbn1cclxuXHJcbi5yb3cge1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRib3JkZXItY29sb3I7XHJcbn1cclxuXHJcbi50YWJsZURpdiB7XHJcbiAgbWFyZ2luOiAxMHB4O1xyXG4gIHdpZHRoOiBhdXRvO1xyXG59XHJcblxyXG4ubGlzdE1hdFRhYmxlIHtcclxuICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xyXG4gIHdpZHRoOiBhdXRvO1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    97948:
    /*!************************************************!*\
      !*** ./src/app/feature/list/list.component.ts ***!
      \************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ListComponent": function ListComponent() {
          return (
            /* binding */
            _ListComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _app_shared_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/shared/confirm-dialog/confirm-dialog.component */
      22887);
      /* harmony import */


      var _app_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/shared */
      51679);
      /* harmony import */


      var _app_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @app/models */
      42139);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/dialog */
      18931);
      /* harmony import */


      var _app_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @app/core */
      3825);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      40093);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/router */
      79661);

      var _c0 = function _c0(a2) {
        return ["/", "edit", a2];
      };

      function ListComponent_tr_5_button_9_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Edit");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var template_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](1, _c0, template_r3.name));
        }
      }

      function ListComponent_tr_5_button_11_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ListComponent_tr_5_button_11_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10);

            var template_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r8.removeAlert(template_r3._id, template_r3.name);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Entfernen");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }
      }

      var _c1 = function _c1(a2) {
        return ["/", "main", a2];
      };

      function ListComponent_tr_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "td", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ul");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "li");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "td", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "td", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, ListComponent_tr_5_button_9_Template, 2, 3, "button", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "td", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, ListComponent_tr_5_button_11_Template, 2, 0, "button", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var template_r3 = ctx.$implicit;

          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](5, _c1, template_r3._id));

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](template_r3.name);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("vom ", ctx_r0.displayDate(template_r3.timestamp), "");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.isMod);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.isMod);
        }
      }

      function ListComponent_ng_container_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Es wurde noch nichts hochgeladen ");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        }
      }

      function ListComponent_div_7_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "button", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ListComponent_div_7_Template_button_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r11.openUploadDialog();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Schablone hochladen");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Neue Schablone erstellen");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }
      }

      var _ListComponent = /*#__PURE__*/function () {
        function _ListComponent(dialog, backendCaller, dialogService, authenticationService) {
          _classCallCheck(this, _ListComponent);

          this.dialog = dialog;
          this.backendCaller = backendCaller;
          this.dialogService = dialogService;
          this.authenticationService = authenticationService;
          this.templates = [];
        }

        _createClass(_ListComponent, [{
          key: "isMod",
          get: function get() {
            return this.user && (this.user.role === _app_models__WEBPACK_IMPORTED_MODULE_2__.Role.Admin || this.user.role === _app_models__WEBPACK_IMPORTED_MODULE_2__.Role.Moderator);
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this14 = this;

            this.authenticationService.user.subscribe(function (x) {
              return _this14.user = x;
            });
            this.isLoading = true;
            this.update();
          }
        }, {
          key: "update",
          value: function update() {
            var _this15 = this;

            this.backendCaller.getTemplateList().subscribe(function (templates) {
              _this15.templates = templates;
              _this15.isLoading = false;
            });
          }
        }, {
          key: "removeAlert",
          value: function removeAlert(id, name) {
            var _this16 = this;

            var dialogData = new _app_shared_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialogModel("warning", "Entfernen bestätigen", "Möchten Sie die Schablone '" + name + "' wirklich entfernen?");
            var dialogConfig = this.dialogService.defaultConfig("400px", dialogData);
            dialogConfig.position = {
              top: "50px"
            };
            var dialogRef = this.dialog.open(_app_shared_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialogComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(function (dialogResult) {
              if (dialogResult) {
                _this16.remove(id);
              }
            });
          }
        }, {
          key: "remove",
          value: function remove(id) {
            var _this17 = this;

            this.backendCaller.deleteTemplate(id).subscribe(function (res) {
              _this17.update();
            });
          }
        }, {
          key: "displayDate",
          value: function displayDate(date) {
            if (typeof date === "string") {
              date = new Date(date);
            }

            return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
          }
        }, {
          key: "openUploadDialog",
          value: function openUploadDialog() {
            var _this18 = this;

            var dialogConfig = this.dialogService.defaultConfig("470px");
            var dialogRef = this.dialog.open(_app_shared__WEBPACK_IMPORTED_MODULE_1__.UploadComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(function () {
              _this18.update();
            });
          }
        }]);

        return _ListComponent;
      }();

      _ListComponent.ɵfac = function ListComponent_Factory(t) {
        return new (t || _ListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_3__.BackendCallerService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_3__.MatDialogService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_3__.AuthenticationService));
      };

      _ListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _ListComponent,
        selectors: [["app-list"]],
        decls: 8,
        vars: 3,
        consts: [[1, "main"], [1, "liste"], ["class", "list-row", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "buttons", 4, "ngIf"], [1, "list-row"], [1, "text"], [2, "text-decoration", "none", 3, "routerLink"], [1, "button"], ["class", "btn btn-secondary ml-3 disabled", 3, "routerLink", 4, "ngIf"], ["class", "btn btn-danger ml-3", 3, "click", 4, "ngIf"], [1, "btn", "btn-secondary", "ml-3", "disabled", 3, "routerLink"], [1, "btn", "btn-danger", "ml-3", 3, "click"], [1, "buttons"], [1, "btn", "btn-outline-primary", 3, "click"], [1, "btn", "btn-outline-primary", "disabled"]],
        template: function ListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "h4");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Schablone w\xE4hlen");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "table", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ListComponent_tr_5_Template, 12, 7, "tr", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, ListComponent_ng_container_6_Template, 2, 0, "ng-container", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ListComponent_div_7_Template, 5, 0, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.templates);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.templates.length === 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isMod);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLinkWithHref, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink],
        styles: [".list-row[_ngcontent-%COMP%] {\n  vertical-align: baseline;\n}\n\n.main[_ngcontent-%COMP%] {\n  height: 100%;\n  background-color: #edf7fc;\n  border: 1px solid #a8d8f0;\n  margin: 10px;\n  padding: 20px;\n  border-radius: 5px;\n}\n\ntd.text[_ngcontent-%COMP%] {\n  min-width: 100px;\n  padding-right: 15px;\n}\n\ntd.button[_ngcontent-%COMP%] {\n  min-width: 50px;\n  padding-right: 10px;\n}\n\n.buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-evenly;\n  padding-top: 10px;\n  max-width: 400px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx3QkFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSw2QkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFDRiIsImZpbGUiOiJsaXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpc3Qtcm93IHtcclxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XHJcbn1cclxuXHJcbi5tYWluIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIwMiwgNzMlLCA5NiUpO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGhzbCgyMDAsIDcwJSwgODAlKTtcclxuICBtYXJnaW46IDEwcHg7XHJcbiAgcGFkZGluZzogMjBweDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbnRkLnRleHQge1xyXG4gIG1pbi13aWR0aDogMTAwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogMTVweDtcclxufVxyXG5cclxudGQuYnV0dG9uIHtcclxuICBtaW4td2lkdGg6IDUwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogMTBweDtcclxufVxyXG5cclxuLmJ1dHRvbnMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XHJcbiAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgbWF4LXdpZHRoOiA0MDBweDtcclxufVxyXG4iXX0= */"]
      });
      /***/
    },

    /***/
    82786:
    /*!******************************************************!*\
      !*** ./src/app/feature/ui-base/ui-base.component.ts ***!
      \******************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "UiBaseComponent": function UiBaseComponent() {
          return (
            /* binding */
            _UiBaseComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _app_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/shared */
      51679);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common/http */
      34301);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      79661);
      /* harmony import */


      var _app_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/core */
      3825);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      40093);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/platform-browser */
      4919);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/forms */
      59298);
      /* harmony import */


      var _app_shared_report_report_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @app/shared/report/report.component */
      94292);
      /* harmony import */


      var _app_shared_options_options_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @app/shared/options/options.component */
      75560);

      function UiBaseComponent_div_17_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-report", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "app-options", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("clickEvent", function UiBaseComponent_div_17_Template_app_options_clickEvent_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r1.onClick();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("report", ctx_r0.report)("judgement", ctx_r0.judgement);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("categories", ctx_r0.categories);
        }
      }

      var _c0 = function _c0() {
        return ["/", "list"];
      };

      var _UiBaseComponent = /*#__PURE__*/function () {
        function _UiBaseComponent(http, route, dataParser, _location, inputParser, backendCaller, sanitizer) {
          _classCallCheck(this, _UiBaseComponent);

          this.http = http;
          this.route = route;
          this.dataParser = dataParser;
          this._location = _location;
          this.inputParser = inputParser;
          this.backendCaller = backendCaller;
          this.sanitizer = sanitizer;
          this.input = "";
          this.foundKeywords = "";
          this.report = "";
          this.judgement = "";
        }

        _createClass(_UiBaseComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.getData();
            this.foundKeywords = "Detected keywords go here";
          }
        }, {
          key: "getData",
          value: function getData() {
            var _this19 = this;

            this.route.paramMap.subscribe(function (ps) {
              if (ps.has("id")) {
                var templateID = ps.get("id");

                _this19.backendCaller.getTemplateById(templateID).subscribe(function (template) {
                  if (template === undefined) {
                    window.alert("Dieses Dictionary existiert nicht! " + "Bitte auf List Seite zurückkehren und eines der dort aufgeführten Dictionaries auswählen.");
                  } else {
                    _this19.parts = template.parts;
                    _this19.defaultParts = JSON.parse(JSON.stringify(_this19.parts));
                    _this19.categories = _this19.dataParser.extractCategories(_this19.parts, false);

                    _this19.inputParser.init(_this19.defaultParts);
                  }
                });
              }
            });
          }
        }, {
          key: "generateDownloadJson",
          value: function generateDownloadJson(jsonData) {
            var json = JSON.stringify(jsonData);
            this.downJson = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));
          }
        }, {
          key: "updateText",
          value: function updateText() {
            var _this$dataParser$make3 = this.dataParser.makeText(this.parts);

            var _this$dataParser$make4 = _slicedToArray(_this$dataParser$make3, 2);

            this.report = _this$dataParser$make4[0];
            this.judgement = _this$dataParser$make4[1];
          }
        }, {
          key: "resetText",
          value: function resetText() {
            this.report = "";
            this.judgement = "";
          }
        }, {
          key: "onClick",
          value: function onClick() {
            var _this20 = this;

            setTimeout(function () {
              return _this20.updateText();
            }, 1);
          }
        }, {
          key: "onInput",
          value: function onInput(ev) {
            if (this.input[this.input.length - 1] === " ") {
              this.input = this.inputParser.autocorrect(this.input);
            }

            this.inputParser.findKeywords(this.input);

            var _this$inputParser$spl = this.inputParser.splitInputFromKeywords(this.input),
                _this$inputParser$spl2 = _slicedToArray(_this$inputParser$spl, 2),
                splitInput = _this$inputParser$spl2[0],
                splitReducedInput = _this$inputParser$spl2[1];

            console.log(splitInput);
            console.log(splitReducedInput);
          }
        }, {
          key: "makeNormal",
          value: function makeNormal() {
            this.dataParser.makeNormal(this.parts);
            this.updateText();
          }
        }, {
          key: "reset",
          value: function reset() {
            var _this21 = this;

            this.parts = JSON.parse(JSON.stringify(this.defaultParts));
            this.categories = this.dataParser.extractCategories(this.parts, false);
            setTimeout(function () {
              return _this21.optionsComponent.initRows();
            }, 5);
            setTimeout(function () {
              return _this21.resetText();
            }, 5);
          }
        }]);

        return _UiBaseComponent;
      }();

      _UiBaseComponent.ɵfac = function UiBaseComponent_Factory(t) {
        return new (t || _UiBaseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_1__.DataParserService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_1__.InputParserService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_1__.BackendCallerService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.DomSanitizer));
      };

      _UiBaseComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _UiBaseComponent,
        selectors: [["app-workspace"]],
        viewQuery: function UiBaseComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_app_shared__WEBPACK_IMPORTED_MODULE_0__.OptionsComponent, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.optionsComponent = _t.first);
          }
        },
        decls: 18,
        vars: 6,
        consts: [[1, "main"], [1, "header"], [1, "inputArea"], ["for", "input", 1, "inputLabel"], ["id", "input", "name", "Befund", "type", "text", "placeholder", "Befund eingeben...", 1, "inputBox", 3, "ngModel", "ngModelChange", "input"], [1, "buttons"], ["id", "normal-button", 1, "btn", "btn-outline-secondary", 3, "click"], ["id", "reset-button", 1, "btn", "btn-outline-secondary", 3, "click"], ["id", "back", "title", "Go back to list", 1, "btn", "btn-outline-secondary", 3, "routerLink"], ["title", "Download JSON", "download", "befund.json", 1, "btn", "btn-outline-secondary", 3, "href", "click"], ["id", "inputText", 1, "inputText"], ["class", "content", 4, "ngIf"], [1, "content"], [1, "report", 3, "report", "judgement"], [1, "options", 3, "categories", "clickEvent"]],
        template: function UiBaseComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "label", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Eingabe:");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "input", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function UiBaseComponent_Template_input_ngModelChange_5_listener($event) {
              return ctx.input = $event;
            })("input", function UiBaseComponent_Template_input_input_5_listener($event) {
              return ctx.onInput($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "button", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UiBaseComponent_Template_button_click_7_listener() {
              return ctx.makeNormal();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Rest normal");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "button", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UiBaseComponent_Template_button_click_9_listener() {
              return ctx.reset();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Zur\xFCcksetzen");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "button", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Zur\xFCck");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "a", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UiBaseComponent_Template_a_click_13_listener() {
              return ctx.generateDownloadJson(ctx.parts);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Download JSON");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, UiBaseComponent_div_17_Template, 3, 3, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.input);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](5, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("href", ctx.downJson, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx.foundKeywords, " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.categories);
          }
        },
        directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _app_shared_report_report_component__WEBPACK_IMPORTED_MODULE_2__.ReportComponent, _app_shared_options_options_component__WEBPACK_IMPORTED_MODULE_3__.OptionsComponent],
        styles: [".main[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  background-color: #edf7fc;\n  display: inline-grid;\n  color: black;\n  overflow: hidden;\n}\n\n.header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 75% 25%;\n  grid-template-rows: 50% 50%;\n  grid-template-areas: \"inputArea buttons\" \"inputText inputTex\";\n  font-size: 120%;\n  font-weight: 700;\n  text-align: center;\n  border-bottom: 1px solid #a8d8f0;\n  height: 90px;\n}\n\n.inputArea[_ngcontent-%COMP%] {\n  grid-area: inputArea;\n  padding: 5px 10px;\n  float: left;\n}\n\n.inputLabel[_ngcontent-%COMP%] {\n  padding: 5px;\n}\n\n.inputBox[_ngcontent-%COMP%] {\n  padding: 3px;\n  width: 80%;\n}\n\n.buttons[_ngcontent-%COMP%] {\n  grid-area: buttons;\n  padding-top: 5px;\n  padding-right: 5px;\n  width: 100%;\n  float: right;\n}\n\n.btn[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n\n#normal-button[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: black;\n}\n\n.inputText[_ngcontent-%COMP%] {\n  grid-area: inputText;\n  font-weight: 700;\n  font-size: 120%;\n  text-align: center;\n}\n\n.content[_ngcontent-%COMP%] {\n  height: 99%;\n  margin: 3px;\n  background-color: white;\n  overflow: hidden;\n  display: grid;\n  grid-template-columns: 20% 80%;\n  grid-column-gap: 5px;\n  grid-template-areas: \"report  options\";\n}\n\n.report[_ngcontent-%COMP%] {\n  grid-area: report;\n  height: 100%;\n  border: 1px solid #a8d8f0;\n  background-color: #edf7fc;\n  overflow-y: auto;\n}\n\n.options[_ngcontent-%COMP%] {\n  grid-area: options;\n  height: 100%;\n  width: 99.5%;\n  border: 1px solid #a8d8f0;\n  overflow-y: scroll;\n  overflow-x: auto;\n  background-color: #edf7fc;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 5px;\n  height: 5px;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  box-shadow: inset 0 0 5px grey;\n  border-radius: 5px;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: grey;\n  border-radius: 0;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #b30000;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpLWJhc2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUxpQjtFQU1qQixvQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQUZGOztBQU9BO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsMkJBQUE7RUFDQSw2REFDQTtFQUdBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxZQUFBO0FBUEY7O0FBVUE7RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQVBGOztBQVNBO0VBQ0UsWUFBQTtBQU5GOztBQVFBO0VBQ0UsWUFBQTtFQUNBLFVBQUE7QUFMRjs7QUFRQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBTEY7O0FBT0E7RUFDRSxnQkFBQTtBQUpGOztBQU1BO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0FBSEY7O0FBTUE7RUFDRSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBSEY7O0FBVUE7RUFDRSxXQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFFQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxvQkFBQTtFQUNBLHNDQUNFO0FBVEo7O0FBYUE7RUFDRSxpQkFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQXJGaUI7RUFzRmpCLGdCQUFBO0FBVkY7O0FBYUE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBaEdpQjtBQXNGbkI7O0FBYUEsVUFBQTs7QUFDQTtFQUNFLFVBQUE7RUFDQSxXQUFBO0FBVkY7O0FBYUEsVUFBQTs7QUFDQTtFQUNFLDhCQUFBO0VBQ0Esa0JBQUE7QUFWRjs7QUFhQSxXQUFBOztBQUNBO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtBQVZGOztBQWFBLG9CQUFBOztBQUNBO0VBQ0UsbUJBQUE7QUFWRiIsImZpbGUiOiJ1aS1iYXNlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJGJvcmRlci1jb2xvcjogaHNsKDIwMCwgNzAlLCA4MCUpO1xyXG4kYmFja2dyb3VuZC1jb2xvcjogaHNsKDIwMiwgNzMlLCA5NiUpO1xyXG5cclxuLm1haW4ge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjtcclxuICBkaXNwbGF5OiBpbmxpbmUtZ3JpZDtcclxuICBjb2xvcjogYmxhY2s7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLy8gSGVhZGVyIHBhcnQgYW5kIGl0cyBlbGVtZW50c1xyXG5cclxuLmhlYWRlcntcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNzUlIDI1JTtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDUwJSA1MCU7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcclxuICBcImlucHV0QXJlYSBidXR0b25zXCJcclxuICBcImlucHV0VGV4dCBpbnB1dFRleFwiO1xyXG5cclxuICBmb250LXNpemU6IDEyMCU7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRib3JkZXItY29sb3I7XHJcbiAgaGVpZ2h0OiA5MHB4O1xyXG59XHJcblxyXG4uaW5wdXRBcmVhe1xyXG4gIGdyaWQtYXJlYTogaW5wdXRBcmVhO1xyXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG59XHJcbi5pbnB1dExhYmVse1xyXG4gIHBhZGRpbmc6IDVweDtcclxufVxyXG4uaW5wdXRCb3h7XHJcbiAgcGFkZGluZzogM3B4O1xyXG4gIHdpZHRoOiA4MCU7XHJcbn1cclxuXHJcbi5idXR0b25ze1xyXG4gIGdyaWQtYXJlYTogYnV0dG9ucztcclxuICBwYWRkaW5nLXRvcDogNXB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDVweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBmbG9hdDogcmlnaHQ7XHJcbn1cclxuLmJ0bntcclxuICBtYXJnaW4tbGVmdDogNXB4O1xyXG59XHJcbiNub3JtYWwtYnV0dG9uIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi5pbnB1dFRleHR7XHJcbiAgZ3JpZC1hcmVhOiBpbnB1dFRleHQ7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICBmb250LXNpemU6IDEyMCU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4vLyBFdmVyeXRoaW5nIGJlbG93IHRoZSBoZWFkZXJcclxuXHJcbi8vIENvbnRlbnQ6IEdyaWQgZm9yIFJlcG9ydCBhbmQgT3B0aW9ucyBjb21wb25lbnRzXHJcblxyXG4uY29udGVudCB7XHJcbiAgaGVpZ2h0OiA5OSU7XHJcbiAgbWFyZ2luOiAzcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDIwJSA4MCU7XHJcbiAgZ3JpZC1jb2x1bW4tZ2FwOiA1cHg7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcclxuICAgIFwicmVwb3J0ICBvcHRpb25zXCI7XHJcblxyXG59XHJcblxyXG4ucmVwb3J0e1xyXG4gIGdyaWQtYXJlYTogcmVwb3J0O1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyLWNvbG9yO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuXHJcbi5vcHRpb25ze1xyXG4gIGdyaWQtYXJlYTogb3B0aW9ucztcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDk5LjUlO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXItY29sb3I7XHJcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3I7XHJcbn1cclxuXHJcbi8qIHdpZHRoICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIHdpZHRoOiA1cHg7XHJcbiAgaGVpZ2h0OiA1cHg7XHJcbn1cclxuXHJcbi8qIFRyYWNrICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCA1cHggZ3JleTtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi8qIEhhbmRsZSAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICBiYWNrZ3JvdW5kOiBncmV5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDA7XHJcbn1cclxuXHJcbi8qIEhhbmRsZSBvbiBob3ZlciAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kOiAjYjMwMDAwO1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    62846:
    /*!***************************************!*\
      !*** ./src/app/helpers/auth.guard.ts ***!
      \***************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthGuard": function AuthGuard() {
          return (
            /* binding */
            _AuthGuard
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      79661);
      /* harmony import */


      var _app_core_services_authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/core/services/authentication.service */
      81745);

      var _AuthGuard = /*#__PURE__*/function () {
        function _AuthGuard(router, authenticationService) {
          _classCallCheck(this, _AuthGuard);

          this.router = router;
          this.authenticationService = authenticationService;
        }

        _createClass(_AuthGuard, [{
          key: "canActivate",
          value: function canActivate(route, state) {
            var user = this.authenticationService.userValue;

            if (user) {
              // check if route is restricted by role
              if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(["/"]).then();
                return false;
              } // authorised so return true


              return true;
            } // not logged in so redirect to login page with the return url


            this.router.navigate(["/login"], {
              queryParams: {
                returnUrl: state.url
              }
            }).then();
            return false;
          }
        }]);

        return _AuthGuard;
      }();

      _AuthGuard.ɵfac = function AuthGuard_Factory(t) {
        return new (t || _AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_app_core_services_authentication_service__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService));
      };

      _AuthGuard.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _AuthGuard,
        factory: _AuthGuard.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    57563:
    /*!**********************************************!*\
      !*** ./src/app/helpers/error.interceptor.ts ***!
      \**********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ErrorInterceptor": function ErrorInterceptor() {
          return (
            /* binding */
            _ErrorInterceptor
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      45871);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      18293);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _app_core_services_authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/core/services/authentication.service */
      81745);

      var _ErrorInterceptor = /*#__PURE__*/function () {
        function _ErrorInterceptor(authenticationService) {
          _classCallCheck(this, _ErrorInterceptor);

          this.authenticationService = authenticationService;
        }

        _createClass(_ErrorInterceptor, [{
          key: "intercept",
          value: function intercept(request, next) {
            var _this22 = this;

            return next.handle(request).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(function (err) {
              if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                _this22.authenticationService.logout();
              }

              var error = err.error.message || err.statusText;
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_2__.throwError)(error);
            }));
          }
        }]);

        return _ErrorInterceptor;
      }();

      _ErrorInterceptor.ɵfac = function ErrorInterceptor_Factory(t) {
        return new (t || _ErrorInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_app_core_services_authentication_service__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService));
      };

      _ErrorInterceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: _ErrorInterceptor,
        factory: _ErrorInterceptor.ɵfac
      });
      /***/
    },

    /***/
    51793:
    /*!*****************************************!*\
      !*** ./src/app/helpers/fake-backend.ts ***!
      \*****************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FakeBackendInterceptor": function FakeBackendInterceptor() {
          return (
            /* binding */
            _FakeBackendInterceptor
          );
        },

        /* harmony export */
        "fakeBackendProvider": function fakeBackendProvider() {
          return (
            /* binding */
            _fakeBackendProvider
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common/http */
      34301);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      81134);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      45871);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      75428);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      5881);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      91744);
      /* harmony import */


      var _app_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/models */
      42139);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var users = [{
        id: 1,
        username: "admin",
        password: "admin",
        role: _app_models__WEBPACK_IMPORTED_MODULE_0__.Role.Admin
      }, {
        id: 2,
        username: "student",
        password: "student",
        role: _app_models__WEBPACK_IMPORTED_MODULE_0__.Role.User
      }, {
        id: 3,
        username: "arzt",
        password: "arzt",
        role: _app_models__WEBPACK_IMPORTED_MODULE_0__.Role.Moderator
      }];

      var _FakeBackendInterceptor = /*#__PURE__*/function () {
        function _FakeBackendInterceptor() {
          _classCallCheck(this, _FakeBackendInterceptor);
        }

        _createClass(_FakeBackendInterceptor, [{
          key: "intercept",
          value: function intercept(request, next) {
            var url = request.url,
                method = request.method,
                headers = request.headers,
                body = request.body;
            return handleRoute();

            function handleRoute() {
              switch (true) {
                case url.endsWith("/users/authenticate") && method === "POST":
                  return authenticate();

                case url.endsWith("/users") && method === "GET":
                  return getUsers();

                case url.match(/\/users\/\d+$/) && method === "GET":
                  return getUserById();

                default:
                  // pass through any requests not handled above
                  return next.handle(request);
              }
            } // route functions


            function authenticate() {
              var username = body.username,
                  password = body.password;
              var user = users.find(function (x) {
                return x.username === username && x.password === password;
              });

              if (!user) {
                return error("Username or password is incorrect");
              }

              return ok({
                id: user.id,
                username: user.username,
                role: user.role,
                token: "fake-jwt-token.".concat(user.id)
              });
            }

            function getUsers() {
              if (!isAdmin()) {
                return unauthorized();
              }

              return ok(users);
            }

            function getUserById() {
              if (!isLoggedIn()) {
                return unauthorized();
              } // only admins can access other user records


              if (!isAdmin() && currentUser().id !== idFromUrl()) {
                return unauthorized();
              }

              var user = users.find(function (x) {
                return x.id === idFromUrl();
              });
              return ok(user);
            } // helper functions


            function ok(body) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse({
                status: 200,
                body: body
              })).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.delay)(500)); // delay observable to simulate server api call
            }

            function unauthorized() {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)({
                status: 401,
                error: {
                  message: "unauthorized"
                }
              }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.materialize)(), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.delay)(500), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.dematerialize)()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
            }

            function error(message) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)({
                status: 400,
                error: {
                  message: message
                }
              }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.materialize)(), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.delay)(500), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.dematerialize)());
            }

            function isLoggedIn() {
              var authHeader = headers.get("Authorization") || "";
              return authHeader.startsWith("Bearer fake-jwt-token");
            }

            function isAdmin() {
              return isLoggedIn() && currentUser().role === _app_models__WEBPACK_IMPORTED_MODULE_0__.Role.Admin;
            }

            function currentUser() {
              if (!isLoggedIn()) {
                return;
              }

              var id = parseInt(headers.get("Authorization").split(".")[1]);
              return users.find(function (x) {
                return x.id === id;
              });
            }

            function idFromUrl() {
              var urlParts = url.split("/");
              return parseInt(urlParts[urlParts.length - 1]);
            }
          }
        }]);

        return _FakeBackendInterceptor;
      }();

      _FakeBackendInterceptor.ɵfac = function FakeBackendInterceptor_Factory(t) {
        return new (t || _FakeBackendInterceptor)();
      };

      _FakeBackendInterceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
        token: _FakeBackendInterceptor,
        factory: _FakeBackendInterceptor.ɵfac
      });
      var _fakeBackendProvider = {
        // use fake backend in place of Http service for backend-less development
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HTTP_INTERCEPTORS,
        useClass: _FakeBackendInterceptor,
        multi: true
      };
      /***/
    },

    /***/
    90850:
    /*!**********************************************!*\
      !*** ./src/app/helpers/format-datepicker.ts ***!
      \**********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppDateAdapter": function AppDateAdapter() {
          return (
            /* binding */
            _AppDateAdapter
          );
        },

        /* harmony export */
        "APP_DATE_FORMATS": function APP_DATE_FORMATS() {
          return (
            /* binding */
            _APP_DATE_FORMATS
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_material_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/material/core */
      14147);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _AppDateAdapter = /*#__PURE__*/function (_angular_material_cor) {
        _inherits(_AppDateAdapter, _angular_material_cor);

        var _super = _createSuper(_AppDateAdapter);

        function _AppDateAdapter() {
          _classCallCheck(this, _AppDateAdapter);

          return _super.apply(this, arguments);
        }

        _createClass(_AppDateAdapter, [{
          key: "format",
          value: function format(date, displayFormat) {
            if (displayFormat === "input") {
              var day = date.getDate().toString();
              day = +day < 10 ? "0" + day : day;
              var month = (date.getMonth() + 1).toString();
              month = +month < 10 ? "0" + month : month;
              var year = date.getFullYear();
              return "".concat(day, "-").concat(month, "-").concat(year);
            }

            return date.toDateString();
          }
        }]);

        return _AppDateAdapter;
      }(_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.NativeDateAdapter);

      _AppDateAdapter.ɵfac = /*@__PURE__*/function () {
        var ɵAppDateAdapter_BaseFactory;
        return function AppDateAdapter_Factory(t) {
          return (ɵAppDateAdapter_BaseFactory || (ɵAppDateAdapter_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](_AppDateAdapter)))(t || _AppDateAdapter);
        };
      }();

      _AppDateAdapter.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _AppDateAdapter,
        factory: _AppDateAdapter.ɵfac
      });
      var _APP_DATE_FORMATS = {
        parse: {
          dateInput: {
            month: "short",
            year: "numeric",
            day: "numeric"
          }
        },
        display: {
          dateInput: "input",
          monthYearLabel: {
            year: "numeric",
            month: "numeric"
          },
          dateA11yLabel: {
            year: "numeric",
            month: "long",
            day: "numeric"
          },
          monthYearA11yLabel: {
            year: "numeric",
            month: "long"
          }
        }
      };
      /***/
    },

    /***/
    8807:
    /*!**********************************!*\
      !*** ./src/app/helpers/index.ts ***!
      \**********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthGuard": function AuthGuard() {
          return (
            /* reexport safe */
            _auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard
          );
        },

        /* harmony export */
        "ErrorInterceptor": function ErrorInterceptor() {
          return (
            /* reexport safe */
            _error_interceptor__WEBPACK_IMPORTED_MODULE_1__.ErrorInterceptor
          );
        },

        /* harmony export */
        "FakeBackendInterceptor": function FakeBackendInterceptor() {
          return (
            /* reexport safe */
            _fake_backend__WEBPACK_IMPORTED_MODULE_2__.FakeBackendInterceptor
          );
        },

        /* harmony export */
        "fakeBackendProvider": function fakeBackendProvider() {
          return (
            /* reexport safe */
            _fake_backend__WEBPACK_IMPORTED_MODULE_2__.fakeBackendProvider
          );
        },

        /* harmony export */
        "APP_DATE_FORMATS": function APP_DATE_FORMATS() {
          return (
            /* reexport safe */
            _format_datepicker__WEBPACK_IMPORTED_MODULE_3__.APP_DATE_FORMATS
          );
        },

        /* harmony export */
        "AppDateAdapter": function AppDateAdapter() {
          return (
            /* reexport safe */
            _format_datepicker__WEBPACK_IMPORTED_MODULE_3__.AppDateAdapter
          );
        },

        /* harmony export */
        "JwtInterceptor": function JwtInterceptor() {
          return (
            /* reexport safe */
            _jwt_interceptor__WEBPACK_IMPORTED_MODULE_4__.JwtInterceptor
          );
        },

        /* harmony export */
        "resolve": function resolve() {
          return (
            /* reexport safe */
            _old_model__WEBPACK_IMPORTED_MODULE_5__.resolve
          );
        },

        /* harmony export */
        "resolveCategory": function resolveCategory() {
          return (
            /* reexport safe */
            _old_model__WEBPACK_IMPORTED_MODULE_5__.resolveCategory
          );
        },

        /* harmony export */
        "arrayBufferToBase64": function arrayBufferToBase64() {
          return (
            /* reexport safe */
            _util__WEBPACK_IMPORTED_MODULE_6__.arrayBufferToBase64
          );
        },

        /* harmony export */
        "assertNever": function assertNever() {
          return (
            /* reexport safe */
            _util__WEBPACK_IMPORTED_MODULE_6__.assertNever
          );
        },

        /* harmony export */
        "displayableQuotient": function displayableQuotient() {
          return (
            /* reexport safe */
            _util__WEBPACK_IMPORTED_MODULE_6__.displayableQuotient
          );
        },

        /* harmony export */
        "flatMap": function flatMap() {
          return (
            /* reexport safe */
            _util__WEBPACK_IMPORTED_MODULE_6__.flatMap
          );
        },

        /* harmony export */
        "getAllIndexOf": function getAllIndexOf() {
          return (
            /* reexport safe */
            _util__WEBPACK_IMPORTED_MODULE_6__.getAllIndexOf
          );
        },

        /* harmony export */
        "getBase64Image": function getBase64Image() {
          return (
            /* reexport safe */
            _util__WEBPACK_IMPORTED_MODULE_6__.getBase64Image
          );
        },

        /* harmony export */
        "getDateFormatted": function getDateFormatted() {
          return (
            /* reexport safe */
            _util__WEBPACK_IMPORTED_MODULE_6__.getDateFormatted
          );
        },

        /* harmony export */
        "getFileExtension": function getFileExtension() {
          return (
            /* reexport safe */
            _util__WEBPACK_IMPORTED_MODULE_6__.getFileExtension
          );
        },

        /* harmony export */
        "getImageDimensions": function getImageDimensions() {
          return (
            /* reexport safe */
            _util__WEBPACK_IMPORTED_MODULE_6__.getImageDimensions
          );
        },

        /* harmony export */
        "levenshtein": function levenshtein() {
          return (
            /* reexport safe */
            _util__WEBPACK_IMPORTED_MODULE_6__.levenshtein
          );
        },

        /* harmony export */
        "splitStringFromIndexes": function splitStringFromIndexes() {
          return (
            /* reexport safe */
            _util__WEBPACK_IMPORTED_MODULE_6__.splitStringFromIndexes
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./auth.guard */
      62846);
      /* harmony import */


      var _error_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./error.interceptor */
      57563);
      /* harmony import */


      var _fake_backend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./fake-backend */
      51793);
      /* harmony import */


      var _format_datepicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./format-datepicker */
      90850);
      /* harmony import */


      var _jwt_interceptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./jwt.interceptor */
      80260);
      /* harmony import */


      var _old_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./old_model */
      66863);
      /* harmony import */


      var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./util */
      26545);
      /***/

    },

    /***/
    80260:
    /*!********************************************!*\
      !*** ./src/app/helpers/jwt.interceptor.ts ***!
      \********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "JwtInterceptor": function JwtInterceptor() {
          return (
            /* binding */
            _JwtInterceptor
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _env_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @env/environment */
      92340);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _app_core_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/core/services/authentication.service */
      81745);

      var _JwtInterceptor = /*#__PURE__*/function () {
        function _JwtInterceptor(authenticationService) {
          _classCallCheck(this, _JwtInterceptor);

          this.authenticationService = authenticationService;
        }

        _createClass(_JwtInterceptor, [{
          key: "intercept",
          value: function intercept(request, next) {
            // add auth header with jwt if user is logged in and request is to api url
            var user = this.authenticationService.userValue;
            var isLoggedIn = user && user.accessToken;
            var isApiUrl = request.url.startsWith(_env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.backend);

            if (isLoggedIn && isApiUrl) {
              request = request.clone({
                setHeaders: {
                  authorization: "Bearer ".concat(user.accessToken)
                }
              });
            }

            return next.handle(request);
          }
        }]);

        return _JwtInterceptor;
      }();

      _JwtInterceptor.ɵfac = function JwtInterceptor_Factory(t) {
        return new (t || _JwtInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_app_core_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService));
      };

      _JwtInterceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
        token: _JwtInterceptor,
        factory: _JwtInterceptor.ɵfac
      });
      /***/
    },

    /***/
    66863:
    /*!**************************************!*\
      !*** ./src/app/helpers/old_model.ts ***!
      \**************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "resolve": function resolve() {
          return (
            /* binding */
            _resolve
          );
        },

        /* harmony export */
        "resolveCategory": function resolveCategory() {
          return (
            /* binding */
            _resolveCategory
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./util */
      26545);

      function _resolve(varId, structure) {
        var _iterator28 = _createForOfIteratorHelper(structure),
            _step28;

        try {
          for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
            var tl = _step28.value;

            switch (tl.kind) {
              case "block":
                continue;

              case "enumeration":
                continue;

              case "conditional":
                continue;

              case "category":
                {
                  var result = _resolveCategory(varId, tl);

                  if (result) {
                    return result;
                  } else {
                    continue;
                  }
                }

              default:
                (0, _util__WEBPACK_IMPORTED_MODULE_0__.assertNever)(tl);
            }
          }
        } catch (err) {
          _iterator28.e(err);
        } finally {
          _iterator28.f();
        }
      }

      function _resolveCategory(varId, c) {
        return (0, _util__WEBPACK_IMPORTED_MODULE_0__.flatMap)(c.selectables, variablesOfSelectable).find(function (v) {
          return v.id === varId;
        });
      }

      function variablesOfSelectable(s) {
        switch (s.kind) {
          case "box":
            return s.variables;

          case "group":
            return (0, _util__WEBPACK_IMPORTED_MODULE_0__.flatMap)(s.options, function (o) {
              return o.variables;
            });

          default:
            return (0, _util__WEBPACK_IMPORTED_MODULE_0__.assertNever)(s);
        }
      }
      /***/

    },

    /***/
    26545:
    /*!*********************************!*\
      !*** ./src/app/helpers/util.ts ***!
      \*********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "assertNever": function assertNever() {
          return (
            /* binding */
            _assertNever
          );
        },

        /* harmony export */
        "flatMap": function flatMap() {
          return (
            /* binding */
            _flatMap
          );
        },

        /* harmony export */
        "displayableQuotient": function displayableQuotient() {
          return (
            /* binding */
            _displayableQuotient
          );
        },

        /* harmony export */
        "levenshtein": function levenshtein() {
          return (
            /* binding */
            _levenshtein
          );
        },

        /* harmony export */
        "getAllIndexOf": function getAllIndexOf() {
          return (
            /* binding */
            _getAllIndexOf
          );
        },

        /* harmony export */
        "splitStringFromIndexes": function splitStringFromIndexes() {
          return (
            /* binding */
            _splitStringFromIndexes
          );
        },

        /* harmony export */
        "getDateFormatted": function getDateFormatted() {
          return (
            /* binding */
            _getDateFormatted
          );
        },

        /* harmony export */
        "arrayBufferToBase64": function arrayBufferToBase64() {
          return (
            /* binding */
            _arrayBufferToBase
          );
        },

        /* harmony export */
        "getBase64Image": function getBase64Image() {
          return (
            /* binding */
            _getBase64Image
          );
        },

        /* harmony export */
        "getFileExtension": function getFileExtension() {
          return (
            /* binding */
            _getFileExtension
          );
        },

        /* harmony export */
        "getImageDimensions": function getImageDimensions() {
          return (
            /* binding */
            _getImageDimensions
          );
        }
        /* harmony export */

      });

      function _assertNever(n) {
        throw new Error(JSON.stringify(n) + " should never be a value");
      }

      function _flatMap(xs, f) {
        var ret = [];

        var _iterator29 = _createForOfIteratorHelper(xs),
            _step29;

        try {
          for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
            var x = _step29.value;
            ret = ret.concat(f(x));
          }
        } catch (err) {
          _iterator29.e(err);
        } finally {
          _iterator29.f();
        }

        return ret;
      }

      function _displayableQuotient(numerator, denominator) {
        var fractionDigits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
        var res = numerator / denominator;

        if (isFinite(res)) {
          return res.toFixed(fractionDigits);
        } else {
          return "   ";
        }
      }

      function _levenshtein(a, b) {
        var an = a ? a.length : 0;
        var bn = b ? b.length : 0;

        if (an === 0) {
          return bn;
        }

        if (bn === 0) {
          return an;
        }

        var matrix = new Array(bn + 1);

        for (var i = 0; i <= bn; ++i) {
          var row = matrix[i] = new Array(an + 1);
          row[0] = i;
        }

        var firstRow = matrix[0];

        for (var j = 1; j <= an; ++j) {
          firstRow[j] = j;
        }

        for (var _i2 = 1; _i2 <= bn; ++_i2) {
          for (var _j = 1; _j <= an; ++_j) {
            if (b.charAt(_i2 - 1) === a.charAt(_j - 1)) {
              matrix[_i2][_j] = matrix[_i2 - 1][_j - 1];
            } else {
              matrix[_i2][_j] = Math.min(matrix[_i2 - 1][_j - 1], // substitution
              matrix[_i2][_j - 1], // insertion
              matrix[_i2 - 1][_j] // deletion
              ) + 1;
            }
          }
        }

        return matrix[bn][an];
      }

      function _getAllIndexOf(searchStr, inputStr, caseSensitive) {
        // searches for all occurrences of a searchString within an inputString and returns all start indexes as an array
        if (searchStr.length === 0) {
          return [];
        }

        if (!caseSensitive) {
          inputStr = inputStr.toLowerCase();
          searchStr = searchStr.toLowerCase();
        }

        var startIndex = 0;
        var index;
        var indexes = [];

        while ((index = inputStr.indexOf(searchStr, startIndex)) > -1) {
          indexes.push(index);
          startIndex = index + searchStr.length;
        }

        return indexes;
      }

      function _splitStringFromIndexes(input, indexes) {
        var splitText = [];
        indexes.sort();

        for (var i = 0; i < indexes.length; i++) {
          if (i === indexes.length) {
            splitText.push(input.substring(indexes[i], input.length));
          } else {
            splitText.push(input.substring(indexes[i], indexes[i + 1]));
          }
        }

        return splitText;
      }

      function _getDateFormatted(date, addTime) {
        var result;
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        result = day + "." + month + "." + date.getFullYear();

        if (addTime) {
          var hour = ("0" + date.getHours()).slice(-2);
          var minutes = ("0" + date.getMinutes()).slice(-2);
          result += ", " + hour + ":" + minutes;
        }

        return result;
      }

      function _arrayBufferToBase(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        console.log(bytes);
        var len = bytes.byteLength;

        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        return window.btoa(binary);
      }

      function _getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      }

      function _getFileExtension(filename) {
        return filename.split(".").pop().toLowerCase();
      }

      function _getImageDimensions(imgUrl) {
        var width;
        var height;
        var img = new Image();
        img.src = imgUrl;

        img.onload = function (event) {
          var loadedImage = event.currentTarget;
          width = loadedImage.width;
          height = loadedImage.height;
        };

        console.log("UTIL HERE");
        console.log(width, height);
        return [width, height];
      }
      /***/

    },

    /***/
    70091:
    /*!*************************************!*\
      !*** ./src/app/models/generator.ts ***!
      \*************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "normalExtractor": function normalExtractor() {
          return (
            /* binding */
            _normalExtractor
          );
        },

        /* harmony export */
        "judgementExtractor": function judgementExtractor() {
          return (
            /* binding */
            _judgementExtractor
          );
        },

        /* harmony export */
        "makeText": function makeText() {
          return (
            /* binding */
            _makeText
          );
        },

        /* harmony export */
        "getSuppressedConditionalIds": function getSuppressedConditionalIds() {
          return (
            /* binding */
            _getSuppressedConditionalIds
          );
        },

        /* harmony export */
        "checkConditional": function checkConditional() {
          return (
            /* binding */
            _checkConditional
          );
        },

        /* harmony export */
        "isClicked": function isClicked() {
          return (
            /* binding */
            _isClicked
          );
        },

        /* harmony export */
        "getTexts": function getTexts() {
          return (
            /* binding */
            _getTexts
          );
        },

        /* harmony export */
        "expandVariablesInString": function expandVariablesInString() {
          return (
            /* binding */
            _expandVariablesInString
          );
        },

        /* harmony export */
        "makeDateString": function makeDateString() {
          return (
            /* binding */
            _makeDateString
          );
        },

        /* harmony export */
        "allVariables": function allVariables() {
          return (
            /* binding */
            _allVariables
          );
        },

        /* harmony export */
        "textOfVariable": function textOfVariable() {
          return (
            /* binding */
            _textOfVariable
          );
        },

        /* harmony export */
        "makeNormalCategory": function makeNormalCategory() {
          return (
            /* binding */
            _makeNormalCategory
          );
        },

        /* harmony export */
        "hasSelection": function hasSelection() {
          return (
            /* binding */
            _hasSelection
          );
        },

        /* harmony export */
        "makeEnumeration": function makeEnumeration() {
          return (
            /* binding */
            _makeEnumeration
          );
        },

        /* harmony export */
        "getRelevantEnumerationItems": function getRelevantEnumerationItems() {
          return (
            /* binding */
            _getRelevantEnumerationItems
          );
        },

        /* harmony export */
        "assertUnreachable": function assertUnreachable() {
          return (
            /* binding */
            _assertUnreachable
          );
        }
        /* harmony export */

      });

      function _normalExtractor() {
        return new ( /*#__PURE__*/function () {
          function _class() {
            _classCallCheck(this, _class);
          }

          _createClass(_class, [{
            key: "ofCheckbox",
            value: function ofCheckbox(c) {
              return c.text;
            }
          }, {
            key: "ofOption",
            value: function ofOption(o) {
              return o.text;
            }
          }, {
            key: "ofEnumeration",
            value: function ofEnumeration(e) {
              return e.text;
            }
          }, {
            key: "ofBlock",
            value: function ofBlock(b) {
              return b.text;
            }
          }, {
            key: "ofConditional",
            value: function ofConditional(c) {
              return c.normalText;
            }
          }]);

          return _class;
        }())();
      }

      function _judgementExtractor() {
        return new ( /*#__PURE__*/function () {
          function _class2() {
            _classCallCheck(this, _class2);
          }

          _createClass(_class2, [{
            key: "ofCheckbox",
            value: function ofCheckbox(c) {
              return c.judgementText;
            }
          }, {
            key: "ofOption",
            value: function ofOption(o) {
              return o.judgementText;
            }
          }, {
            key: "ofEnumeration",
            value: function ofEnumeration(e) {
              return e.judgementText;
            }
          }, {
            key: "ofBlock",
            value: function ofBlock(b) {
              return b.judgementText;
            }
          }, {
            key: "ofConditional",
            value: function ofConditional(c) {
              return c.judgementText;
            }
          }]);

          return _class2;
        }())();
      }

      function _makeText(parts, extractor, suppressed) {
        var result = parts.map(function (c) {
          if (c.kind === "category") {
            return _getTexts(c.selectables, suppressed, extractor).map(function (t) {
              return _expandVariablesInString(t, parts, true);
            }).join("");
          } else if (c.kind === "block") {
            return extractor.ofBlock(c) || "";
          } else if (c.kind === "enumeration") {
            return _makeEnumeration(c, parts, extractor);
          } else if (c.kind === "conditional") {
            if (_checkConditional(c, parts)) {
              var data = extractor.ofConditional(c);

              if (data) {
                return _expandVariablesInString(data, parts, true);
              } else {
                return "";
              }
            }
          } else {
            throw new Error("unknown top level kind");
          }
        }).join("");
        var blocks = parts.filter(function (x) {
          return x.kind === "block";
        });

        var _iterator30 = _createForOfIteratorHelper(blocks),
            _step30;

        try {
          for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
            var b = _step30.value;
            var regEx = new RegExp(b.text + "(\\n|$)");
            result = result.replace(regEx, "\n");
          }
        } catch (err) {
          _iterator30.e(err);
        } finally {
          _iterator30.f();
        }

        return result;
      }

      function _getSuppressedConditionalIds(data) {
        var suppressedNormal = [];
        var suppressedJudgement = [];

        var _iterator31 = _createForOfIteratorHelper(data),
            _step31;

        try {
          for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
            var topLevel = _step31.value;

            if (topLevel.kind === "conditional") {
              if (_checkConditional(topLevel, data)) {
                var _iterator32 = _createForOfIteratorHelper(topLevel.precondition),
                    _step32;

                try {
                  for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
                    var anded = _step32.value;

                    var _iterator33 = _createForOfIteratorHelper(anded),
                        _step33;

                    try {
                      for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
                        var literal = _step33.value;

                        if (!literal.negated) {
                          if (topLevel.normalText) {
                            suppressedNormal.push(literal.id);
                          }

                          if (topLevel.judgementText) {
                            suppressedJudgement.push(literal.id);
                          }
                        }
                      }
                    } catch (err) {
                      _iterator33.e(err);
                    } finally {
                      _iterator33.f();
                    }
                  }
                } catch (err) {
                  _iterator32.e(err);
                } finally {
                  _iterator32.f();
                }
              }
            }
          }
        } catch (err) {
          _iterator31.e(err);
        } finally {
          _iterator31.f();
        }

        return [suppressedNormal, suppressedJudgement];
      }

      function _checkConditional(c, data) {
        var _iterator34 = _createForOfIteratorHelper(c.precondition),
            _step34;

        try {
          outer: for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
            var anded = _step34.value;

            var _iterator35 = _createForOfIteratorHelper(anded),
                _step35;

            try {
              for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
                var literal = _step35.value;

                if (_isClicked(literal.id, data) === literal.negated) {
                  continue outer;
                }
              }
            } catch (err) {
              _iterator35.e(err);
            } finally {
              _iterator35.f();
            }

            return true;
          }
        } catch (err) {
          _iterator34.e(err);
        } finally {
          _iterator34.f();
        }

        return false;
      }

      function _isClicked(clickableId, data) {
        var _iterator36 = _createForOfIteratorHelper(data.filter(function (p) {
          return p.kind === "category";
        }).map(function (c) {
          return c;
        })),
            _step36;

        try {
          for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
            var category = _step36.value;

            var _iterator37 = _createForOfIteratorHelper(category.selectables),
                _step37;

            try {
              for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
                var selectable = _step37.value;

                if (selectable.kind === "box") {
                  if (selectable.value && selectable.conditionalId === clickableId) {
                    return true;
                  }
                } else {
                  var _iterator38 = _createForOfIteratorHelper(selectable.options),
                      _step38;

                  try {
                    for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
                      var option = _step38.value;

                      if (option.conditionalId === clickableId && selectable.value === option.name) {
                        return true;
                      }
                    }
                  } catch (err) {
                    _iterator38.e(err);
                  } finally {
                    _iterator38.f();
                  }
                }
              }
            } catch (err) {
              _iterator37.e(err);
            } finally {
              _iterator37.f();
            }
          }
        } catch (err) {
          _iterator36.e(err);
        } finally {
          _iterator36.f();
        }

        return false;
      }

      function _getTexts(ss, suppressed, textExtractor) {
        var ret = [];

        var _iterator39 = _createForOfIteratorHelper(ss),
            _step39;

        try {
          for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
            var s = _step39.value;

            if (s.kind === "box" && s.value && !s.enumeration && (!s.conditionalId || suppressed.indexOf(s.conditionalId) === -1)) {
              var result = textExtractor.ofCheckbox(s);

              if (result) {
                ret.push(result);
              }
            } else if (s.kind === "group") {
              var _iterator40 = _createForOfIteratorHelper(s.options),
                  _step40;

              try {
                for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
                  var o = _step40.value;

                  if (s.value === o.name && (!o.conditionalId || suppressed.indexOf(o.conditionalId) === -1)) {
                    var _result = textExtractor.ofOption(o);

                    if (_result) {
                      ret.push(_result);
                    }
                  }
                }
              } catch (err) {
                _iterator40.e(err);
              } finally {
                _iterator40.f();
              }
            }
          }
        } catch (err) {
          _iterator39.e(err);
        } finally {
          _iterator39.f();
        }

        return ret;
      }

      function _expandVariablesInString(s, data, addFullStop) {
        var today = new Date();
        var yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        var lookup = function lookup(name) {
          if (name === "%Gestern%") {
            return _makeDateString(yesterday);
          } else if (name === "%Heute%") {
            return _makeDateString(today);
          } else if (name === "%Morgen%") {
            return _makeDateString(tomorrow);
          }

          var vars = _allVariables(data);

          var matching = vars.find(function (v) {
            return "%" + v.id + "%" === name;
          });

          if (matching) {
            if (_textOfVariable(matching)) {
              return _textOfVariable(matching);
            } else {
              return "---";
            }
          } else {
            return "---";
          }
        };

        s = s.replace(/%[^%]+%/g, lookup);
        var brackets = s.match(/(\[]*?[^\]]*?])/g);

        if (brackets != null) {
          var _iterator41 = _createForOfIteratorHelper(brackets),
              _step41;

          try {
            for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
              var t = _step41.value;

              if (t.includes("---")) {
                s = s.replace(t, "");
              }
            }
          } catch (err) {
            _iterator41.e(err);
          } finally {
            _iterator41.f();
          }
        }

        s = s.replace(/(---)/g, ""); // "Fehlzeichen" weg

        s = s.replace(/\s\s+/g, " "); // doppelt oder mehr Leerzeichen weg

        s = s.replace(/\[|\]/g, ""); // Klammern weg

        s = s.trim();

        if (addFullStop) {
          s = s.replace(/(\s*\.?\s*$)/, ". "); // Punkt am Ende einfügen, falls keiner da ist
        }

        return s;
      }

      function _makeDateString(d) {
        return d.toLocaleDateString("de-DE", {
          year: "numeric",
          month: "numeric",
          day: "numeric"
        });
      }

      function _allVariables(data) {
        var vars = [];

        var _iterator42 = _createForOfIteratorHelper(data),
            _step42;

        try {
          for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
            var c = _step42.value;

            if (c.kind === "category") {
              var _iterator43 = _createForOfIteratorHelper(c.selectables),
                  _step43;

              try {
                for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
                  var sel = _step43.value;

                  if (sel.kind === "box" && sel.value) {
                    vars = vars.concat(sel.variables);
                  } else if (sel.kind === "group") {
                    var _iterator44 = _createForOfIteratorHelper(sel.options),
                        _step44;

                    try {
                      for (_iterator44.s(); !(_step44 = _iterator44.n()).done;) {
                        var o = _step44.value;

                        if (sel.value === o.name) {
                          vars = vars.concat(o.variables);
                        }
                      }
                    } catch (err) {
                      _iterator44.e(err);
                    } finally {
                      _iterator44.f();
                    }
                  }
                }
              } catch (err) {
                _iterator43.e(err);
              } finally {
                _iterator43.f();
              }
            }
          }
        } catch (err) {
          _iterator42.e(err);
        } finally {
          _iterator42.f();
        }

        return vars;
      }

      function _textOfVariable(v) {
        if (v.kind === "oc") {
          return v.value;
        } else if (v.kind === "mc") {
          return v.values.filter(function (val) {
            return val[1];
          }).map(function (val) {
            return val[0];
          }).join(", ");
        } else if (v.kind === "text") {
          return v.value;
        } else if (v.kind === "number") {
          if (v.value !== 0) {
            return "" + v.value;
          } else {
            return "";
          }
        } else if (v.kind === "date") {
          return v.value.day + "." + v.value.month + "." + v.value.year;
        } else if (v.kind === "ratio") {
          return (v.numerator / v.denominator).toLocaleString("de-DE", {
            maximumFractionDigits: v.fractionDigits
          });
        }

        return _assertUnreachable(v);
      }

      function _makeNormalCategory(c) {
        if (_hasSelection(c)) {
          return;
        }

        var _iterator45 = _createForOfIteratorHelper(c.selectables),
            _step45;

        try {
          for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
            var entry = _step45.value;

            if (entry.kind === "box") {
              if (entry.normal) {
                entry.value = true;
              }
            } else if (entry.kind === "group") {
              var _iterator46 = _createForOfIteratorHelper(entry.options),
                  _step46;

              try {
                for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
                  var o = _step46.value;

                  if (o.normal) {
                    entry.value = o.name;
                  }
                }
              } catch (err) {
                _iterator46.e(err);
              } finally {
                _iterator46.f();
              }
            }
          }
        } catch (err) {
          _iterator45.e(err);
        } finally {
          _iterator45.f();
        }
      }

      function _hasSelection(c) {
        var _iterator47 = _createForOfIteratorHelper(c.selectables),
            _step47;

        try {
          for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
            var entry = _step47.value;

            if (entry.kind === "box" && entry.value) {
              return true;
            } else if (entry.kind === "group" && entry.value) {
              return true;
            }
          }
        } catch (err) {
          _iterator47.e(err);
        } finally {
          _iterator47.f();
        }

        return false;
      }

      function _makeEnumeration(e, data, textExtractor) {
        var items = _getRelevantEnumerationItems(e.id, data, textExtractor);

        if (items.length === 0) {
          return "";
        } else if (items.length === 1) {
          return textExtractor.ofEnumeration(e) + items[0] + ". ";
        } else if (items.length === 2) {
          return textExtractor.ofEnumeration(e) + items[0] + " und " + items[1] + ". ";
        } else if (items.length > 2) {
          return textExtractor.ofEnumeration(e) + items.slice(0, items.length - 1).join(", ") + " und " + items[items.length - 1] + " ";
        }
      }

      function _getRelevantEnumerationItems(id, data, textExtractor) {
        var items = [];

        var _iterator48 = _createForOfIteratorHelper(data),
            _step48;

        try {
          for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
            var p = _step48.value;

            if (p.kind === "category") {
              var _iterator49 = _createForOfIteratorHelper(p.selectables),
                  _step49;

              try {
                for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
                  var s = _step49.value;

                  if (s.kind === "box") {
                    if (s.value && s.enumeration === id) {
                      var result = textExtractor.ofCheckbox(s);

                      if (result) {
                        items.push(_expandVariablesInString(result, data, false));
                      }
                    }
                  }
                }
              } catch (err) {
                _iterator49.e(err);
              } finally {
                _iterator49.f();
              }
            }
          }
        } catch (err) {
          _iterator48.e(err);
        } finally {
          _iterator48.f();
        }

        return items;
      }

      function _assertUnreachable(x) {
        throw new Error("should not be reachable: " + x);
      }
      /***/

    },

    /***/
    42139:
    /*!*********************************!*\
      !*** ./src/app/models/index.ts ***!
      \*********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "allVariables": function allVariables() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.allVariables
          );
        },

        /* harmony export */
        "assertUnreachable": function assertUnreachable() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.assertUnreachable
          );
        },

        /* harmony export */
        "checkConditional": function checkConditional() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.checkConditional
          );
        },

        /* harmony export */
        "expandVariablesInString": function expandVariablesInString() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.expandVariablesInString
          );
        },

        /* harmony export */
        "getRelevantEnumerationItems": function getRelevantEnumerationItems() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.getRelevantEnumerationItems
          );
        },

        /* harmony export */
        "getSuppressedConditionalIds": function getSuppressedConditionalIds() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.getSuppressedConditionalIds
          );
        },

        /* harmony export */
        "getTexts": function getTexts() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.getTexts
          );
        },

        /* harmony export */
        "hasSelection": function hasSelection() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.hasSelection
          );
        },

        /* harmony export */
        "isClicked": function isClicked() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.isClicked
          );
        },

        /* harmony export */
        "judgementExtractor": function judgementExtractor() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.judgementExtractor
          );
        },

        /* harmony export */
        "makeDateString": function makeDateString() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.makeDateString
          );
        },

        /* harmony export */
        "makeEnumeration": function makeEnumeration() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.makeEnumeration
          );
        },

        /* harmony export */
        "makeNormalCategory": function makeNormalCategory() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.makeNormalCategory
          );
        },

        /* harmony export */
        "makeText": function makeText() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.makeText
          );
        },

        /* harmony export */
        "normalExtractor": function normalExtractor() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.normalExtractor
          );
        },

        /* harmony export */
        "textOfVariable": function textOfVariable() {
          return (
            /* reexport safe */
            _generator__WEBPACK_IMPORTED_MODULE_0__.textOfVariable
          );
        },

        /* harmony export */
        "addSetter": function addSetter() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.addSetter
          );
        },

        /* harmony export */
        "compound": function compound() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.compound
          );
        },

        /* harmony export */
        "decimal": function decimal() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.decimal
          );
        },

        /* harmony export */
        "dummy": function dummy() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.dummy
          );
        },

        /* harmony export */
        "fail": function fail() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.fail
          );
        },

        /* harmony export */
        "log": function log() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.log
          );
        },

        /* harmony export */
        "logOnFail": function logOnFail() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.logOnFail
          );
        },

        /* harmony export */
        "logOnSuccess": function logOnSuccess() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.logOnSuccess
          );
        },

        /* harmony export */
        "optional": function optional() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.optional
          );
        },

        /* harmony export */
        "or": function or() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.or
          );
        },

        /* harmony export */
        "regex": function regex() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.regex
          );
        },

        /* harmony export */
        "success": function success() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.success
          );
        },

        /* harmony export */
        "text": function text() {
          return (
            /* reexport safe */
            _takers__WEBPACK_IMPORTED_MODULE_3__.text
          );
        },

        /* harmony export */
        "convertBlock": function convertBlock() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.convertBlock
          );
        },

        /* harmony export */
        "convertCategory": function convertCategory() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.convertCategory
          );
        },

        /* harmony export */
        "convertCheckBox": function convertCheckBox() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.convertCheckBox
          );
        },

        /* harmony export */
        "convertCond": function convertCond() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.convertCond
          );
        },

        /* harmony export */
        "convertEnum": function convertEnum() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.convertEnum
          );
        },

        /* harmony export */
        "convertGroup": function convertGroup() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.convertGroup
          );
        },

        /* harmony export */
        "convertModel": function convertModel() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.convertModel
          );
        },

        /* harmony export */
        "convertOption": function convertOption() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.convertOption
          );
        },

        /* harmony export */
        "convertSelectables": function convertSelectables() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.convertSelectables
          );
        },

        /* harmony export */
        "convertVariable": function convertVariable() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.convertVariable
          );
        },

        /* harmony export */
        "convertVariables": function convertVariables() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.convertVariables
          );
        },

        /* harmony export */
        "splitKeywords": function splitKeywords() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.splitKeywords
          );
        },

        /* harmony export */
        "splitKeywordsArray": function splitKeywordsArray() {
          return (
            /* reexport safe */
            _templateModel__WEBPACK_IMPORTED_MODULE_4__.splitKeywordsArray
          );
        },

        /* harmony export */
        "User": function User() {
          return (
            /* reexport safe */
            _user__WEBPACK_IMPORTED_MODULE_5__.User
          );
        },

        /* harmony export */
        "Role": function Role() {
          return (
            /* reexport safe */
            _role__WEBPACK_IMPORTED_MODULE_6__.Role
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./generator */
      70091);
      /* harmony import */


      var _keyword__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./keyword */
      61110);
      /* harmony import */


      var _materialModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./materialModel */
      10418);
      /* harmony import */


      var _takers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./takers */
      30051);
      /* harmony import */


      var _templateModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./templateModel */
      37771);
      /* harmony import */


      var _user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./user */
      65783);
      /* harmony import */


      var _role__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./role */
      14946);
      /***/

    },

    /***/
    61110:
    /*!***********************************!*\
      !*** ./src/app/models/keyword.ts ***!
      \***********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /***/

    },

    /***/
    10418:
    /*!*****************************************!*\
      !*** ./src/app/models/materialModel.ts ***!
      \*****************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /***/

    },

    /***/
    14946:
    /*!********************************!*\
      !*** ./src/app/models/role.ts ***!
      \********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "Role": function Role() {
          return (
            /* binding */
            _Role
          );
        }
        /* harmony export */

      });

      var _Role;

      (function (Role) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Role["User"] = "user"; // eslint-disable-next-line @typescript-eslint/naming-convention

        Role["Moderator"] = "moderator"; // eslint-disable-next-line @typescript-eslint/naming-convention

        Role["Admin"] = "admin";
      })(_Role || (_Role = {}));
      /***/

    },

    /***/
    30051:
    /*!**********************************!*\
      !*** ./src/app/models/takers.ts ***!
      \**********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "text": function text() {
          return (
            /* binding */
            _text
          );
        },

        /* harmony export */
        "regex": function regex() {
          return (
            /* binding */
            _regex
          );
        },

        /* harmony export */
        "dummy": function dummy() {
          return (
            /* binding */
            _dummy
          );
        },

        /* harmony export */
        "fail": function fail() {
          return (
            /* binding */
            _fail
          );
        },

        /* harmony export */
        "success": function success() {
          return (
            /* binding */
            _success
          );
        },

        /* harmony export */
        "decimal": function decimal() {
          return (
            /* binding */
            _decimal
          );
        },

        /* harmony export */
        "compound": function compound() {
          return (
            /* binding */
            _compound
          );
        },

        /* harmony export */
        "or": function or() {
          return (
            /* binding */
            _or
          );
        },

        /* harmony export */
        "optional": function optional() {
          return (
            /* binding */
            _optional
          );
        },

        /* harmony export */
        "addSetter": function addSetter() {
          return (
            /* binding */
            _addSetter
          );
        },

        /* harmony export */
        "logOnFail": function logOnFail() {
          return (
            /* binding */
            _logOnFail
          );
        },

        /* harmony export */
        "logOnSuccess": function logOnSuccess() {
          return (
            /* binding */
            _logOnSuccess
          );
        },

        /* harmony export */
        "log": function log() {
          return (
            /* binding */
            _log
          );
        }
        /* harmony export */

      });
      /*
       * basic takers
       */


      function _text(text) {
        return function (input) {
          var sub = input.substr(0, text.length);

          if (sub === text) {
            return {
              lengthTaken: sub.length,
              setter: function setter() {}
            };
          }
        };
      }

      function _regex(r) {
        return function (input) {
          var match = r.exec(input);

          if (match) {
            return {
              lengthTaken: match[0].length,
              setter: function setter() {}
            };
          }
        };
      }

      var _dummy = function _dummy(s) {
        console.log("there are still dummy takers");
        return undefined;
      };

      var _fail = function _fail(s) {
        return undefined;
      };

      var _success = function _success(s) {
        return {
          lengthTaken: 0,
          setter: function setter() {}
        };
      };

      var _decimal = _regex(/\d+([.,]\d+)?/);
      /*
       * combinators
       */


      function _compound(takers) {
        return function (s) {
          var results = [];
          var ss = s;

          var _iterator50 = _createForOfIteratorHelper(takers),
              _step50;

          try {
            for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
              var t = _step50.value;
              var result = t(ss);

              if (result) {
                results.push(result);
                ss = ss.substr(result.lengthTaken);
              } else {
                return undefined;
              }
            }
          } catch (err) {
            _iterator50.e(err);
          } finally {
            _iterator50.f();
          }

          return {
            lengthTaken: results.reduce(function (a, b) {
              return a + b.lengthTaken;
            }, 0),
            setter: function setter() {
              results.forEach(function (r) {
                return r.setter();
              });
            }
          };
        };
      }

      function _or(takers) {
        return function (s) {
          var _iterator51 = _createForOfIteratorHelper(takers),
              _step51;

          try {
            for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
              var taker = _step51.value;
              var result = taker(s);

              if (result) {
                return result;
              }
            }
          } catch (err) {
            _iterator51.e(err);
          } finally {
            _iterator51.f();
          }
        };
      }

      function _optional(t) {
        return _or([t, _success]);
      }

      function _addSetter(t, f) {
        return function (s) {
          var result = t(s);

          if (result) {
            return {
              lengthTaken: result.lengthTaken,
              setter: function setter() {
                result.setter();
                f(s.substring(0, result.lengthTaken));
              }
            };
          }

          return result;
        };
      }

      function _logOnFail(t, msg) {
        return function (s) {
          var result = t(s);

          if (result) {
            return result;
          } else {
            console.log(msg);
          }
        };
      }

      function _logOnSuccess(t, msg) {
        return function (s) {
          var result = t(s);

          if (result) {
            console.log(msg);
            return result;
          }
        };
      }

      function _log(t, msgSuc, msgFail) {
        return _logOnSuccess(_logOnFail(t, msgFail), msgSuc);
      }
      /***/

    },

    /***/
    37771:
    /*!*****************************************!*\
      !*** ./src/app/models/templateModel.ts ***!
      \*****************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "convertModel": function convertModel() {
          return (
            /* binding */
            _convertModel
          );
        },

        /* harmony export */
        "convertSelectables": function convertSelectables() {
          return (
            /* binding */
            _convertSelectables
          );
        },

        /* harmony export */
        "convertCheckBox": function convertCheckBox() {
          return (
            /* binding */
            _convertCheckBox
          );
        },

        /* harmony export */
        "convertGroup": function convertGroup() {
          return (
            /* binding */
            _convertGroup
          );
        },

        /* harmony export */
        "convertOption": function convertOption() {
          return (
            /* binding */
            _convertOption
          );
        },

        /* harmony export */
        "convertBlock": function convertBlock() {
          return (
            /* binding */
            _convertBlock
          );
        },

        /* harmony export */
        "convertEnum": function convertEnum() {
          return (
            /* binding */
            _convertEnum
          );
        },

        /* harmony export */
        "convertCond": function convertCond() {
          return (
            /* binding */
            _convertCond
          );
        },

        /* harmony export */
        "convertCategory": function convertCategory() {
          return (
            /* binding */
            _convertCategory
          );
        },

        /* harmony export */
        "convertVariables": function convertVariables() {
          return (
            /* binding */
            _convertVariables
          );
        },

        /* harmony export */
        "convertVariable": function convertVariable() {
          return (
            /* binding */
            _convertVariable
          );
        },

        /* harmony export */
        "splitKeywords": function splitKeywords() {
          return (
            /* binding */
            _splitKeywords
          );
        },

        /* harmony export */
        "splitKeywordsArray": function splitKeywordsArray() {
          return (
            /* binding */
            _splitKeywordsArray
          );
        }
        /* harmony export */

      });

      function _convertModel(oldModel) {
        var newParts = [];

        var _iterator52 = _createForOfIteratorHelper(oldModel),
            _step52;

        try {
          for (_iterator52.s(); !(_step52 = _iterator52.n()).done;) {
            var part = _step52.value;

            if (part.kind === "category") {
              newParts.push(_convertCategory(part));
            } else if (part.kind === "block") {
              newParts.push(_convertBlock(part));
            } else if (part.kind === "enumeration") {
              newParts.push(_convertEnum(part));
            } else if (part.kind === "conditional") {
              newParts.push(_convertCond(part));
            }
          }
        } catch (err) {
          _iterator52.e(err);
        } finally {
          _iterator52.f();
        }

        return newParts;
      }

      function _convertSelectables(oldSels) {
        var newSels = [];

        var _iterator53 = _createForOfIteratorHelper(oldSels),
            _step53;

        try {
          for (_iterator53.s(); !(_step53 = _iterator53.n()).done;) {
            var oldSel = _step53.value;
            var newSel = void 0;

            if (oldSel.kind === "box") {
              newSel = _convertCheckBox(oldSel);
            } else if (oldSel.kind === "group") {
              newSel = _convertGroup(oldSel);
            }

            newSels.push(newSel);
          }
        } catch (err) {
          _iterator53.e(err);
        } finally {
          _iterator53.f();
        }

        return newSels;
      }

      function _convertCheckBox(oldBox) {
        var newVariables = _convertVariables(oldBox.variables);

        var keywords = _splitKeywords(oldBox.data["bau"][0], ";");

        return {
          kind: oldBox.kind,
          name: oldBox.name,
          value: oldBox.value,
          text: oldBox.text,
          judgementText: oldBox.judgementText,
          enumeration: oldBox.enumeration,
          normal: oldBox.normal,
          variables: newVariables,
          keys: keywords
        };
      }

      function _convertGroup(oldGroup) {
        var newOpts = [];

        var _iterator54 = _createForOfIteratorHelper(oldGroup.options),
            _step54;

        try {
          for (_iterator54.s(); !(_step54 = _iterator54.n()).done;) {
            var oldOpt = _step54.value;
            newOpts.push(_convertOption(oldOpt));
          }
        } catch (err) {
          _iterator54.e(err);
        } finally {
          _iterator54.f();
        }

        return {
          kind: oldGroup.kind,
          name: oldGroup.name,
          options: newOpts,
          value: oldGroup.value
        };
      }

      function _convertOption(oldOpt) {
        var newVariables = _convertVariables(oldOpt.variables);

        var keys = _splitKeywords(oldOpt.data["bau"][0], ";");

        return {
          kind: oldOpt.kind,
          name: oldOpt.name,
          text: oldOpt.text,
          judgementText: oldOpt.judgementText,
          normal: oldOpt.normal,
          variables: newVariables,
          keys: keys
        };
      }

      function _convertBlock(oldBlock) {
        return {
          kind: oldBlock.kind,
          text: oldBlock.text,
          judgementText: oldBlock.judgementText
        };
      }

      function _convertEnum(oldEnum) {
        return {
          kind: oldEnum.kind,
          text: oldEnum.text,
          judgementText: oldEnum.judgementText,
          id: oldEnum.id
        };
      }

      function _convertCond(oldCond) {
        return {
          kind: oldCond.kind,
          precondition: oldCond.precondition,
          normalText: oldCond.normalText,
          judgementText: oldCond.judgementText
        };
      }

      function _convertCategory(oldCat) {
        var newSels = _convertSelectables(oldCat.selectables);

        return {
          kind: oldCat.kind,
          name: oldCat.name,
          optional: oldCat.optional,
          selectables: newSels
        };
      }

      function _convertVariables(oldVars) {
        var newVars = [];

        var _iterator55 = _createForOfIteratorHelper(oldVars),
            _step55;

        try {
          for (_iterator55.s(); !(_step55 = _iterator55.n()).done;) {
            var variable = _step55.value;
            newVars.push(_convertVariable(variable));
          }
        } catch (err) {
          _iterator55.e(err);
        } finally {
          _iterator55.f();
        }

        return newVars;
      }

      function _convertVariable(oldVar) {
        var newVar;

        if (oldVar.kind === "oc") {
          var keys = _splitKeywordsArray(oldVar.data["syn"][0], "/", ";");

          newVar = {
            kind: oldVar.kind,
            id: oldVar.id,
            textBefore: oldVar.textBefore,
            textAfter: oldVar.textAfter,
            keys: keys,
            value: oldVar.value,
            values: oldVar.values
          };
        } else if (oldVar.kind === "mc") {
          var _keys = _splitKeywordsArray(oldVar.data["syn"][0], ";", ",");

          newVar = {
            kind: oldVar.kind,
            id: oldVar.id,
            textBefore: oldVar.textBefore,
            textAfter: oldVar.textAfter,
            keys: _keys,
            values: oldVar.values
          };
        } else if (oldVar.kind === "text") {
          newVar = {
            kind: oldVar.kind,
            id: oldVar.id,
            textBefore: oldVar.textBefore,
            textAfter: oldVar.textAfter,
            keys: null,
            value: oldVar.value
          };
        } else if (oldVar.kind === "number") {
          newVar = {
            kind: oldVar.kind,
            id: oldVar.id,
            textBefore: oldVar.textBefore,
            textAfter: oldVar.textAfter,
            keys: null,
            value: oldVar.value
          };
        } else if (oldVar.kind === "date") {
          newVar = {
            kind: oldVar.kind,
            id: oldVar.id,
            textBefore: oldVar.textBefore,
            textAfter: oldVar.textAfter,
            keys: null,
            value: oldVar.value
          };
        } else if (oldVar.kind === "ratio") {
          newVar = {
            kind: oldVar.kind,
            id: oldVar.id,
            textBefore: oldVar.textBefore,
            textAfter: oldVar.textAfter,
            keys: null,
            numerator: oldVar.numerator,
            denominator: oldVar.denominator,
            fractionDigits: oldVar.fractionDigits
          };
        }

        return newVar;
      }

      function _splitKeywords(keywords, splitter) {
        if (keywords) {
          return keywords.split(splitter);
        } else {
          return null;
        }
      }

      function _splitKeywordsArray(keys, optionSplitter, synonymSplitter) {
        var result = [];

        var variableSplit = _splitKeywords(keys, optionSplitter);

        if (variableSplit) {
          var _iterator56 = _createForOfIteratorHelper(variableSplit),
              _step56;

          try {
            for (_iterator56.s(); !(_step56 = _iterator56.n()).done;) {
              var varSynonyms = _step56.value;

              var synSplit = _splitKeywords(varSynonyms, synonymSplitter);

              synSplit.map(function (key) {
                return key.trim();
              });
              result.push(synSplit);
            }
          } catch (err) {
            _iterator56.e(err);
          } finally {
            _iterator56.f();
          }
        } else {
          return null;
        }

        return result;
      }
      /***/

    },

    /***/
    65783:
    /*!********************************!*\
      !*** ./src/app/models/user.ts ***!
      \********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "User": function User() {
          return (
            /* binding */
            _User
          );
        }
        /* harmony export */

      });

      var _User = function _User() {
        _classCallCheck(this, _User);
      };
      /***/

    },

    /***/
    22887:
    /*!*******************************************************************!*\
      !*** ./src/app/shared/confirm-dialog/confirm-dialog.component.ts ***!
      \*******************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ConfirmDialogComponent": function ConfirmDialogComponent() {
          return (
            /* binding */
            _ConfirmDialogComponent
          );
        },

        /* harmony export */
        "ConfirmDialogModel": function ConfirmDialogModel() {
          return (
            /* binding */
            _ConfirmDialogModel
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/material/dialog */
      18931);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_material_divider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/material/divider */
      16176);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      40093);

      function ConfirmDialogComponent_div_7_Template(rf, ctx) {
        if (rf & 1) {
          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmDialogComponent_div_7_Template_button_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);

            var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r2.onConfirm();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Best\xE4tigen");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmDialogComponent_div_7_Template_button_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r4.onDismiss();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Abbrechen");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function ConfirmDialogComponent_div_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmDialogComponent_div_8_Template_button_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r5.onConfirm();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Best\xE4tigen");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmDialogComponent_div_8_Template_button_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r7.onDismiss();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Abbrechen");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      var _ConfirmDialogComponent = /*#__PURE__*/function () {
        function _ConfirmDialogComponent(dialogRef, data) {
          _classCallCheck(this, _ConfirmDialogComponent);

          this.dialogRef = dialogRef;
          this.data = data;
        }

        _createClass(_ConfirmDialogComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.type = this.data.type;
            this.title = this.data.title;
            this.message = this.data.message;
          }
        }, {
          key: "onConfirm",
          value: function onConfirm() {
            this.dialogRef.close(true);
          }
        }, {
          key: "onDismiss",
          value: function onDismiss() {
            this.dialogRef.close(false);
          }
        }]);

        return _ConfirmDialogComponent;
      }();

      _ConfirmDialogComponent.ɵfac = function ConfirmDialogComponent_Factory(t) {
        return new (t || _ConfirmDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA));
      };

      _ConfirmDialogComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _ConfirmDialogComponent,
        selectors: [["app-confirm-dialog"]],
        decls: 9,
        vars: 4,
        consts: [["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "content"], ["mat-dialog-actions", "", "class", "buttons", 4, "ngIf"], ["mat-dialog-actions", "", 1, "buttons"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-outline-secondary", "cancelButton", 3, "click"], [1, "btn", "btn-danger", 3, "click"]],
        template: function ConfirmDialogComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h5", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-divider");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "mat-divider");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ConfirmDialogComponent_div_7_Template, 5, 0, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ConfirmDialogComponent_div_8_Template, 5, 0, "div", 2);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.title, "\n");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.message);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.type === "confirm");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.type === "warning");
          }
        },
        directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogTitle, _angular_material_divider__WEBPACK_IMPORTED_MODULE_2__.MatDivider, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogActions],
        styles: [".buttons[_ngcontent-%COMP%] {\n  float: right;\n}\n\nh5[_ngcontent-%COMP%] {\n  -webkit-margin-after: 5px;\n          margin-block-end: 5px;\n}\n\n.content[_ngcontent-%COMP%] {\n  -webkit-margin-before: 8px;\n          margin-block-start: 8px;\n  -webkit-margin-after: 2px;\n          margin-block-end: 2px;\n  margin-bottom: 0;\n}\n\n.cancelButton[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7VUFBQSxxQkFBQTtBQUNGOztBQUVBO0VBQ0UsMEJBQUE7VUFBQSx1QkFBQTtFQUNBLHlCQUFBO1VBQUEscUJBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7QUFDRiIsImZpbGUiOiJjb25maXJtLWRpYWxvZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idXR0b25zIHtcclxuICBmbG9hdDogcmlnaHQ7XHJcbn1cclxuXHJcbmg1IHtcclxuICBtYXJnaW4tYmxvY2stZW5kOiA1cHg7XHJcbn1cclxuXHJcbi5jb250ZW50IHtcclxuICBtYXJnaW4tYmxvY2stc3RhcnQ6IDhweDtcclxuICBtYXJnaW4tYmxvY2stZW5kOiAycHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMDtcclxufVxyXG5cclxuLmNhbmNlbEJ1dHRvbiB7XHJcbiAgbWFyZ2luLWxlZnQ6IDVweDtcclxufVxyXG4iXX0= */"]
      });

      var _ConfirmDialogModel = function _ConfirmDialogModel(type, title, message) {
        _classCallCheck(this, _ConfirmDialogModel);

        this.type = type;
        this.title = title;
        this.message = message;
      };
      /***/

    },

    /***/
    22621:
    /*!*****************************************************************!*\
      !*** ./src/app/shared/image-display/image-display.component.ts ***!
      \*****************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ImageDisplayComponent": function ImageDisplayComponent() {
          return (
            /* binding */
            _ImageDisplayComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _app_core_services_popout_tokens__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/core/services/popout.tokens */
      36366);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      82516);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      79902);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      22663);
      /* harmony import */


      var _env_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @env/environment */
      92340);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _app_core_services_mat_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @app/core/services/mat-dialog.service */
      94755);
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/material/dialog */
      18931);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/common */
      40093);
      /* harmony import */


      var _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/material/divider */
      16176);
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/material/input */
      95076);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/forms */
      59298);

      var _c0 = ["drawLayer"];
      var _c1 = ["labelLayer"];
      var _c2 = ["deleteLayer"];
      var _c3 = ["editLayer"];
      var _c4 = ["labelDialog"];
      var _c5 = ["sourceImage"];
      var _c6 = ["zoomDiv"];
      var _c7 = ["lensContainer"];

      function ImageDisplayComponent_button_12_Template(rf, ctx) {
        if (rf & 1) {
          var _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ImageDisplayComponent_button_12_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r12.toggleDelete();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "L\xF6schen aktivieren");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx_r0.enableDelete ? "btn-success" : "btn-outline-success");
        }
      }

      function ImageDisplayComponent_button_13_Template(rf, ctx) {
        if (rf & 1) {
          var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ImageDisplayComponent_button_13_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r15);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r14.toggleEditor();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Editor aktivieren");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx_r1.enableEdit ? "btn-success" : "btn-outline-success");
        }
      }

      function ImageDisplayComponent_button_14_Template(rf, ctx) {
        if (rf & 1) {
          var _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ImageDisplayComponent_button_14_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r17);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r16.saveNewBox();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Box Speichern");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
      }

      var _c8 = function _c8(a0, a1) {
        return {
          "width.px": a0,
          "height.px": a1
        };
      };

      function ImageDisplayComponent_div_22_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", null, 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "div", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](1, _c8, ctx_r6.currentWidth, ctx_r6.currentHeight));
        }
      }

      function ImageDisplayComponent_canvas_23_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "canvas", 24, 25);
        }

        if (rf & 2) {
          var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("width", ctx_r7.currentWidth);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("height", ctx_r7.currentHeight);
        }
      }

      function ImageDisplayComponent_canvas_24_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "canvas", 26, 27);
        }

        if (rf & 2) {
          var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("width", ctx_r8.currentWidth);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("height", ctx_r8.currentHeight);
        }
      }

      function ImageDisplayComponent_ng_template_27_Template(rf, ctx) {
        if (rf & 1) {
          var _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h4", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Label-Dialog");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "mat-divider");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "mat-dialog-content", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Neues Label eingeben:");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "input", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function ImageDisplayComponent_ng_template_27_Template_input_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r22);

            var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r21.newLabel = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "mat-divider");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "mat-dialog-actions", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "button", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ImageDisplayComponent_ng_template_27_Template_button_click_9_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r22);

            var ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r23.save();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Speichern");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "button", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ImageDisplayComponent_ng_template_27_Template_button_click_11_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r22);

            var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r24.close();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "Abbrechen");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r11.newLabel);
        }
      }

      var _c9 = function _c9(a0, a1, a2) {
        return {
          "btn-warning": a0,
          "btn-primary": a1,
          "btn-outline-primary": a2
        };
      };

      var BOX_LINE_WIDTH = 5;
      var DISPLAY_BOX_COLOR = "blue";
      var EDIT_BOX_COLOR = "green";
      var TEXT_COLOR = "#98FF98";
      var MAX_IMAGE_HEIGHT = 900;

      var _ImageDisplayComponent = /*#__PURE__*/function () {
        function _ImageDisplayComponent(data, dialogService, dialog) {
          _classCallCheck(this, _ImageDisplayComponent);

          this.data = data;
          this.dialogService = dialogService;
          this.dialog = dialog;
          this.serverUrl = _env_environment__WEBPACK_IMPORTED_MODULE_1__.environment.backend;
          this.currentScaleFactor = 1.0;
          this.startX = 0;
          this.startY = 0;
          this.width = 0;
          this.height = 0;
          this.newLabel = "";
          this.restricted = true;
        }

        _createClass(_ImageDisplayComponent, [{
          key: "deleteLayer",
          set: function set(layer) {
            if (this.enableDelete) {
              this.deleteLayerElement = layer.nativeElement;
              this.deleteContext = this.deleteLayerElement.getContext("2d");
              this.addDeleteListeners();
            }
          }
        }, {
          key: "editLayer",
          set: function set(layer) {
            if (this.enableEdit) {
              this.editLayerElement = layer.nativeElement;
              this.editContext = this.editLayerElement.getContext("2d");
              this.rectangleDrawing();
            }
          }
        }, {
          key: "zoom",
          set: function set(container) {
            if (this.enableZoom) {
              var containerElement = container.nativeElement;
              this.zoomLayerElement = containerElement.children[1];
              this.lensElement = containerElement.children[0];
              this.imageZoom();
            }
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.scans = this.data.scans;
            this.coordinates = this.data.coordinates;

            if (this.data.restricted !== undefined) {
              this.restricted = this.data.restricted;
            }

            this.displayBoxes = false;
            this.enableEdit = false;
            this.enableDelete = false;
            this.initMain();
          }
        }, {
          key: "isAllowed",
          get: function get() {
            return !this.restricted;
          }
        }, {
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            this.drawLayerElement = this.drawLayer.nativeElement;
            this.drawContext = this.drawLayerElement.getContext("2d");
            this.labelLayerElement = this.labelLayer.nativeElement;
            this.labelContext = this.labelLayerElement.getContext("2d");
          }
        }, {
          key: "initMain",
          value: function initMain() {
            this.currentMode = "main";
            this.setCurrentImage();
            this.setCurrentDimensions();
          }
        }, {
          key: "setCanvasProperties",
          value: function setCanvasProperties(context, lineWidth, lineCap, strokeStyle) {
            context.lineWidth = lineWidth;
            context.lineCap = lineCap;
            context.strokeStyle = strokeStyle;
          }
        }, {
          key: "clearCanvas",
          value: function clearCanvas() {
            this.drawContext.clearRect(0, 0, this.drawLayerElement.width, this.drawLayerElement.height);
            this.labelContext.clearRect(0, 0, this.labelLayerElement.width, this.labelLayerElement.height);
          }
        }, {
          key: "setCurrentImage",
          value: function setCurrentImage() {
            var filename = this.scans[this.currentMode + "Scan"].filename;
            this.currentScanUrl = this.serverUrl + this.scans.id + "/" + filename;
          }
        }, {
          key: "setCurrentDimensions",
          value: function setCurrentDimensions() {
            var _this23 = this;

            var img = new Image();
            img.src = this.currentScanUrl;

            img.onload = function (event) {
              var loadedImage = event.currentTarget;

              if (loadedImage.height <= MAX_IMAGE_HEIGHT) {
                _this23.currentScaleFactor = 1.0;
                _this23.currentHeight = loadedImage.height;
                _this23.currentWidth = loadedImage.width;
              } else {
                _this23.currentScaleFactor = MAX_IMAGE_HEIGHT / loadedImage.height;
                _this23.currentHeight = MAX_IMAGE_HEIGHT;
                _this23.currentWidth = loadedImage.width * _this23.currentScaleFactor;
              }
            };
          }
        }, {
          key: "changeMode",
          value: function changeMode(mode) {
            this.currentMode = mode;
            this.enableDelete = false;
            this.setCurrentImage();
            this.setCurrentDimensions();

            if (this.displayBoxes) {
              this.drawBoxes();
            }
          }
        }, {
          key: "toggleBoxes",
          value: function toggleBoxes() {
            this.displayBoxes = !this.displayBoxes;
            this.clearCanvas();

            if (this.enableDelete) {
              this.enableDelete = false;
            }

            if (this.displayBoxes) {
              this.drawBoxes();
            }
          }
        }, {
          key: "toggleDelete",
          value: function toggleDelete() {
            if (!this.displayBoxes) {
              this.toggleBoxes();
            }

            this.enableDelete = !this.enableDelete;
          }
        }, {
          key: "toggleEditor",
          value: function toggleEditor() {
            this.enableEdit = !this.enableEdit;
          }
        }, {
          key: "toggleZoom",
          value: function toggleZoom() {
            this.enableZoom = !this.enableZoom;

            if (this.enableDelete) {
              this.toggleDelete();
            }

            if (this.enableEdit) {
              this.toggleEditor();
            }
          }
        }, {
          key: "drawBoxes",
          value: function drawBoxes() {
            this.clearCanvas();
            var coordinates = this.coordinates[this.currentMode];

            var _iterator57 = _createForOfIteratorHelper(coordinates),
                _step57;

            try {
              for (_iterator57.s(); !(_step57 = _iterator57.n()).done;) {
                var bbox = _step57.value;
                this.drawRect(this.drawContext, bbox, DISPLAY_BOX_COLOR);
                this.addLabel(bbox);
              }
            } catch (err) {
              _iterator57.e(err);
            } finally {
              _iterator57.f();
            }
          }
        }, {
          key: "addDeleteListeners",
          value: function addDeleteListeners() {
            var _this24 = this;

            var coordinates = this.coordinates[this.currentMode];
            var rect = this.drawLayerElement.getBoundingClientRect();
            var parent = this;

            var _iterator58 = _createForOfIteratorHelper(coordinates),
                _step58;

            try {
              var _loop2 = function _loop2() {
                var bbox = _step58.value;
                console.log(bbox);

                _this24.deleteLayerElement.addEventListener("mousemove", function (e) {
                  var x = bbox.left * parent.currentScaleFactor;
                  var y = bbox.top * parent.currentScaleFactor;
                  var w = bbox.width * parent.currentScaleFactor;
                  var h = bbox.height * parent.currentScaleFactor;

                  if (x <= e.clientX - rect.left && e.clientX - rect.left <= x + w && y <= e.clientY - rect.top && e.clientY - rect.top <= y + h) {
                    parent.drawRect(_this24.deleteContext, bbox, "red");
                  } else {
                    parent.drawRect(_this24.deleteContext, bbox, "blue");
                  }
                });

                _this24.deleteLayerElement.addEventListener("click", function (e) {
                  var x = bbox.left * parent.currentScaleFactor;
                  var y = bbox.top * parent.currentScaleFactor;
                  var w = bbox.width * parent.currentScaleFactor;
                  var h = bbox.height * parent.currentScaleFactor;

                  if (x <= e.clientX - rect.left && e.clientX - rect.left <= x + w && y <= e.clientY - rect.top && e.clientY - rect.top <= y + h) {
                    console.log("It works!");
                    parent.removeAlert(bbox);
                  }
                });
              };

              for (_iterator58.s(); !(_step58 = _iterator58.n()).done;) {
                _loop2();
              }
            } catch (err) {
              _iterator58.e(err);
            } finally {
              _iterator58.f();
            }
          }
        }, {
          key: "removeAlert",
          value: function removeAlert(bbox) {
            var result = parent.confirm("Soll diese Box (Label: " + bbox.label + ") wirklich gelöscht werden?");

            if (result) {
              var idx = this.coordinates[this.currentMode].indexOf(bbox);
              this.coordinates[this.currentMode].splice(idx, 1);
              this.drawBoxes();
              this.enableDelete = false;
            }
          }
        }, {
          key: "drawRect",
          value: function drawRect(context, bbox, color) {
            this.setCanvasProperties(context, BOX_LINE_WIDTH, "square", color);
            context.beginPath();
            context.rect(bbox.left * this.currentScaleFactor, bbox.top * this.currentScaleFactor, bbox.width * this.currentScaleFactor, bbox.height * this.currentScaleFactor);
            context.stroke();
          }
        }, {
          key: "addLabel",
          value: function addLabel(bbox) {
            this.labelContext.font = "bold 18pt Arial";
            this.labelContext.fillStyle = TEXT_COLOR;
            this.labelContext.strokeStyle = "black";
            this.labelContext.lineWidth = 1;
            this.labelContext.fillText(bbox.label, this.currentScaleFactor * bbox.left, this.currentScaleFactor * bbox.top + this.currentScaleFactor * bbox.height + BOX_LINE_WIDTH + 20);
            this.labelContext.strokeText(bbox.label, this.currentScaleFactor * bbox.left, this.currentScaleFactor * bbox.top + this.currentScaleFactor * bbox.height + BOX_LINE_WIDTH + 20);
          }
        }, {
          key: "rectangleDrawing",
          value: function rectangleDrawing() {
            var _this25 = this;

            var rect = this.editLayerElement.getBoundingClientRect();
            (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(this.editLayerElement, "mousedown").pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(function (e) {
              rect = _this25.editLayerElement.getBoundingClientRect();
              _this25.startX = e.clientX - rect.left;
              _this25.startY = e.clientY - rect.top;
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(_this25.editLayerElement, "mousemove").pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)((0, rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(_this25.editLayerElement, "mouseup")), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)((0, rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(_this25.editLayerElement, "mouseleave")));
            })).subscribe(function (event) {
              var x = event.clientX - rect.left;
              var y = event.clientY - rect.top;
              _this25.width = x - _this25.startX;
              _this25.height = y - _this25.startY;

              _this25.setCanvasProperties(_this25.editContext, BOX_LINE_WIDTH, "square", EDIT_BOX_COLOR);

              _this25.editContext.beginPath();

              _this25.editContext.clearRect(0, 0, _this25.editLayerElement.width, _this25.editLayerElement.height);

              _this25.editContext.rect(_this25.startX, _this25.startY, _this25.width, _this25.height);

              _this25.editContext.stroke();
            });
          }
        }, {
          key: "saveNewBox",
          value: function saveNewBox() {
            var _this26 = this;

            if (!(this.width === 0 || this.height === 0)) {
              var dialogConfig = this.dialogService.defaultConfig("470px");
              this.dialogRef = this.dialog.open(this.labelDialog, dialogConfig);
              this.dialogRef.afterClosed().subscribe(function (val) {
                if (val && _this26.newLabel.length > 0) {
                  _this26.fixNegativeCoordinates();

                  _this26.coordinates[_this26.currentMode].push({
                    left: _this26.startX / _this26.currentScaleFactor,
                    top: _this26.startY / _this26.currentScaleFactor,
                    height: _this26.height / _this26.currentScaleFactor,
                    width: _this26.width / _this26.currentScaleFactor,
                    label: _this26.newLabel
                  });

                  _this26.editContext.clearRect(0, 0, _this26.editLayerElement.width, _this26.editLayerElement.height);

                  _this26.newLabel = "";
                  _this26.width = 0;
                  _this26.height = 0;

                  if (_this26.displayBoxes) {
                    _this26.drawBoxes();
                  }
                }
              });
            }
          }
        }, {
          key: "close",
          value: function close() {
            this.newLabel = "";
            this.dialogRef.close(false);
          }
        }, {
          key: "save",
          value: function save() {
            this.dialogRef.close(true);
          }
        }, {
          key: "imageZoom",
          value: function imageZoom() {
            var img = this.sourceImage.nativeElement;
            var result = this.zoomDiv.nativeElement; // calculate ratio between result div and lens

            var cx = result.offsetWidth / this.lensElement.offsetWidth;
            var cy = result.offsetHeight / this.lensElement.offsetHeight; // Set background properties for the result div

            result.style.backgroundImage = "url('" + img.src + "')";
            result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px"; // Execute a function when someone moves the cursor over the image or the lens

            this.lensElement.addEventListener("mousemove", moveLens);
            this.zoomLayerElement.addEventListener("mousemove", moveLens);
            var parent = this; // eslint-disable-next-line prefer-arrow/prefer-arrow-functions

            function moveLens(e) {
              var x;
              var y; // Prevent any other actions that may occur when moving over the image

              e.preventDefault(); // Get the cursor's x and y positions:

              var pos = getCursorPos(e); // Calculate the position of the lens:

              x = pos.x - parent.lensElement.offsetWidth / 2;
              y = pos.y - parent.lensElement.offsetHeight / 2; // Prevent the lens from being positioned outside the image:

              if (x > img.width - parent.lensElement.offsetWidth) {
                x = img.width - parent.lensElement.offsetWidth;
              }

              if (x < 0) {
                x = 0;
              }

              if (y > img.height - parent.lensElement.offsetHeight) {
                y = img.height - parent.lensElement.offsetHeight;
              }

              if (y < 0) {
                y = 0;
              } // Set the position of the lens:


              parent.lensElement.style.left = x + "px";
              parent.lensElement.style.top = y + "px"; // Display what the lens "sees":

              result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
            } // eslint-disable-next-line prefer-arrow/prefer-arrow-functions


            function getCursorPos(e) {
              var x = 0;
              var y = 0; // Get the x and y positions of the image

              var a = img.getBoundingClientRect(); // Calculate the cursor's x and y coordinates, relative to the image:

              x = e.pageX - a.left;
              y = e.pageY - a.top; // Consider any page scrolling

              x = x - window.pageXOffset;
              y = y - window.pageYOffset;
              return {
                x: x,
                y: y
              };
            }
          }
        }, {
          key: "fixNegativeCoordinates",
          value: function fixNegativeCoordinates() {
            // in case the box is drawn from bottom right to top left: adjust negative width and height
            if (this.width < 0) {
              this.width = -this.width;
              this.startX = this.startX - this.width;
            }

            if (this.height < 0) {
              this.height = -this.height;
              this.startY = this.startY - this.height;
            }
          }
        }]);

        return _ImageDisplayComponent;
      }();

      _ImageDisplayComponent.ɵfac = function ImageDisplayComponent_Factory(t) {
        return new (t || _ImageDisplayComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_app_core_services_popout_tokens__WEBPACK_IMPORTED_MODULE_0__.POPOUT_MODAL_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_app_core_services_mat_dialog_service__WEBPACK_IMPORTED_MODULE_2__.MatDialogService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialog));
      };

      _ImageDisplayComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _ImageDisplayComponent,
        selectors: [["app-image-display"]],
        viewQuery: function ImageDisplayComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c1, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c2, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c3, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c4, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c5, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c6, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c7, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.drawLayer = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.labelLayer = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.deleteLayer = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.editLayer = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.labelDialog = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.sourceImage = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.zoomDiv = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.zoom = _t.first);
          }
        },
        decls: 29,
        vars: 36,
        consts: [[2, "background", "hsl(202, 73%, 96%)", "margin", "5px", "border-radius", "5px", "border", "1px solid hsl(200, 70%, 80%)", "grid-column-gap", "5px", "grid-template-columns", "220px 1000px 600px", "display", "grid", "align-content", "center"], [2, "display", "block", "margin", "20px"], [1, "btn", 2, "width", "180px", "margin", "2px", "padding", "10px", 3, "ngClass", "click"], [1, "btn", 2, "width", "180px", "margin", "2px", "padding", "10px", 3, "ngClass", "disabled", "click"], [1, "btn", "btn-outline-primary", 2, "width", "180px", "margin", "2px", "padding", "10px", 3, "ngClass", "disabled", "click"], ["class", "btn", "style", "width: 180px; margin: 2px; padding: 10px;", 3, "ngClass", "click", 4, "ngIf"], ["class", "btn btn-outline-success", "style", "width: 180px; margin: 2px; padding: 10px;", 3, "click", 4, "ngIf"], [2, "position", "relative", "margin", "5px", 3, "ngStyle"], ["id", "sourceImage", "alt", "Fehler beim Laden der Aufnahme", 1, "image", 2, "position", "absolute", "left", "0", "top", "0", "z-index", "0", 3, "height", "width", "src"], ["sourceImage", ""], ["id", "drawCanvas", 2, "position", "absolute", "left", "0", "top", "0", "z-index", "1", 3, "width", "height"], ["drawLayer", ""], ["id", "labelCanvas", 2, "position", "absolute", "left", "0", "top", "0", "z-index", "1", 3, "width", "height"], ["labelLayer", ""], [4, "ngIf"], ["style", "position: absolute; left: 0; top: 0; z-index: 3", "id", "deleteCanvas", 3, "width", "height", 4, "ngIf"], ["style", "position: absolute; left: 0; top: 0; z-index: 3", "id", "editCanvas", 3, "width", "height", 4, "ngIf"], ["id", "zoom", 2, "margin", "20px", "width", "600px", "height", "600px", "border", "1px solid #d4d4d4"], ["zoomDiv", ""], ["labelDialog", ""], [1, "btn", "btn-outline-success", 2, "width", "180px", "margin", "2px", "padding", "10px", 3, "click"], ["lensContainer", ""], ["id", "lens", 2, "position", "absolute", "border", "1px solid #d4d4d4", "width", "300px", "height", "300px"], ["id", "zoomCanvas", 2, "position", "absolute", "left", "0", "top", "0", "z-index", "2", 3, "ngStyle"], ["id", "deleteCanvas", 2, "position", "absolute", "left", "0", "top", "0", "z-index", "3", 3, "width", "height"], ["deleteLayer", ""], ["id", "editCanvas", 2, "position", "absolute", "left", "0", "top", "0", "z-index", "3", 3, "width", "height"], ["editLayer", ""], ["matDialogTitle", "", 2, "margin-bottom", "5px"], [2, "margin", "10px 0"], [2, "margin", "0"], ["matInput", "", "type", "text", "id", "labelInput", 2, "margin", "0", 3, "ngModel", "ngModelChange"], [2, "float", "right"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-outline-secondary", 2, "margin-left", "3px", 3, "click"]],
        template: function ImageDisplayComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ImageDisplayComponent_Template_button_click_2_listener() {
              return ctx.changeMode("main");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Hauptaufnahme");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ImageDisplayComponent_Template_button_click_4_listener() {
              return ctx.changeMode("lateral");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Lateralaufnahme");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "button", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ImageDisplayComponent_Template_button_click_6_listener() {
              return ctx.changeMode("pre");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Voraufnahme");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ImageDisplayComponent_Template_button_click_8_listener() {
              return ctx.toggleBoxes();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Boxen anzeigen");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ImageDisplayComponent_Template_button_click_10_listener() {
              return ctx.toggleZoom();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Toggle Zoom");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, ImageDisplayComponent_button_12_Template, 2, 1, "button", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, ImageDisplayComponent_button_13_Template, 2, 1, "button", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, ImageDisplayComponent_button_14_Template, 2, 0, "button", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](16, "img", 8, 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "canvas", 10, 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](20, "canvas", 12, 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](22, ImageDisplayComponent_div_22_Template, 4, 4, "div", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](23, ImageDisplayComponent_canvas_23_Template, 2, 2, "canvas", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, ImageDisplayComponent_canvas_24_Template, 2, 2, "canvas", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](25, "div", 17, 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](27, ImageDisplayComponent_ng_template_27_Template, 13, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction3"](21, _c9, ctx.displayBoxes && ctx.coordinates.main.length > 0 && ctx.currentMode !== "main", ctx.currentMode === "main", ctx.currentMode !== "main"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction3"](25, _c9, ctx.displayBoxes && ctx.coordinates.lateral.length > 0 && ctx.currentMode !== "lateral", ctx.currentMode === "lateral", ctx.currentMode !== "lateral"))("disabled", ctx.scans.lateralScan === undefined);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction3"](29, _c9, ctx.displayBoxes && ctx.coordinates.pre.length > 0 && ctx.currentMode !== "pre", ctx.currentMode === "pre", ctx.currentMode !== "pre"))("disabled", ctx.scans.preScan === undefined);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx.displayBoxes ? "btn-success" : "btn-outline-success");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx.enableZoom ? "btn-success" : "btn-outline-success");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isAllowed);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isAllowed);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isAllowed && ctx.enableEdit);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](33, _c8, ctx.currentWidth, ctx.currentHeight));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("height", ctx.currentHeight);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("width", ctx.currentWidth);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("src", ctx.currentScanUrl, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("width", ctx.currentWidth + 50);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("height", ctx.currentHeight + 50);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("width", ctx.currentWidth + 50);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("height", ctx.currentHeight + 50);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.enableZoom);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.enableDelete);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.enableEdit);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgStyle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogTitle, _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__.MatDivider, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogContent, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgModel, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogActions],
        styles: ["body[_ngcontent-%COMP%] {\n  text-align: center;\n  background: #f2f6f8;\n}\n\n.columns[_ngcontent-%COMP%] {\n  height: 100%;\n  display: grid;\n  grid-template-columns: 10% 90%;\n  grid-column-gap: 5px;\n  grid-template-areas: \"button image-container\";\n}\n\n.imageContainer[_ngcontent-%COMP%] {\n  grid-area: image-container;\n  display: inline-block;\n  margin: 20px 60px;\n  border: 1px solid blue;\n}\n\n.insideWrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n\n.image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.displayCanvas[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  position: absolute;\n}\n\n.button[_ngcontent-%COMP%] {\n  grid-area: button;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLWRpc3BsYXkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLDhCQUFBO0VBQ0Esb0JBQUE7RUFDQSw2Q0FDRTtBQUFKOztBQUdBO0VBQ0UsMEJBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7QUFBRjs7QUFHQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFBRjs7QUFHQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtBQUFGOztBQUdBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLGtCQUFBO0FBQUY7O0FBSUE7RUFDRSxpQkFBQTtBQURGIiwiZmlsZSI6ImltYWdlLWRpc3BsYXkuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib2R5IHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDogI2YyZjZmODt9XHJcbi8vLmltZ3twb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjE7fVxyXG5cclxuLmNvbHVtbnMge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMTAlIDkwJTtcclxuICBncmlkLWNvbHVtbi1nYXA6IDVweDtcclxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxyXG4gICAgXCJidXR0b24gaW1hZ2UtY29udGFpbmVyXCI7XHJcbn1cclxuXHJcbi5pbWFnZUNvbnRhaW5lciB7XHJcbiAgZ3JpZC1hcmVhOiBpbWFnZS1jb250YWluZXI7XHJcbiAgZGlzcGxheTppbmxpbmUtYmxvY2s7XHJcbiAgbWFyZ2luOiAyMHB4IDYwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgYmx1ZTtcclxufVxyXG5cclxuLmluc2lkZVdyYXBwZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5pbWFnZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxufVxyXG5cclxuLmRpc3BsYXlDYW52YXMge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgLy8gei1pbmRleDogMjA7XHJcbn1cclxuXHJcbi5idXR0b24ge1xyXG4gIGdyaWQtYXJlYTogYnV0dG9uO1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    51679:
    /*!*********************************!*\
      !*** ./src/app/shared/index.ts ***!
      \*********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ConfirmDialogComponent": function ConfirmDialogComponent() {
          return (
            /* reexport safe */
            _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialogComponent
          );
        },

        /* harmony export */
        "ConfirmDialogModel": function ConfirmDialogModel() {
          return (
            /* reexport safe */
            _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialogModel
          );
        },

        /* harmony export */
        "ImageDisplayComponent": function ImageDisplayComponent() {
          return (
            /* reexport safe */
            _image_display_image_display_component__WEBPACK_IMPORTED_MODULE_1__.ImageDisplayComponent
          );
        },

        /* harmony export */
        "InputModalComponent": function InputModalComponent() {
          return (
            /* reexport safe */
            _inputModal_inputModal_component__WEBPACK_IMPORTED_MODULE_2__.InputModalComponent
          );
        },

        /* harmony export */
        "OptionsComponent": function OptionsComponent() {
          return (
            /* reexport safe */
            _options_options_component__WEBPACK_IMPORTED_MODULE_3__.OptionsComponent
          );
        },

        /* harmony export */
        "ReportComponent": function ReportComponent() {
          return (
            /* reexport safe */
            _report_report_component__WEBPACK_IMPORTED_MODULE_4__.ReportComponent
          );
        },

        /* harmony export */
        "UploadComponent": function UploadComponent() {
          return (
            /* reexport safe */
            _upload_upload_component__WEBPACK_IMPORTED_MODULE_5__.UploadComponent
          );
        },

        /* harmony export */
        "UploadMaterialComponent": function UploadMaterialComponent() {
          return (
            /* reexport safe */
            _upload_material_upload_material_component__WEBPACK_IMPORTED_MODULE_6__.UploadMaterialComponent
          );
        },

        /* harmony export */
        "VariablesComponent": function VariablesComponent() {
          return (
            /* reexport safe */
            _variables_variables_component__WEBPACK_IMPORTED_MODULE_7__.VariablesComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./confirm-dialog/confirm-dialog.component */
      22887);
      /* harmony import */


      var _image_display_image_display_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./image-display/image-display.component */
      22621);
      /* harmony import */


      var _inputModal_inputModal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./inputModal/inputModal.component */
      70918);
      /* harmony import */


      var _options_options_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./options/options.component */
      75560);
      /* harmony import */


      var _report_report_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./report/report.component */
      94292);
      /* harmony import */


      var _upload_upload_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./upload/upload.component */
      5141);
      /* harmony import */


      var _upload_material_upload_material_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./upload-material/upload-material.component */
      9434);
      /* harmony import */


      var _variables_variables_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./variables/variables.component */
      69054);
      /***/

    },

    /***/
    70918:
    /*!***********************************************************!*\
      !*** ./src/app/shared/inputModal/inputModal.component.ts ***!
      \***********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "InputModalComponent": function InputModalComponent() {
          return (
            /* binding */
            _InputModalComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/material/dialog */
      18931);
      /* harmony import */


      var _app_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/helpers */
      8807);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      59298);
      /* harmony import */


      var _angular_material_divider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/material/divider */
      16176);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      40093);
      /* harmony import */


      var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/material/form-field */
      63176);
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/material/input */
      95076);
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      95684);

      function InputModalComponent_mat_form_field_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "input", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("placeholder", ctx_r0.data["value"]);
        }
      }

      function InputModalComponent_mat_form_field_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "input", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("placeholder", ctx_r1.data["value"]);
        }
      }

      function InputModalComponent_mat_form_field_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "input", 8, 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InputModalComponent_mat_form_field_8_Template_input_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);

            var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);

            return _r4.toggle();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("placeholder", ctx_r2.data["value"]);
        }
      }

      function InputModalComponent_ng_container_9_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-form-field");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "input", 10, 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, " / ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-form-field");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 12, 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);

          var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](7);

          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" = ", ctx_r3.displayQuotient(_r7.value, _r8.value), " ");
        }
      }

      var _InputModalComponent = /*#__PURE__*/function () {
        function _InputModalComponent(fb, dialogRef, data) {
          _classCallCheck(this, _InputModalComponent);

          this.fb = fb;
          this.dialogRef = dialogRef;
          this.data = data;
        }

        _createClass(_InputModalComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.form = this.fb.group({
              text: "",
              number: null,
              date: null,
              numerator: null,
              denominator: null
            });
          }
        }, {
          key: "close",
          value: function close() {
            this.dialogRef.close(false);
          }
        }, {
          key: "checkForm",
          value: function checkForm() {
            var value = this.form.value;
            return !!(value.text || value.number || value.date || value.numerator && value.denominator);
          }
        }, {
          key: "save",
          value: function save() {
            if (this.checkForm()) {
              this.dialogRef.close(this.form.value);
            } else {
              this.dialogRef.close(false);
            }
          }
        }, {
          key: "displayQuotient",
          value: function displayQuotient(numerator, denominator) {
            return (0, _app_helpers__WEBPACK_IMPORTED_MODULE_0__.displayableQuotient)(numerator, denominator, this.data["fractionDigits"]);
          }
        }]);

        return _InputModalComponent;
      }();

      _InputModalComponent.ɵfac = function InputModalComponent_Factory(t) {
        return new (t || _InputModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MAT_DIALOG_DATA));
      };

      _InputModalComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _InputModalComponent,
        selectors: [["app-modal"]],
        decls: 17,
        vars: 8,
        consts: [["mat-dialog-title", ""], [3, "formGroup"], [4, "ngIf"], [1, "buttons"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-outline-secondary", 3, "click"], ["matInput", "", "type", "text", "formControlName", "text", 3, "placeholder"], ["matInput", "", "type", "number", "formControlName", "number", 3, "placeholder"], ["matInput", "", "type", "text", "ngbDatepicker", "", "container", "body", "formControlName", "date", "readonly", "", 3, "placeholder", "click"], ["d", "ngbDatepicker"], ["matInput", "", "type", "number", "formControlName", "numerator"], ["numerator", ""], ["matInput", "", "type", "number", "formControlName", "denominator"], ["denominator", ""]],
        template: function InputModalComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h5");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "mat-divider");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-dialog-content", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, InputModalComponent_mat_form_field_6_Template, 2, 1, "mat-form-field", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, InputModalComponent_mat_form_field_7_Template, 2, 1, "mat-form-field", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, InputModalComponent_mat_form_field_8_Template, 3, 1, "mat-form-field", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, InputModalComponent_ng_container_9_Template, 9, 1, "ng-container", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "mat-divider");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-dialog-actions", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InputModalComponent_Template_button_click_13_listener() {
              return ctx.save();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Speichern");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "button", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InputModalComponent_Template_button_click_15_listener() {
              return ctx.close();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Abbrechen");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.data["parentText"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.form);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.data["textBefore"], " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.data.kind === "text");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.data.kind === "number");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.data.kind === "date");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.data.kind === "ratio");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.data["textAfter"], " ");
          }
        },
        directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogTitle, _angular_material_divider__WEBPACK_IMPORTED_MODULE_4__.MatDivider, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogContent, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogActions, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NumberValueAccessor, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbInputDatepicker],
        styles: [".buttons[_ngcontent-%COMP%] {\n  float: right;\n}\n\n.inputArea[_ngcontent-%COMP%] {\n  margin-left: 5px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0TW9kYWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0FBQ0YiLCJmaWxlIjoiaW5wdXRNb2RhbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idXR0b25zIHtcclxuICBmbG9hdDogcmlnaHQ7XHJcbn1cclxuXHJcbi5pbnB1dEFyZWEge1xyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbn1cclxuXHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    75560:
    /*!*****************************************************!*\
      !*** ./src/app/shared/options/options.component.ts ***!
      \*****************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "OptionsComponent": function OptionsComponent() {
          return (
            /* binding */
            _OptionsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _app_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/core */
      3825);

      function OptionsComponent_tr_2_ng_container_3_ng_container_1_app_variables_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "app-variables", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("clickEvent", function OptionsComponent_tr_2_ng_container_3_ng_container_1_app_variables_6_Template_app_variables_clickEvent_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9);

            var sel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

            return ctx_r7.updateFromVariable(sel_r3);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var sel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("variables", sel_r3.variables)("parentText", sel_r3.name)("parentActive", sel_r3.value);
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "selected": a0
        };
      };

      function OptionsComponent_tr_2_ng_container_3_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "td", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "input", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function OptionsComponent_tr_2_ng_container_3_ng_container_1_Template_input_ngModelChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r13);

            var sel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

            return sel_r3.value = $event;
          })("click", function OptionsComponent_tr_2_ng_container_3_ng_container_1_Template_input_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r13);

            var sel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

            return ctx_r14.update(sel_r3);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "label", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, OptionsComponent_tr_2_ng_container_3_ng_container_1_app_variables_6_Template, 1, 3, "app-variables", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var sel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          var row_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate2"]("id", "", row_r1.name, " ", sel_r3.name, " box");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", sel_r3.value);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", ctx_r4.width, "%");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate2"]("for", "", row_r1.name, " ", sel_r3.name, " box");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](10, _c0, sel_r3.value));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", sel_r3.name, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", sel_r3.variables.length > 0);
        }
      }

      function OptionsComponent_tr_2_ng_container_3_ng_container_2_ng_container_1_app_variables_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "app-variables", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("clickEvent", function OptionsComponent_tr_2_ng_container_3_ng_container_2_ng_container_1_app_variables_6_Template_app_variables_clickEvent_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r23);

            var option_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

            var sel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;

            var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

            return ctx_r21.updateFromVariable(option_r19, sel_r3);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var option_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          var sel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("variables", option_r19.variables)("parentText", option_r19.name)("parentActive", option_r19.name === sel_r3.value);
        }
      }

      function OptionsComponent_tr_2_ng_container_3_ng_container_2_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "td", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "input", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OptionsComponent_tr_2_ng_container_3_ng_container_2_ng_container_1_Template_input_click_2_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r29);

            var option_r19 = restoredCtx.$implicit;

            var sel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;

            var ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

            return ctx_r27.update(sel_r3, option_r19.name);
          })("ngModelChange", function OptionsComponent_tr_2_ng_container_3_ng_container_2_ng_container_1_Template_input_ngModelChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r29);

            var sel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;

            return sel_r3.value = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "label", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, OptionsComponent_tr_2_ng_container_3_ng_container_2_ng_container_1_app_variables_6_Template, 1, 3, "app-variables", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var option_r19 = ctx.$implicit;

          var sel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;

          var row_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate2"]("id", "", row_r1.name, " ", sel_r3.name + option_r19.name, " box");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("name", sel_r3.name)("value", option_r19.name)("ngModel", sel_r3.value);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", ctx_r18.width, "%");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate2"]("for", "", row_r1.name, " ", sel_r3.name + option_r19.name, " box");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](12, _c0, option_r19.name === sel_r3.value));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", option_r19.name, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", option_r19.variables.length > 0);
        }
      }

      function OptionsComponent_tr_2_ng_container_3_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, OptionsComponent_tr_2_ng_container_3_ng_container_2_ng_container_1_Template, 7, 14, "ng-container", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var sel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", sel_r3.options);
        }
      }

      function OptionsComponent_tr_2_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0, 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, OptionsComponent_tr_2_ng_container_3_ng_container_1_Template, 7, 12, "ng-container", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, OptionsComponent_tr_2_ng_container_3_ng_container_2_Template, 2, 1, "ng-container", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var sel_r3 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", sel_r3.kind === "box");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", sel_r3.kind === "group");
        }
      }

      var _c1 = function _c1(a0) {
        return {
          "color": a0
        };
      };

      function OptionsComponent_tr_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "td", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, OptionsComponent_tr_2_ng_container_3_Template, 3, 2, "ng-container", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var row_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", 10, "%");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c1, row_r1.optional ? "grey" : "black"));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](row_r1.name);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", row_r1.selectables);
        }
      }

      var _OptionsComponent = /*#__PURE__*/function () {
        function _OptionsComponent(dataParser) {
          _classCallCheck(this, _OptionsComponent);

          this.dataParser = dataParser; // TODO Make these configurable

          this.minRowLength = 1;
          this.clickEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        }

        _createClass(_OptionsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.setMinRowLength(this.categories);
            this.maxRowLength = 6;
            this.determineWidth();
            this.initRows();
          }
        }, {
          key: "initRows",
          value: function initRows() {
            if (this.minRowLength > this.maxRowLength) {
              window.alert("Die gewählte Reihenlänge von " + this.maxRowLength + " ist kleiner als die kleinstmögliche Länge von " + this.minRowLength + ". Die Reihenlänge wird auf " + this.minRowLength + " gesetzt.");
              this.maxRowLength = this.minRowLength;
            }

            this.rows = this.dataParser.extractRows(this.categories, this.maxRowLength);
          }
        }, {
          key: "setMinRowLength",
          value: function setMinRowLength(cats) {
            var minRowLength = 1;

            var _iterator59 = _createForOfIteratorHelper(cats),
                _step59;

            try {
              for (_iterator59.s(); !(_step59 = _iterator59.n()).done;) {
                var cat = _step59.value;

                var _iterator60 = _createForOfIteratorHelper(cat.selectables),
                    _step60;

                try {
                  for (_iterator60.s(); !(_step60 = _iterator60.n()).done;) {
                    var sel = _step60.value;

                    if (sel.kind === "group") {
                      if (sel.options.length > minRowLength) {
                        minRowLength = sel.options.length;
                      }
                    }
                  }
                } catch (err) {
                  _iterator60.e(err);
                } finally {
                  _iterator60.f();
                }
              }
            } catch (err) {
              _iterator59.e(err);
            } finally {
              _iterator59.f();
            }

            this.minRowLength = minRowLength;
          }
        }, {
          key: "update",
          value: function update(sel, option) {
            if (sel.kind === "group") {
              if (sel.value === option) {
                sel.value = null;
              }
            }

            this.clickEvent.emit();
          }
        }, {
          key: "updateFromVariable",
          value: function updateFromVariable(parent, group) {
            if (parent.kind === "box") {
              parent.value = true;
            } else {
              if (group === undefined) {
                Error("Something went wrong here");
              } else {
                group.value = parent.name;
              }
            }

            this.clickEvent.emit();
          }
        }, {
          key: "determineWidth",
          value: function determineWidth() {
            this.width = 88 / this.maxRowLength;
          }
        }]);

        return _OptionsComponent;
      }();

      _OptionsComponent.ɵfac = function OptionsComponent_Factory(t) {
        return new (t || _OptionsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_0__.DataParserService));
      };

      _OptionsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _OptionsComponent,
        selectors: [["app-options"]],
        inputs: {
          categories: "categories"
        },
        outputs: {
          clickEvent: "clickEvent"
        },
        decls: 3,
        vars: 1,
        consts: [[4, "ngFor", "ngForOf"], [1, "category", 3, "ngStyle"], ["class", "col-3", 4, "ngFor", "ngForOf"], [1, "col-3"], [4, "ngIf"], [1, "box"], ["type", "checkbox", 3, "ngModel", "id", "ngModelChange", "click"], [1, "title"], [3, "ngClass", "for"], [3, "variables", "parentText", "parentActive", "clickEvent", 4, "ngIf"], [3, "variables", "parentText", "parentActive", "clickEvent"], [1, "radio", "box"], ["type", "radio", 3, "id", "name", "value", "ngModel", "click", "ngModelChange"], [3, "for", "ngClass"]],
        template: function OptionsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "table");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "tbody");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, OptionsComponent_tr_2_Template, 4, 7, "tr", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.rows);
          }
        },
        styles: ["td.category[_ngcontent-%COMP%] {\n  font-size: 140%;\n  font-weight: bold;\n  padding-left: 5px;\n  vertical-align: top;\n  position: relative;\n  top: -1px;\n  overflow: hidden;\n}\n\ntd.box[_ngcontent-%COMP%] {\n  vertical-align: text-top;\n  position: relative;\n  top: 1px;\n  bottom: -2px;\n  overflow: hidden;\n  color: black;\n}\n\ntd.title[_ngcontent-%COMP%] {\n  font-size: 95%;\n  display: block;\n  position: relative;\n  min-width: 210px;\n  max-width: 220px;\n  word-wrap: break-word;\n  margin-right: 1px;\n}\n\nlabel.selected[_ngcontent-%COMP%] {\n  background-color: lightblue;\n  border-radius: 2px;\n}\n\nlabel[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0 2px black;\n  border-radius: 2px;\n}\n\nlabel[_ngcontent-%COMP%]:active {\n  box-shadow: 0 0 2px black;\n  border-radius: 2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wdGlvbnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLHdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSwyQkFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSx5QkFBQTtFQUNBLGtCQUFBO0FBRUY7O0FBQUE7RUFDRSx5QkFBQTtFQUNBLGtCQUFBO0FBR0YiLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRkLmNhdGVnb3J5e1xyXG4gIGZvbnQtc2l6ZTogMTQwJTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBwYWRkaW5nLWxlZnQ6IDVweDtcclxuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0b3A6IC0xcHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxudGQuYm94IHtcclxuICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC10b3A7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHRvcDogMXB4O1xyXG4gIGJvdHRvbTogLTJweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxudGQudGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogOTUlO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBtaW4td2lkdGg6IDIxMHB4O1xyXG4gIG1heC13aWR0aDogMjIwcHg7XHJcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xyXG4gIG1hcmdpbi1yaWdodDogMXB4O1xyXG59XHJcblxyXG5sYWJlbC5zZWxlY3RlZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcclxufVxyXG5sYWJlbDpob3ZlciB7XHJcbiAgYm94LXNoYWRvdzogMCAwIDJweCBibGFjaztcclxuICBib3JkZXItcmFkaXVzOiAycHg7XHJcbn1cclxubGFiZWw6YWN0aXZlIHtcclxuICBib3gtc2hhZG93OiAwIDAgMnB4IGJsYWNrO1xyXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcclxufVxyXG5cclxuIl19 */"]
      });
      /***/
    },

    /***/
    94292:
    /*!***************************************************!*\
      !*** ./src/app/shared/report/report.component.ts ***!
      \***************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ReportComponent": function ReportComponent() {
          return (
            /* binding */
            _ReportComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/forms */
      59298);

      var _ReportComponent = /*#__PURE__*/function () {
        function _ReportComponent() {
          _classCallCheck(this, _ReportComponent);
        } // TODO: make download button
        // TODO: Send change event to layout so changes in report are reflected in data structure


        _createClass(_ReportComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.disclaimer = "Dieser Bericht wurde mit Hilfe eines sprachgesteuerten Browsertools aus Textbausteinen erstellt.";
          }
        }, {
          key: "copyText",
          value: function copyText(inputElement) {
            inputElement.select();
            document.execCommand("copy");
            inputElement.setSelectionRange(0, 0);
          }
        }, {
          key: "copyAll",
          value: function copyAll() {
            var fullText;
            fullText = this.report + "\n\n" + this.disclaimer + "\n\n\n" + this.judgement + "\n\n" + this.disclaimer;
            var selBox = document.createElement("textarea");
            selBox.value = fullText;
            document.body.append(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand("copy");
            document.body.removeChild(selBox);
          }
        }]);

        return _ReportComponent;
      }();

      _ReportComponent.ɵfac = function ReportComponent_Factory(t) {
        return new (t || _ReportComponent)();
      };

      _ReportComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _ReportComponent,
        selectors: [["app-report"]],
        inputs: {
          report: "report",
          judgement: "judgement"
        },
        decls: 10,
        vars: 2,
        consts: [[1, "button"], ["id", "copy-button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "report-text"], ["for", "report"], ["placeholder", "Wenn Sie hier etwas eingeben, wird es bei der Berichtserstellung \xFCberschrieben", "id", "report", 1, "w-100", 3, "ngModel", "ngModelChange"], ["textContent", ""], [1, "judgement-text"], ["for", "judgement"], ["placeholder", "Wenn Sie hier etwas eingeben, wird es bei der Beurteilungsgenerierung \xFCberschrieben", "id", "judgement", 1, "w-100", 3, "ngModel", "ngModelChange"]],
        template: function ReportComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ReportComponent_Template_button_click_1_listener() {
              return ctx.copyAll();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Kopieren");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "label", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "textarea", 4, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ReportComponent_Template_textarea_ngModelChange_5_listener($event) {
              return ctx.report = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "label", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "textarea", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ReportComponent_Template_textarea_ngModelChange_9_listener($event) {
              return ctx.judgement = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.report);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.judgement);
          }
        },
        directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgModel],
        styles: [".report-text[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 70%;\n  padding: 2px;\n  margin: 0;\n  color: black;\n  background-color: #f2f9fd;\n}\n\n.judgement-text[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 25%;\n  padding: 2px;\n  margin: 0;\n}\n\ntextarea[_ngcontent-%COMP%] {\n  height: 99%;\n  width: 99%;\n}\n\n.list-row[_ngcontent-%COMP%] {\n  border: 1px solid #a8d8f0;\n  border-left: none;\n}\n\n#copy-button[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.report-text[_ngcontent-%COMP%], .report-buttons[_ngcontent-%COMP%], .judgement-text[_ngcontent-%COMP%], .judgement-buttons[_ngcontent-%COMP%] {\n  border: 1px solid #a8d8f0;\n  border-left: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9ydC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLFdBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EseUJBUmlCO0FBTW5COztBQUtBO0VBQ0UsV0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtBQUZGOztBQUtBO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUFGRjs7QUFLQTtFQUNFLHlCQUFBO0VBQ0EsaUJBQUE7QUFGRjs7QUFLQTtFQUNFLFdBQUE7QUFGRjs7QUFLQTs7OztFQUlFLHlCQUFBO0VBQ0EsaUJBQUE7QUFGRiIsImZpbGUiOiJyZXBvcnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkYm9yZGVyLWNvbG9yOiBoc2woMjAwLCA3MCUsIDgwJSk7XHJcbiRiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMjAyLCA3MyUsIDk3JSk7XHJcblxyXG4ucmVwb3J0LXRleHQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogNzAlO1xyXG4gIHBhZGRpbmc6IDJweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xyXG59XHJcblxyXG4uanVkZ2VtZW50LXRleHR7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAyNSU7XHJcbiAgcGFkZGluZzogMnB4O1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxudGV4dGFyZWF7XHJcbiAgaGVpZ2h0OiA5OSU7XHJcbiAgd2lkdGg6IDk5JVxyXG59XHJcblxyXG4ubGlzdC1yb3d7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgaHNsKDIwMCwgNzAlLCA4MCUpO1xyXG4gIGJvcmRlci1sZWZ0OiBub25lO1xyXG59XHJcblxyXG4jY29weS1idXR0b257XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5yZXBvcnQtdGV4dCxcclxuLnJlcG9ydC1idXR0b25zLFxyXG4uanVkZ2VtZW50LXRleHQsXHJcbi5qdWRnZW1lbnQtYnV0dG9ucyB7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgaHNsKDIwMCwgNzAlLCA4MCUpO1xyXG4gIGJvcmRlci1sZWZ0OiBub25lO1xyXG59XHJcblxyXG4iXX0= */"]
      });
      /***/
    },

    /***/
    44466:
    /*!*****************************************!*\
      !*** ./src/app/shared/shared.module.ts ***!
      \*****************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SharedModule": function SharedModule() {
          return (
            /* binding */
            _SharedModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/common */
      40093);
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/material/dialog */
      18931);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/forms */
      59298);
      /* harmony import */


      var _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/material/divider */
      16176);
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/material/input */
      95076);
      /* harmony import */


      var _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/material/radio */
      99673);
      /* harmony import */


      var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/material/tooltip */
      30620);
      /* harmony import */


      var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @angular/material/progress-bar */
      74590);
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      95684);
      /* harmony import */


      var _app_shared_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/shared/confirm-dialog/confirm-dialog.component */
      22887);
      /* harmony import */


      var _app_shared_inputModal_inputModal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/shared/inputModal/inputModal.component */
      70918);
      /* harmony import */


      var _app_shared_options_options_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @app/shared/options/options.component */
      75560);
      /* harmony import */


      var _app_shared_report_report_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @app/shared/report/report.component */
      94292);
      /* harmony import */


      var _app_shared_upload_upload_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @app/shared/upload/upload.component */
      5141);
      /* harmony import */


      var _app_shared_upload_material_upload_material_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @app/shared/upload-material/upload-material.component */
      9434);
      /* harmony import */


      var _app_shared_variables_variables_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @app/shared/variables/variables.component */
      69054);
      /* harmony import */


      var _app_shared_image_display_image_display_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @app/shared/image-display/image-display.component */
      22621);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _SharedModule = function _SharedModule() {
        _classCallCheck(this, _SharedModule);
      };

      _SharedModule.ɵfac = function SharedModule_Factory(t) {
        return new (t || _SharedModule)();
      };

      _SharedModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
        type: _SharedModule
      });
      _SharedModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialogModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__.MatDividerModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__.MatTooltipModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__.MatRadioModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__.MatProgressBarModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__.NgbModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](_SharedModule, {
          declarations: [_app_shared_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialogComponent, _app_shared_inputModal_inputModal_component__WEBPACK_IMPORTED_MODULE_1__.InputModalComponent, _app_shared_options_options_component__WEBPACK_IMPORTED_MODULE_2__.OptionsComponent, _app_shared_report_report_component__WEBPACK_IMPORTED_MODULE_3__.ReportComponent, _app_shared_upload_upload_component__WEBPACK_IMPORTED_MODULE_4__.UploadComponent, _app_shared_upload_material_upload_material_component__WEBPACK_IMPORTED_MODULE_5__.UploadMaterialComponent, _app_shared_variables_variables_component__WEBPACK_IMPORTED_MODULE_6__.VariablesComponent, _app_shared_image_display_image_display_component__WEBPACK_IMPORTED_MODULE_7__.ImageDisplayComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialogModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__.MatDividerModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__.MatTooltipModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__.MatRadioModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__.MatProgressBarModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__.NgbModule],
          exports: [_app_shared_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialogComponent, _app_shared_inputModal_inputModal_component__WEBPACK_IMPORTED_MODULE_1__.InputModalComponent, _app_shared_options_options_component__WEBPACK_IMPORTED_MODULE_2__.OptionsComponent, _app_shared_report_report_component__WEBPACK_IMPORTED_MODULE_3__.ReportComponent, _app_shared_upload_upload_component__WEBPACK_IMPORTED_MODULE_4__.UploadComponent, _app_shared_upload_material_upload_material_component__WEBPACK_IMPORTED_MODULE_5__.UploadMaterialComponent, _app_shared_variables_variables_component__WEBPACK_IMPORTED_MODULE_6__.VariablesComponent, _app_shared_image_display_image_display_component__WEBPACK_IMPORTED_MODULE_7__.ImageDisplayComponent]
        });
      })();

      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetComponentScope"](_app_shared_options_options_component__WEBPACK_IMPORTED_MODULE_2__.OptionsComponent, [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgStyle, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgClass, _app_shared_variables_variables_component__WEBPACK_IMPORTED_MODULE_6__.VariablesComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.RadioControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor], []);
      /***/

    },

    /***/
    9434:
    /*!*********************************************************************!*\
      !*** ./src/app/shared/upload-material/upload-material.component.ts ***!
      \*********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "UploadMaterialComponent": function UploadMaterialComponent() {
          return (
            /* binding */
            _UploadMaterialComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      59298);
      /* harmony import */


      var nanoid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! nanoid */
      41624);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _app_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/core */
      3825);
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/material/dialog */
      18931);
      /* harmony import */


      var _angular_material_divider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/divider */
      16176);
      /* harmony import */


      var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/material/tooltip */
      30620);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      40093);
      /* harmony import */


      var _angular_material_radio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/material/radio */
      99673);
      /* harmony import */


      var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/material/progress-bar */
      74590);

      var _c0 = function _c0(a0) {
        return {
          "background-color": a0
        };
      };

      function UploadMaterialComponent_ng_container_26_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "option", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var file_r9 = ctx.$implicit;
          var i_r10 = ctx.index;

          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c0, ctx_r2.mainFlags[i_r10] ? "white" : "red"));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](file_r9.name);
        }
      }

      function UploadMaterialComponent_ng_container_40_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "option", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var file_r11 = ctx.$implicit;
          var i_r12 = ctx.index;

          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c0, !ctx_r4.lateralRedFlags[i_r12] ? "red" : !ctx_r4.lateralYellowFlags[i_r12] ? "yellow" : "white"));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", file_r11.name, "");
        }
      }

      function UploadMaterialComponent_ng_container_54_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "option", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var file_r13 = ctx.$implicit;
          var i_r14 = ctx.index;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c0, !ctx_r6.preRedFlags[i_r14] ? "red" : !ctx_r6.preYellowFlags[i_r14] ? "yellow" : "white"));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", file_r13.name, "");
        }
      }

      function UploadMaterialComponent_ng_container_60_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-radio-button", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var template_r15 = ctx.$implicit;

          var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("value", ctx_r7.stringify(template_r15));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", template_r15.name, " ");
        }
      }

      function UploadMaterialComponent_ng_container_61_div_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var message_r17 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](message_r17);
        }
      }

      function UploadMaterialComponent_ng_container_61_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-progress-bar", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, UploadMaterialComponent_ng_container_61_div_2_Template, 2, 1, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("value", ctx_r8.progress);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r8.messages);
        }
      }

      var _UploadMaterialComponent = /*#__PURE__*/function () {
        function _UploadMaterialComponent(backendCaller, dialogRef, filesSorter) {
          _classCallCheck(this, _UploadMaterialComponent);

          this.backendCaller = backendCaller;
          this.dialogRef = dialogRef;
          this.filesSorter = filesSorter;
          this.mainFlags = [];
          this.lateralRedFlags = [];
          this.lateralYellowFlags = [];
          this.preRedFlags = [];
          this.preYellowFlags = [];
          this.supportedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
          this.progress = 0;
          this.uploading = false;
          this.messages = [];
        }

        _createClass(_UploadMaterialComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.initForm();
            this.updateTemplateList();
          }
        }, {
          key: "initForm",
          value: function initForm() {
            this.uploadForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroup({
              mainScans: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl([], {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]
              }),
              lateralScans: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl([]),
              preScans: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl([]),
              template: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl(null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]
              })
            });
          }
        }, {
          key: "updateTemplateList",
          value: function updateTemplateList() {
            var _this27 = this;

            this.backendCaller.getTemplateList().subscribe(function (templates) {
              _this27.templates = templates;
            });
          }
        }, {
          key: "stringify",
          value: function stringify(dict) {
            return JSON.stringify(dict);
          }
        }, {
          key: "updateIdentifier",
          value: function updateIdentifier(id) {
            this.filesSorter.setIdentifier(id);
            this.flagFiles();
          }
        }, {
          key: "onFileSelect",
          value: function onFileSelect(event, scanType) {
            if (event.target.files.length > 0) {
              var files = event.target.files;

              if (this.fileFilter(files)) {
                this.uploadForm.get(scanType).setValue(Array.from(files));
                this.flagFiles();
              }
            }
          }
        }, {
          key: "fileFilter",
          value: function fileFilter(files) {
            var _iterator61 = _createForOfIteratorHelper(files),
                _step61;

            try {
              for (_iterator61.s(); !(_step61 = _iterator61.n()).done;) {
                var file = _step61.value;

                if (!this.supportedFileTypes.includes(file.type)) {
                  window.alert("Die Datei " + file.name + " besitzt ein nicht unterstütztes Dateiformat. Bitte nur PNG oder JPEG hochladen.");
                  return false;
                }
              }
            } catch (err) {
              _iterator61.e(err);
            } finally {
              _iterator61.f();
            }

            return true;
          }
        }, {
          key: "flagFiles",
          value: function flagFiles() {
            var mainFiles = this.uploadForm.get("mainScans").value;
            var lateralFiles = this.uploadForm.get("lateralScans").value;
            var preFiles = this.uploadForm.get("preScans").value;
            this.mainFlags = this.filesSorter.identifierSearch(mainFiles);
            this.lateralRedFlags = this.filesSorter.identifierSearch(lateralFiles);
            this.preRedFlags = this.filesSorter.identifierSearch(preFiles);
            this.lateralYellowFlags = this.filesSorter.fileMatchSearch(mainFiles, lateralFiles);
            this.preYellowFlags = this.filesSorter.fileMatchSearch(mainFiles, preFiles);
          }
        }, {
          key: "submit",
          value: function submit() {
            var _this28 = this;

            this.uploading = true;
            var choice = true;

            if (this.mainFlags.includes(false) || this.lateralYellowFlags.includes(false) || this.lateralRedFlags.includes(false) || this.preYellowFlags.includes(false) || this.preRedFlags.includes(false)) {
              choice = window.confirm("Eine oder mehre Dateien konnten nicht korrekt zugeordnet werden. " + "Diese werden beim Upload ignoriert. Sind Sie sicher, dass Sie fortfahren möchten?");
            }

            if (choice) {
              (function () {
                var mainScans = _this28.uploadForm.get("mainScans").value;

                var lateralScans = _this28.uploadForm.get("lateralScans").value;

                var preScans = _this28.uploadForm.get("preScans").value;

                var fileTuples = _this28.filesSorter.getFileTuples(mainScans, lateralScans, preScans);

                var _iterator62 = _createForOfIteratorHelper(fileTuples),
                    _step62;

                try {
                  var _loop3 = function _loop3() {
                    var fileTuple = _step62.value;
                    var formData = new FormData();
                    formData.append("template", _this28.uploadForm.get("template").value); // TODO: Add choice for this later

                    formData.append("modality", "xray");
                    formData.append("id", (0, nanoid__WEBPACK_IMPORTED_MODULE_3__.nanoid)());
                    formData.append("mainScan", fileTuple[0]);
                    formData.append("lateralScan", fileTuple[1]);
                    formData.append("preScan", fileTuple[2]);

                    _this28.backendCaller.addMaterial(formData).subscribe(function (result) {
                      _this28.progress += 100 / fileTuples.length;

                      if (result.success === false) {
                        _this28.messages.push(fileTuple[0].name + ": " + result.message);
                      }
                    });
                  };

                  for (_iterator62.s(); !(_step62 = _iterator62.n()).done;) {
                    _loop3();
                  }
                } catch (err) {
                  _iterator62.e(err);
                } finally {
                  _iterator62.f();
                }

                setTimeout(function () {
                  return _this28.close();
                }, 2000);
              })();
            } else {
              this.uploading = false;
            }
          }
        }, {
          key: "close",
          value: function close() {
            this.dialogRef.close();
          }
        }]);

        return _UploadMaterialComponent;
      }();

      _UploadMaterialComponent.ɵfac = function UploadMaterialComponent_Factory(t) {
        return new (t || _UploadMaterialComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_0__.BackendCallerService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_0__.FilesSortingService));
      };

      _UploadMaterialComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _UploadMaterialComponent,
        selectors: [["app-upload-material"]],
        decls: 68,
        vars: 19,
        consts: [["mat-dialog-title", "", 1, "header"], [1, "uploadForm", 3, "formGroup", "ngSubmit"], [1, "files"], [1, "label"], ["for", "identifier", 1, "mr-3"], [1, "button"], ["matTooltip", "String-Pattern f\xFCr Bildzuordnung eingeben.\n        Variable Ziffern mit * kennzeichnen.", "type", "text", "id", "identifier", 3, "change"], ["identifierInput", ""], ["for", "mainScans", 1, "mr-3"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click"], ["hidden", "", "type", "file", "multiple", "multiple", "id", "mainScans", 1, "mr-3", 3, "change"], ["fileInput1", ""], ["id", "mainImageFiles", "name", "mainImageFiles", 1, "dropdown", 3, "ngStyle", "disabled"], [4, "ngFor", "ngForOf"], ["for", "lateralScans", 1, "mr-3"], ["hidden", "", "type", "file", "multiple", "multiple", "id", "lateralScans", 3, "change"], ["fileInput2", ""], ["id", "lateralImageFiles", "name", "lateralImageFiles", 1, "dropdown", 3, "ngStyle", "disabled"], ["for", "preImageFile", 1, "mr-3"], ["hidden", "", "type", "file", "multiple", "multiple", "id", "preImageFile", 3, "change"], ["fileInput3", ""], ["id", "preImageFiles", "name", "preImageFiles", 1, "dropdown", 3, "ngStyle", "disabled"], [1, "templateSelect"], ["formControlName", "template", 1, "verticalRadioGroup"], [4, "ngIf"], [1, "buttons"], ["type", "submit", "id", "submitButton", 1, "btn", "btn-primary", 3, "disabled", "click"], ["id", "cancelButton", 1, "btn", "btn-outline-secondary", 3, "click"], ["disabled", "", 3, "ngStyle"], [2, "font-size", "120%", 3, "value"], ["mode", "determinate", 3, "value"], ["class", "alert", 4, "ngFor", "ngForOf"], [1, "alert"]],
        template: function UploadMaterialComponent_Template(rf, ctx) {
          if (rf & 1) {
            var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h4");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Aufnahmen hochladen");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "mat-divider");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-dialog-content", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function UploadMaterialComponent_Template_mat_dialog_content_ngSubmit_4_listener() {
              return ctx.submit();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "table", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "label", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Identifier: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "td", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "input", 6, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UploadMaterialComponent_Template_input_change_11_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);

              var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](12);

              return ctx.updateIdentifier(_r0.value);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "td", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "label", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Frontalaufnahme(n): ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "td", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "button", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UploadMaterialComponent_Template_button_click_18_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);

              var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](21);

              return _r1.click();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Datei(en) ausw\xE4hlen");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "input", 10, 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UploadMaterialComponent_Template_input_change_20_listener($event) {
              return ctx.onFileSelect($event, "mainScans");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "td", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "select", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "option");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "Dateien");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](26, UploadMaterialComponent_ng_container_26_Template, 3, 4, "ng-container", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "td", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "label", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Lateralaufnahme(n): ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "td", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "button", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UploadMaterialComponent_Template_button_click_32_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);

              var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](35);

              return _r3.click();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "Datei(en) ausw\xE4hlen");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "input", 15, 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UploadMaterialComponent_Template_input_change_34_listener($event) {
              return ctx.onFileSelect($event, "lateralScans");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "td", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "select", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "option");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39, "Dateien");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](40, UploadMaterialComponent_ng_container_40_Template, 3, 4, "ng-container", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "td", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "label", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](44, "Voraufnahme(n): ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "td", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "button", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UploadMaterialComponent_Template_button_click_46_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);

              var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](49);

              return _r5.click();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](47, "Datei(en) ausw\xE4hlen");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "input", 19, 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UploadMaterialComponent_Template_input_change_48_listener($event) {
              return ctx.onFileSelect($event, "preScans");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "td", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "select", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "option");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53, "Dateien");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](54, UploadMaterialComponent_ng_container_54_Template, 3, 4, "ng-container", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](55, "mat-divider");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "h5");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58, "Schablone ausw\xE4hlen:");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "mat-radio-group", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](60, UploadMaterialComponent_ng_container_60_Template, 3, 2, "ng-container", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](61, UploadMaterialComponent_ng_container_61_Template, 3, 2, "ng-container", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](62, "mat-divider");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](63, "mat-dialog-actions", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](64, "button", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UploadMaterialComponent_Template_button_click_64_listener() {
              return ctx.submit();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](65, "Hochladen");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](66, "button", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UploadMaterialComponent_Template_button_click_66_listener() {
              return ctx.close();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](67, "Abbrechen");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.uploadForm);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](19);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](13, _c0, ctx.mainFlags.includes(false) ? "red" : "white"))("disabled", ctx.uploadForm.get("mainScans").value.length === 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.uploadForm.get("mainScans").value);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](15, _c0, ctx.lateralRedFlags.includes(false) ? "red" : ctx.lateralYellowFlags.includes(false) ? "yellow" : "white"))("disabled", ctx.uploadForm.get("lateralScans").value.length === 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.uploadForm.get("lateralScans").value);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](17, _c0, ctx.preRedFlags.includes(false) ? "red" : ctx.preYellowFlags.includes(false) ? "yellow" : "white"))("disabled", ctx.uploadForm.get("preScans").value.length === 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.uploadForm.get("preScans").value);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.templates);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.uploading);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.uploadForm.invalid);
          }
        },
        directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogTitle, _angular_material_divider__WEBPACK_IMPORTED_MODULE_5__.MatDivider, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogContent, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__.MatTooltip, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgStyle, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_material_radio__WEBPACK_IMPORTED_MODULE_8__.MatRadioGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogActions, _angular_material_radio__WEBPACK_IMPORTED_MODULE_8__.MatRadioButton, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_9__.MatProgressBar],
        styles: [".header[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.uploadForm[_ngcontent-%COMP%] {\n  padding: 5px;\n  margin: 5px;\n}\n\n.files[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: -webkit-max-content;\n  grid-template-columns: max-content;\n  grid-gap: 5px;\n  padding-bottom: 10px;\n}\n\ntd.box[_ngcontent-%COMP%] {\n  vertical-align: text-top;\n  position: relative;\n  top: 1px;\n  bottom: -2px;\n  color: black;\n  padding-right: 5px;\n}\n\ntd.label[_ngcontent-%COMP%] {\n  min-width: 150px;\n}\n\ntd.button[_ngcontent-%COMP%] {\n  min-width: 180px;\n}\n\n.buttons[_ngcontent-%COMP%] {\n  float: right;\n  padding: 5px;\n}\n\n#cancelButton[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n\n.templateSelect[_ngcontent-%COMP%] {\n  margin: 5px 0;\n}\n\n.verticalRadioGroup[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin: 5px;\n  grid-column-gap: 5px;\n  -moz-column-gap: 5px;\n       column-gap: 5px;\n}\n\n.dropdown[_ngcontent-%COMP%] {\n  width: 180px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZC1tYXRlcmlhbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLG1CQUFBO0FBRkY7O0FBS0E7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBQUZGOztBQUtBO0VBQ0UsYUFBQTtFQUNBLDBDQUFBO0VBQUEsa0NBQUE7RUFDQSxhQUFBO0VBQ0Esb0JBQUE7QUFGRjs7QUFLQTtFQUNFLHdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQUZGOztBQUtBO0VBQ0UsZ0JBQUE7QUFGRjs7QUFLQTtFQUNFLGdCQUFBO0FBRkY7O0FBS0E7RUFDRSxZQUFBO0VBQ0EsWUFBQTtBQUZGOztBQUlBO0VBQ0UsZ0JBQUE7QUFERjs7QUFJQTtFQUNFLGFBQUE7QUFERjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUFBLG9CQUFBO09BQUEsZUFBQTtBQURGOztBQUlBO0VBQ0UsWUFBQTtBQURGIiwiZmlsZSI6InVwbG9hZC1tYXRlcmlhbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRib3JkZXItY29sb3I6IGhzbCgyMDAsIDcwJSwgODAlKTtcclxuJGJhY2tncm91bmQtY29sb3I6IGhzbCgyMDIsIDczJSwgOTYlKTtcclxuXHJcbi5oZWFkZXIge1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi51cGxvYWRGb3JtIHtcclxuICBwYWRkaW5nOiA1cHg7XHJcbiAgbWFyZ2luOiA1cHg7XHJcbn1cclxuXHJcbi5maWxlcyB7XHJcbiAgZGlzcGxheTpncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQ7XHJcbiAgZ3JpZC1nYXA6IDVweDtcclxuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxudGQuYm94IHtcclxuICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC10b3A7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHRvcDogMXB4O1xyXG4gIGJvdHRvbTogLTJweDtcclxuICBjb2xvcjogYmxhY2s7XHJcbiAgcGFkZGluZy1yaWdodDogNXB4O1xyXG59XHJcblxyXG50ZC5sYWJlbCB7XHJcbiAgbWluLXdpZHRoOiAxNTBweDtcclxufVxyXG5cclxudGQuYnV0dG9uIHtcclxuICBtaW4td2lkdGg6IDE4MHB4O1xyXG59XHJcblxyXG4uYnV0dG9ucyB7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIHBhZGRpbmc6IDVweDtcclxufVxyXG4jY2FuY2VsQnV0dG9uIHtcclxuICBtYXJnaW4tbGVmdDogNXB4O1xyXG59XHJcblxyXG4udGVtcGxhdGVTZWxlY3Qge1xyXG4gIG1hcmdpbjogNXB4IDA7XHJcbn1cclxuXHJcbi52ZXJ0aWNhbFJhZGlvR3JvdXAge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBtYXJnaW46IDVweDtcclxuICBjb2x1bW4tZ2FwOiA1cHg7XHJcbn1cclxuXHJcbi5kcm9wZG93biB7XHJcbiAgd2lkdGg6IDE4MHB4O1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    5141:
    /*!***************************************************!*\
      !*** ./src/app/shared/upload/upload.component.ts ***!
      \***************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "UploadComponent": function UploadComponent() {
          return (
            /* binding */
            _UploadComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      59298);
      /* harmony import */


      var _app_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/helpers */
      8807);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/material/dialog */
      18931);
      /* harmony import */


      var _app_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/core */
      3825);
      /* harmony import */


      var _angular_material_divider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/divider */
      16176);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      40093);

      function UploadComponent_span_27_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Dateityp nicht unterst\xFCtzt.");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      var _UploadComponent = /*#__PURE__*/function () {
        function _UploadComponent(dialogRef, backendCaller) {
          _classCallCheck(this, _UploadComponent);

          this.dialogRef = dialogRef;
          this.backendCaller = backendCaller;
          this.showWarning = false;
        }

        _createClass(_UploadComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.initForm();
          }
        }, {
          key: "initForm",
          value: function initForm() {
            this.uploadForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroup({
              name: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(3)]
              }),
              file: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]
              }),
              filename: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]
              })
            });
          }
        }, {
          key: "onFileSelect",
          value: function onFileSelect(event) {
            if (event.target.files.length > 0) {
              this.currentFile = event.target.files[0];
              this.checkFileExtension(this.currentFile);
              this.uploadForm.get("file").setValue(this.currentFile);
            }
          }
        }, {
          key: "checkFileExtension",
          value: function checkFileExtension(file) {
            this.showWarning = false;
            var extension = (0, _app_helpers__WEBPACK_IMPORTED_MODULE_0__.getFileExtension)(file.name);

            if (!(extension === "xlsx" || extension === "json")) {
              this.showWarning = true;
            }
          }
        }, {
          key: "upload",
          value: function upload() {
            var _this29 = this;

            var extension = (0, _app_helpers__WEBPACK_IMPORTED_MODULE_0__.getFileExtension)(this.uploadForm.value.file.name);
            var postData = new FormData();
            postData.append("name", this.uploadForm.value.name);
            postData.append("file", this.uploadForm.value.file);

            if (extension === "xlsx") {// this.templateManager.addExcel(postData);
            } else if (extension === "json") {
              this.backendCaller.addTemplateFromJSON(postData).subscribe(function (res) {
                window.alert(res.message);

                _this29.uploadForm.reset();

                _this29.currentFile = null;

                _this29.close();
              });
            } else {
              window.alert("Nicht unterstützter Dateityp! Datei muss .xlsx oder .json sein.");
              this.uploadForm.reset();
              this.currentFile = null;
              this.close();
            }
          }
        }, {
          key: "close",
          value: function close() {
            this.dialogRef.close();
          }
        }]);

        return _UploadComponent;
      }();

      _UploadComponent.ɵfac = function UploadComponent_Factory(t) {
        return new (t || _UploadComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_1__.BackendCallerService));
      };

      _UploadComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _UploadComponent,
        selectors: [["app-upload"]],
        decls: 34,
        vars: 3,
        consts: [["mat-dialog-title", "", 1, "header"], [3, "formGroup"], [1, "files"], ["for", "NameOfFile", 1, "mr-3"], ["type", "text", "name", "name", "id", "NameOfFile", "formControlName", "name", 1, "mr-3", "inputField"], ["for", "filename", 1, "mr-3"], ["readonly", "", "type", "text", "id", "filename", 1, "mr-3", "inputField", 3, "value"], ["id", "UploadButton", 1, "btn", "btn-outline-primary", 3, "click"], ["hidden", "", "type", "file", "id", "uploadFile", "formControlName", "filename", 1, "mr-3", 3, "change"], ["inputField", ""], ["class", "alert-warning", 4, "ngIf"], [1, "buttons"], ["id", "submitButton", 1, "btn", "btn-primary", 3, "click"], ["id", "cancelButton", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "alert-warning"]],
        template: function UploadComponent_Template(rf, ctx) {
          if (rf & 1) {
            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h5");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Schablone hochladen");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "mat-divider");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-dialog-content", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "table", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "label", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Name: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "input", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "label", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Datei: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "input", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "button", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function UploadComponent_Template_button_click_20_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);

              var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](23);

              return _r0.click();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Durchsuchen...");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "input", 8, 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function UploadComponent_Template_input_change_22_listener($event) {
              return ctx.onFileSelect($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "tr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](25, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "td");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](27, UploadComponent_span_27_Template, 2, 0, "span", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](28, "mat-divider");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "mat-dialog-actions", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "button", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function UploadComponent_Template_button_click_30_listener() {
              return ctx.upload();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Hochladen");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "button", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function UploadComponent_Template_button_click_32_listener() {
              return ctx.close();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, "Abbrechen");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.uploadForm);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.currentFile === null || ctx.currentFile === undefined ? null : ctx.currentFile.name);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showWarning);
          }
        },
        directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogTitle, _angular_material_divider__WEBPACK_IMPORTED_MODULE_5__.MatDivider, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogContent, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogActions],
        styles: [".files[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  margin-bottom: 10px;\n  margin-left: 20px;\n  border-collapse: separate;\n  border-spacing: 5px;\n}\n\n.header[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.buttons[_ngcontent-%COMP%] {\n  float: right;\n  padding: 5px;\n}\n\n#cancelButton[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n\n#UploadButton[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n}\n\n.inputField[_ngcontent-%COMP%] {\n  width: 170px;\n}\n\ntd[_ngcontent-%COMP%] {\n  min-width: 70px;\n}\n\ntr[_ngcontent-%COMP%] {\n  padding: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0FBQ0YiLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZpbGVzIHtcclxuICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbiAgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtcclxuICBib3JkZXItc3BhY2luZzogNXB4O1xyXG59XHJcblxyXG4uaGVhZGVyIHtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uYnV0dG9ucyB7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIHBhZGRpbmc6IDVweDtcclxufVxyXG5cclxuI2NhbmNlbEJ1dHRvbiB7XHJcbiAgbWFyZ2luLWxlZnQ6IDVweDtcclxufVxyXG5cclxuI1VwbG9hZEJ1dHRvbiB7XHJcbiAgcGFkZGluZzogM3B4IDEwcHg7XHJcbn1cclxuXHJcbi5pbnB1dEZpZWxkIHtcclxuICB3aWR0aDogMTcwcHg7XHJcbn1cclxuXHJcbnRkIHtcclxuICBtaW4td2lkdGg6IDcwcHg7XHJcbn1cclxuXHJcbnRyIHtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    69054:
    /*!*********************************************************!*\
      !*** ./src/app/shared/variables/variables.component.ts ***!
      \*********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "VariablesComponent": function VariablesComponent() {
          return (
            /* binding */
            _VariablesComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _app_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/helpers */
      8807);
      /* harmony import */


      var _inputModal_inputModal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../inputModal/inputModal.component */
      70918);
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/dialog */
      18931);
      /* harmony import */


      var _app_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @app/core */
      3825);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      40093);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/forms */
      59298);

      function VariablesComponent_ng_container_1_td_2_ng_container_2_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "/");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "selected": a0
        };
      };

      function VariablesComponent_ng_container_1_td_2_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "input", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function VariablesComponent_ng_container_1_td_2_ng_container_2_Template_input_ngModelChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11);

            var variable_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;

            return variable_r1.value = $event;
          })("click", function VariablesComponent_ng_container_1_td_2_ng_container_2_Template_input_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11);

            var val_r6 = restoredCtx.$implicit;

            var variable_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r12.clicked(variable_r1, val_r6);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "label", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, VariablesComponent_ng_container_1_td_2_ng_container_2_ng_container_4_Template, 2, 0, "ng-container", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var val_r6 = ctx.$implicit;
          var last_r7 = ctx.last;

          var variable_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;

          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate2"]("id", "", variable_r1.id, "+", val_r6, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("name", variable_r1.id);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", val_r6)("ngModel", variable_r1.value);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate2"]("for", "", variable_r1.id, "+", val_r6, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](10, _c0, val_r6 === variable_r1.value && ctx_r5.parentActive));

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](val_r6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !last_r7);
        }
      }

      function VariablesComponent_ng_container_1_td_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, VariablesComponent_ng_container_1_td_2_ng_container_2_Template, 5, 12, "ng-container", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var variable_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", variable_r1.textBefore, " (");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", variable_r1.values);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](") ", variable_r1.textAfter, " ");
        }
      }

      function VariablesComponent_ng_container_1_td_3_ng_container_2_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "/");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }
      }

      function VariablesComponent_ng_container_1_td_3_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "input", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function VariablesComponent_ng_container_1_td_3_ng_container_2_Template_input_ngModelChange_1_listener($event) {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r21);

            var val_r17 = restoredCtx.$implicit;
            return val_r17[1] = $event;
          })("click", function VariablesComponent_ng_container_1_td_3_ng_container_2_Template_input_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r21);

            var variable_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;

            var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r22.clicked(variable_r1);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "label", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, VariablesComponent_ng_container_1_td_3_ng_container_2_ng_container_4_Template, 2, 0, "ng-container", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var val_r17 = ctx.$implicit;
          var last_r18 = ctx.last;

          var variable_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;

          var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate2"]("id", "", variable_r1.id, "+", val_r17[0], "");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("name", variable_r1.id);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", val_r17[0])("ngModel", val_r17[1]);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate2"]("for", "", variable_r1.id, "+", val_r17[0], "");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](10, _c0, val_r17[1] && ctx_r16.parentActive));

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](val_r17[0]);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !last_r18);
        }
      }

      function VariablesComponent_ng_container_1_td_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, VariablesComponent_ng_container_1_td_3_ng_container_2_Template, 5, 12, "ng-container", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var variable_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", variable_r1.textBefore, " [");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", variable_r1.values);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("] ", variable_r1.textAfter, " ");
        }
      }

      function VariablesComponent_ng_container_1_td_4_Template(rf, ctx) {
        if (rf & 1) {
          var _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function VariablesComponent_ng_container_1_td_4_Template_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r28);

            var variable_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

            var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r26.submit(variable_r1);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var variable_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", variable_r1.textBefore, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate1"]("id", "", variable_r1.id, " btn");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](5, _c0, ctx_r4.hasButtonBeenClickedOnce[variable_r1.id] && ctx_r4.parentActive));

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r4.parseButtonText(variable_r1));

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", variable_r1.textAfter, " ");
        }
      }

      function VariablesComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, VariablesComponent_ng_container_1_td_2_Template, 4, 3, "td", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, VariablesComponent_ng_container_1_td_3_Template, 4, 3, "td", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, VariablesComponent_ng_container_1_td_4_Template, 5, 7, "td", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var variable_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", variable_r1.kind === "oc");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", variable_r1.kind === "mc");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", variable_r1.kind === "text" || variable_r1.kind === "number" || variable_r1.kind === "date" || variable_r1.kind === "ratio");
        }
      }

      var _VariablesComponent = /*#__PURE__*/function () {
        function _VariablesComponent(dialog, dialogService) {
          _classCallCheck(this, _VariablesComponent);

          this.dialog = dialog;
          this.dialogService = dialogService;
          this.clickEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
          this.hasButtonBeenClickedOnce = new Map();
        }

        _createClass(_VariablesComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.initButtonClickedMap();
          }
        }, {
          key: "initButtonClickedMap",
          value: function initButtonClickedMap() {
            var _iterator63 = _createForOfIteratorHelper(this.variables),
                _step63;

            try {
              for (_iterator63.s(); !(_step63 = _iterator63.n()).done;) {
                var variable = _step63.value;

                if (variable.kind === "text" || variable.kind === "number" || variable.kind === "date" || variable.kind === "ratio") {
                  this.hasButtonBeenClickedOnce[variable.id] = false;
                }
              }
            } catch (err) {
              _iterator63.e(err);
            } finally {
              _iterator63.f();
            }
          }
        }, {
          key: "parseButtonText",
          value: function parseButtonText(variable) {
            if (!this.hasButtonBeenClickedOnce[variable.id] || !this.parentActive) {
              return ".....";
            } else if (variable.kind === "text" || variable.kind === "number") {
              return variable.value;
            } else if (variable.kind === "date") {
              return variable.value.day + "." + variable.value.month + "." + variable.value.year;
            } else if (variable.kind === "ratio") {
              return (0, _app_helpers__WEBPACK_IMPORTED_MODULE_0__.displayableQuotient)(variable.numerator, variable.denominator, variable.fractionDigits);
            }
          }
        }, {
          key: "clicked",
          value: function clicked(variable, value) {
            if (variable.kind === "oc") {
              if (variable.value === value) {
                variable.value = null;
              }
            }

            this.clickEvent.emit();
          }
        }, {
          key: "submit",
          value: function submit(variable) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var response;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.modalInput(variable);

                    case 2:
                      response = _context.sent;

                      if (response) {
                        this.hasButtonBeenClickedOnce[variable.id] = true;
                        this.clickEvent.emit();
                      }

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "modalInput",
          value: function modalInput(variable) {
            var _this30 = this;

            var dialogConfig = this.dialogService.defaultConfig();
            dialogConfig.data = {
              kind: variable.kind,
              textBefore: variable.textBefore,
              textAfter: variable.textAfter,
              parentText: this.parentText
            };

            if (variable.kind === "ratio") {
              dialogConfig.data["denominator"] = variable.denominator;
              dialogConfig.data["numerator"] = variable.numerator;
              dialogConfig.data["fractionDigits"] = variable.fractionDigits;
            } else if (variable.kind === "text" || variable.kind === "number") {
              dialogConfig.data["value"] = variable.value;
            } else if (variable.kind === "date") {
              dialogConfig.data["value"] = variable.value.year.toString() + "-" + variable.value.month.toString() + "-" + variable.value.day.toString();
            }

            var dialogRef = this.dialog.open(_inputModal_inputModal_component__WEBPACK_IMPORTED_MODULE_1__.InputModalComponent, dialogConfig);
            return dialogRef.afterClosed().toPromise().then(function (response) {
              if (!response) {
                return Promise.resolve(false);
              } else {
                _this30.assignValues(variable, response);

                return Promise.resolve(true);
              }
            });
          }
        }, {
          key: "assignValues",
          value: function assignValues(variable, input) {
            // TODO: check if response is valid
            if (variable.kind === "text") {
              variable.value = input.text;
            } else if (variable.kind === "date") {
              variable.value = input.date;
            } else if (variable.kind === "number") {
              variable.value = input.number;
            } else if (variable.kind === "ratio") {
              variable.numerator = input.numerator;
              variable.denominator = input.denominator;
            }
          }
        }]);

        return _VariablesComponent;
      }();

      _VariablesComponent.ɵfac = function VariablesComponent_Factory(t) {
        return new (t || _VariablesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_2__.MatDialogService));
      };

      _VariablesComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _VariablesComponent,
        selectors: [["app-variables"]],
        inputs: {
          variables: "variables",
          parentText: "parentText",
          parentActive: "parentActive"
        },
        outputs: {
          clickEvent: "clickEvent"
        },
        decls: 2,
        vars: 1,
        consts: [[1, "variables"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["type", "radio", 3, "id", "name", "value", "ngModel", "ngModelChange", "click"], [3, "for", "ngClass"], ["type", "checkbox", 3, "id", "name", "value", "ngModel", "ngModelChange", "click"], [1, "modal-button", 3, "ngClass", "id", "click"]],
        template: function VariablesComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "table", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, VariablesComponent_ng_container_1_Template, 5, 3, "ng-container", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.variables);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.RadioControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.CheckboxControlValueAccessor],
        styles: [".variables[_ngcontent-%COMP%] {\n  background-color: #f2f9fd;\n  border-radius: 3px;\n  box-shadow: 0 0 2px grey;\n  width: 99%;\n  margin-top: 2px;\n  margin-bottom: 2px;\n  font-size: 85%;\n}\n\ntd[_ngcontent-%COMP%] {\n  line-height: 0.7;\n  padding: 2px 2px;\n}\n\nlabel[_ngcontent-%COMP%] {\n  display: inline-block;\n  min-width: 16px;\n  padding: 3px 3px;\n  text-align: center;\n  border-radius: 3px;\n}\n\nlabel.selected[_ngcontent-%COMP%] {\n  background-color: lightgreen;\n}\n\nlabel[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0 2px black;\n}\n\nlabel[_ngcontent-%COMP%]:active {\n  box-shadow: 0 0 2px black;\n}\n\ninput[type=radio][_ngcontent-%COMP%] {\n  display: none;\n}\n\ninput[type=checkbox][_ngcontent-%COMP%] {\n  display: none;\n}\n\nbutton.modal-button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  border-radius: 2px;\n  padding: 5px 3px;\n}\n\nbutton[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0 2px black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhcmlhYmxlcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx3QkFBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFDQTtFQUNFLDRCQUFBO0FBRUY7O0FBQUE7RUFDRSx5QkFBQTtBQUdGOztBQURBO0VBQ0UseUJBQUE7QUFJRjs7QUFEQTtFQUNFLGFBQUE7QUFJRjs7QUFGQTtFQUNFLGFBQUE7QUFLRjs7QUFGQTtFQUNFLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFLRjs7QUFGQTtFQUNFLHlCQUFBO0FBS0YiLCJmaWxlIjoidmFyaWFibGVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnZhcmlhYmxlcyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIwMiwgNzMlLCA5NyUpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICBib3gtc2hhZG93OiAwIDAgMnB4IGdyZXk7XHJcbiAgd2lkdGg6IDk5JTtcclxuICBtYXJnaW4tdG9wOiAycHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xyXG4gIGZvbnQtc2l6ZTogODUlO1xyXG59XHJcblxyXG50ZCB7XHJcbiAgbGluZS1oZWlnaHQ6IDAuNztcclxuICBwYWRkaW5nOiAycHggMnB4O1xyXG59XHJcblxyXG5sYWJlbCB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIG1pbi13aWR0aDogMTZweDtcclxuICBwYWRkaW5nOiAzcHggM3B4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbn1cclxubGFiZWwuc2VsZWN0ZWQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JlZW47XHJcbn1cclxubGFiZWw6aG92ZXIge1xyXG4gIGJveC1zaGFkb3c6IDAgMCAycHggYmxhY2s7XHJcbn1cclxubGFiZWw6YWN0aXZle1xyXG4gIGJveC1zaGFkb3c6IDAgMCAycHggYmxhY2s7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJyYWRpb1wiXSB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5pbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0ge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbmJ1dHRvbi5tb2RhbC1idXR0b24ge1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiAycHg7XHJcbiAgcGFkZGluZzogNXB4IDNweDtcclxufVxyXG5cclxuYnV0dG9uOmhvdmVyIHtcclxuICBib3gtc2hhZG93OiAwIDAgMnB4IGJsYWNrO1xyXG4gIC8vIGJvcmRlci1yYWRpdXM6IDJweDtcclxufVxyXG5cclxuXHJcblxyXG4iXX0= */"]
      });
      /***/
    },

    /***/
    28759:
    /*!***********************************************!*\
      !*** ./src/app/view/admin/admin.component.ts ***!
      \***********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AdminComponent": function AdminComponent() {
          return (
            /* binding */
            _AdminComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _AdminComponent = /*#__PURE__*/function () {
        function _AdminComponent() {
          _classCallCheck(this, _AdminComponent);
        }

        _createClass(_AdminComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _AdminComponent;
      }();

      _AdminComponent.ɵfac = function AdminComponent_Factory(t) {
        return new (t || _AdminComponent)();
      };

      _AdminComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _AdminComponent,
        selectors: [["app-admin"]],
        decls: 2,
        vars: 0,
        template: function AdminComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "admin works!");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi5jb21wb25lbnQuY3NzIn0= */"]
      });
      /***/
    },

    /***/
    64721:
    /*!*************************************************!*\
      !*** ./src/app/view/header/header.component.ts ***!
      \*************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HeaderComponent": function HeaderComponent() {
          return (
            /* binding */
            _HeaderComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @fortawesome/free-solid-svg-icons */
      42457);
      /* harmony import */


      var _app_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/models */
      42139);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _app_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/core */
      3825);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      40093);
      /* harmony import */


      var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @fortawesome/angular-fontawesome */
      2795);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      79661);

      function HeaderComponent_nav_0_a_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Aufnahmen befunden");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function HeaderComponent_nav_0_a_18_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Admin");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      function HeaderComponent_nav_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "nav", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "fa-icon", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "span", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ul", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "li", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "a", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Schablonen");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "li", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, HeaderComponent_nav_0_a_12_Template, 2, 0, "a", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "li", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "a", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Radiolearn");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "ul", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "li", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, HeaderComponent_nav_0_a_18_Template, 2, 0, "a", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "li", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "a", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Account Management");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "li", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "a", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeaderComponent_nav_0_Template_a_click_23_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r3.logout();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Logout");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r0.title, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx_r0.faUser);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.isMod);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.isAdmin);
        }
      }

      var _HeaderComponent = /*#__PURE__*/function () {
        function _HeaderComponent(displayService, authenticationService) {
          _classCallCheck(this, _HeaderComponent);

          this.displayService = displayService;
          this.authenticationService = authenticationService;
          this.title = "RadioSpeech";
        }

        _createClass(_HeaderComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this31 = this;

            this.authenticationService.user.subscribe(function (x) {
              return _this31.user = x;
            });
            this.displayNavbar = true;
            this.faUser = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faLaptopMedical;
          }
        }, {
          key: "ngDoCheck",
          value: function ngDoCheck() {
            this.displayService.updateDisplay();
            this.displayNavbar = this.displayService.displayHeader;
          }
        }, {
          key: "isMod",
          get: function get() {
            return this.user && (this.user.role === _app_models__WEBPACK_IMPORTED_MODULE_0__.Role.Admin || this.user.role === _app_models__WEBPACK_IMPORTED_MODULE_0__.Role.Moderator);
          }
        }, {
          key: "isAdmin",
          get: function get() {
            return this.user && this.user.role === _app_models__WEBPACK_IMPORTED_MODULE_0__.Role.Admin;
          }
        }, {
          key: "logout",
          value: function logout() {
            this.authenticationService.logout();
          }
        }]);

        return _HeaderComponent;
      }();

      _HeaderComponent.ɵfac = function HeaderComponent_Factory(t) {
        return new (t || _HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_1__.DisplayService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_app_core__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService));
      };

      _HeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _HeaderComponent,
        selectors: [["app-header"]],
        decls: 1,
        vars: 1,
        consts: [["class", "navbar navbar-expand-lg navbar-light bg-light", 4, "ngIf"], [1, "navbar", "navbar-expand-lg", "navbar-light", "bg-light"], ["href", "#", 1, "navbar-brand"], [1, "ml-1", 3, "icon"], ["type", "button", "data-toggle", "collapse", "data-target", "#navbarSupportedContent", "aria-controls", "navbarSupportedContent", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["id", "navbarSupportedContent", 1, "collapse", "navbar-collapse"], [1, "navbar-nav", "mr-auto"], ["routerLinkActive", "active", 1, "nav-item"], ["routerLink", "/list", 1, "nav-link"], ["class", "nav-link", "routerLink", "/listMat", 4, "ngIf"], ["routerLink", "/", 1, "nav-link"], [1, "navbar-nav", "ms-auto"], [1, "nav-item"], ["class", "nav-link", "routerLink", "/admin", 4, "ngIf"], ["routerLink", "/manageAccount", 1, "nav-link"], [1, "nav-link", 2, "cursor", "pointer", 3, "click"], ["routerLink", "/listMat", 1, "nav-link"], ["routerLink", "/admin", 1, "nav-link"]],
        template: function HeaderComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, HeaderComponent_nav_0_Template, 25, 4, "nav", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.displayNavbar);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__.FaIconComponent, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLinkActive, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLinkWithHref],
        styles: ["nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  margin-top: 5px;\n  background-color: #eee;\n  border-radius: 5px;\n  margin-left: 5px;\n  display: inline-block;\n}\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:link {\n  color: #334953;\n}\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #039be5;\n  background-color: #cfd8dc;\n}\n\nnav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  color: #039be5;\n  background-color: #cfd8dc;\n}\n\n.navbar-toggler[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\n\n.ms-auto[_ngcontent-%COMP%] {\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxjQUFBO0VBQ0EseUJBQUE7QUFFRjs7QUFBQTtFQUNFLGNBQUE7RUFDQSx5QkFBQTtBQUdGOztBQUFBO0VBQ0Usa0JBQUE7QUFHRjs7QUFBQTtFQUNFLGlCQUFBO0FBR0YiLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibmF2IGEge1xyXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xyXG4gIG1hcmdpbi10b3A6IDVweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxubmF2IGE6dmlzaXRlZCwgYTpsaW5rIHtcclxuICBjb2xvcjogIzMzNDk1MztcclxufVxyXG5uYXYgYTpob3ZlciB7XHJcbiAgY29sb3I6ICMwMzliZTU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcclxufVxyXG5uYXYgYS5hY3RpdmUge1xyXG4gIGNvbG9yOiAjMDM5YmU1O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNjZmQ4ZGM7XHJcbn1cclxuXHJcbi5uYXZiYXItdG9nZ2xlciB7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG59XHJcblxyXG4ubXMtYXV0byB7XHJcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbn1cclxuIl19 */"]
      });
      /***/
    },

    /***/
    79642:
    /*!*******************************!*\
      !*** ./src/app/view/index.ts ***!
      \*******************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AdminComponent": function AdminComponent() {
          return (
            /* reexport safe */
            _admin_admin_component__WEBPACK_IMPORTED_MODULE_0__.AdminComponent
          );
        },

        /* harmony export */
        "HeaderComponent": function HeaderComponent() {
          return (
            /* reexport safe */
            _header_header_component__WEBPACK_IMPORTED_MODULE_1__.HeaderComponent
          );
        },

        /* harmony export */
        "LoginComponent": function LoginComponent() {
          return (
            /* reexport safe */
            _login_login_component__WEBPACK_IMPORTED_MODULE_2__.LoginComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _admin_admin_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./admin/admin.component */
      28759);
      /* harmony import */


      var _header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./header/header.component */
      64721);
      /* harmony import */


      var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./login/login.component */
      90283);
      /***/

    },

    /***/
    90283:
    /*!***********************************************!*\
      !*** ./src/app/view/login/login.component.ts ***!
      \***********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LoginComponent": function LoginComponent() {
          return (
            /* binding */
            _LoginComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      59298);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      20088);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      79661);
      /* harmony import */


      var _app_core_services_authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/core/services/authentication.service */
      81745);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      40093);

      function LoginComponent_div_10_div_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Nutzername ist erforderlich");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function LoginComponent_div_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LoginComponent_div_10_div_1_Template, 2, 0, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.f.username.errors.required);
        }
      }

      function LoginComponent_div_15_div_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Passwort ist erforderlich");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function LoginComponent_div_15_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LoginComponent_div_15_div_1_Template, 2, 0, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.f.password.errors.required);
        }
      }

      function LoginComponent_span_17_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "span", 16);
        }
      }

      function LoginComponent_div_19_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.error);
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "is-invalid": a0
        };
      };

      var _LoginComponent = /*#__PURE__*/function () {
        function _LoginComponent(formBuilder, route, router, authenticationService) {
          _classCallCheck(this, _LoginComponent);

          this.formBuilder = formBuilder;
          this.route = route;
          this.router = router;
          this.authenticationService = authenticationService;
          this.loading = false;
          this.submitted = false;
          this.error = "";

          if (this.authenticationService.userValue) {
            this.router.navigate(["/"]);
          }
        }

        _createClass(_LoginComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.loginForm = this.formBuilder.group({
              username: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
              password: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]
            });
          } // convenience getter for easy access to form fields

        }, {
          key: "f",
          get: function get() {
            return this.loginForm.controls;
          }
        }, {
          key: "onSubmit",
          value: function onSubmit() {
            var _this32 = this;

            this.submitted = true; // stop here if form is invalid

            if (this.loginForm.invalid) {
              return;
            }

            this.loading = true;
            this.authenticationService.login(this.f.username.value, this.f.password.value).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.first)()).subscribe({
              next: function next() {
                // get return url from query parameters or default to home page
                var returnUrl = _this32.route.snapshot.queryParams["returnUrl"] || "/";

                _this32.router.navigateByUrl(returnUrl);
              },
              error: function error(_error) {
                _this32.error = _error;
                _this32.loading = false;
              }
            });
          }
        }]);

        return _LoginComponent;
      }();

      _LoginComponent.ɵfac = function LoginComponent_Factory(t) {
        return new (t || _LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_app_core_services_authentication_service__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService));
      };

      _LoginComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _LoginComponent,
        selectors: [["app-login"]],
        decls: 20,
        vars: 12,
        consts: [[1, "col-md-6", "offset-md-3", "mt-5"], [1, "card"], [1, "card-header"], [1, "card-body"], [3, "formGroup", "ngSubmit"], [1, "form-group"], ["for", "username"], ["id", "username", "type", "text", "formControlName", "username", 1, "form-control", 3, "ngClass"], ["class", "invalid-feedback", 4, "ngIf"], ["for", "password"], ["id", "password", "type", "password", "formControlName", "password", 1, "form-control", 3, "ngClass"], [1, "btn", "btn-primary", 3, "disabled"], ["class", "spinner-border spinner-border-sm mr-1", 4, "ngIf"], ["class", "alert alert-danger mt-3 mb-0", 4, "ngIf"], [1, "invalid-feedback"], [4, "ngIf"], [1, "spinner-border", "spinner-border-sm", "mr-1"], [1, "alert", "alert-danger", "mt-3", "mb-0"]],
        template: function LoginComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h4", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "RadioSpeech - Login");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "form", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_5_listener() {
              return ctx.onSubmit();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "label", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Nutzername");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "input", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, LoginComponent_div_10_Template, 2, 1, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "label", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Passwort");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, LoginComponent_div_15_Template, 2, 1, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, LoginComponent_span_17_Template, 1, 0, "span", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, " Login ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, LoginComponent_div_19_Template, 2, 1, "div", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.loginForm);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](8, _c0, ctx.submitted && ctx.f.username.errors));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f.username.errors);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](10, _c0, ctx.submitted && ctx.f.password.errors));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f.password.errors);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.loading);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error);
          }
        },
        directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf],
        styles: ["button[_ngcontent-%COMP%] {\n  margin: 10px;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  margin: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtBQUNGIiwiZmlsZSI6ImxvZ2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9uIHtcclxuICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbi5mb3JtLWdyb3VwIHtcclxuICBtYXJnaW46IDEwcHg7XHJcbn1cclxuIl19 */"]
      });
      /***/
    },

    /***/
    63070:
    /*!*************************************!*\
      !*** ./src/app/view/view.module.ts ***!
      \*************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ViewModule": function ViewModule() {
          return (
            /* binding */
            _ViewModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      40093);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/forms */
      59298);
      /* harmony import */


      var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @fortawesome/angular-fontawesome */
      2795);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/router */
      79661);
      /* harmony import */


      var _app_view_admin_admin_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @app/view/admin/admin.component */
      28759);
      /* harmony import */


      var _app_view_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @app/view/header/header.component */
      64721);
      /* harmony import */


      var _app_view_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @app/view/login/login.component */
      90283);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      91477);

      var _ViewModule = function _ViewModule() {
        _classCallCheck(this, _ViewModule);
      };

      _ViewModule.ɵfac = function ViewModule_Factory(t) {
        return new (t || _ViewModule)();
      };

      _ViewModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _ViewModule
      });
      _ViewModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__.FontAwesomeModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_ViewModule, {
          declarations: [_app_view_header_header_component__WEBPACK_IMPORTED_MODULE_1__.HeaderComponent, _app_view_admin_admin_component__WEBPACK_IMPORTED_MODULE_0__.AdminComponent, _app_view_login_login_component__WEBPACK_IMPORTED_MODULE_2__.LoginComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__.FontAwesomeModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule],
          exports: [_app_view_header_header_component__WEBPACK_IMPORTED_MODULE_1__.HeaderComponent, _app_view_admin_admin_component__WEBPACK_IMPORTED_MODULE_0__.AdminComponent, _app_view_login_login_component__WEBPACK_IMPORTED_MODULE_2__.LoginComponent]
        });
      })();
      /***/

    },

    /***/
    92340:
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "environment": function environment() {
          return (
            /* binding */
            _environment
          );
        }
        /* harmony export */

      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var _environment = {
        production: false,
        backend: "http://localhost:8000/",
        authentication: "radio/authentication/this/is/very/safe/133742069/",
        database: "radio/database/",
        template: "template/",
        material: "material/"
      };
      /*
       * In development mode, for easier debugging, you can ignore zone related error
       * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
       * below file. Don't forget to comment it out in production mode
       * because it will have a performance impact when errors are thrown
       */
      // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    14431:
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      4919);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      91477);
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app/app.module */
      36747);
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      92340);

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
        (0, _angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)["catch"](function (err) {
        return console.log(err);
      });
      /***/

    }
  },
  /******/
  function (__webpack_require__) {
    // webpackRuntimeModules

    /******/
    var __webpack_exec__ = function __webpack_exec__(moduleId) {
      return __webpack_require__(__webpack_require__.s = moduleId);
    };
    /******/


    __webpack_require__.O(0, ["vendor"], function () {
      return __webpack_exec__(14431);
    });
    /******/


    var __webpack_exports__ = __webpack_require__.O();
    /******/

  }]);
})();
//# sourceMappingURL=main-es5.js.map