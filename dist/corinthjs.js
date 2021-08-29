(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('node-fetch')) :
	typeof define === 'function' && define.amd ? define(['exports', 'node-fetch'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Corinth = {}, global.nodeFetch));
}(this, (function (exports, nodeFetch) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var nodeFetch__default = /*#__PURE__*/_interopDefaultLegacy(nodeFetch);

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var haxan_min = createCommonjsModule(function (module, exports) {
	function _typeof(t){return (_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t,e){"object"===(_typeof(exports))&&"undefined"!='object'?e(exports):e((t="undefined"!=typeof globalThis?globalThis:t||self).Haxan={});}(void 0,function(t){var n,e,o=(n=function(t,e){return (n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);})(t,e)},function(t,e){function o(){this.constructor=t;}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o);}),r=(e=Error,o(i,e),i);function i(){var t=null!==e&&e.apply(this,arguments)||this;return t.isHaxanError=!0,t}function s(t){return t&&!0===t.isHaxanError}var u,y=(o(a,u=r),a);function a(){var t=u.call(this)||this;return t.isTimeout=!0,t}var p,l=(o(c,p=r),c);function c(t){var e=p.call(this)||this;return e.isRejection=!0,e.response=t,e}var f,d,b,m=(o(h,f=r),h);function h(){var t=f.call(this)||this;return t.isAbort=!0,t}(o=d=d||{}).Auto="auto",o.Json="json",o.Text="text",o.Stream="stream",(o=b=b||{}).Get="GET",o.Post="POST",o.Put="PUT",o.Patch="PATCH",o.Delete="DELETE",o.Head="HEAD",o.Options="OPTIONS";var _=Object.freeze({__proto__:null,HaxanError:r,isHaxanError:s,HaxanTimeout:y,isHaxanTimeout:function(t){return s(t)&&!0===t.isTimeout},HaxanRejection:l,isHaxanRejection:function(t){return s(t)&&!0===t.isRejection},HaxanAbort:m,isHaxanAbort:function(t){return s(t)&&!0===t.isAbort},get ResponseType(){return d},get HTTPMethod(){return b}});var v=function(){return (v=Object.assign||function(t){for(var e,o=1,n=arguments.length;o<n;o++)for(var r in e=arguments[o])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},w=function(t,s,u,a){return new(u=u||Promise)(function(o,e){function n(t){try{i(a.next(t));}catch(t){e(t);}}function r(t){try{i(a.throw(t));}catch(t){e(t);}}function i(t){var e;t.done?o(t.value):((e=t.value)instanceof u?e:new u(function(t){t(e);})).then(n,r);}i((a=a.apply(t,s||[])).next());})},x=function(o,n){var r,i,s,u={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},t={next:e(0),throw:e(1),return:e(2)};return "function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,i&&(s=2&e[0]?i.return:e[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,e[1])).done)return s;switch(i=0,s&&(e=[2&e[0],s.value]),e[0]){case 0:case 1:s=e;break;case 4:return u.label++,{value:e[1],done:!1};case 5:u.label++,i=e[1],e=[0];continue;case 7:e=u.ops.pop(),u.trys.pop();continue;default:if(!(s=0<(s=u.trys).length&&s[s.length-1])&&(6===e[0]||2===e[0])){u=0;continue}if(3===e[0]&&(!s||e[1]>s[0]&&e[1]<s[3])){u.label=e[1];break}if(6===e[0]&&u.label<s[1]){u.label=s[1],s=e;break}if(s&&u.label<s[2]){u.label=s[2],u.ops.push(e);break}s[2]&&u.ops.pop(),u.trys.pop();continue}e=n.call(o,u);}catch(t){e=[6,t],i=0;}finally{r=s=0;}if(5&e[0])throw e[1];return {value:e[0]?e[1]:void 0,done:!0}}([e,t])}}},P=(j.prototype.setProp=function(t,e){return this._opts[t]=e,this},j.prototype.rejectOn=function(t){return this.setProp("rejectOn",t)},j.prototype.url=function(t){return this.setProp("url",t)},j.prototype.type=function(t){return this.setProp("type",t)},j.prototype.method=function(t){return this.setProp("method",t)},j.prototype.get=function(){return this.method("GET")},j.prototype.head=function(){return this.method("HEAD")},j.prototype.options=function(){return this.method("OPTIONS")},j.prototype.post=function(t){return this.body(t).method("POST")},j.prototype.put=function(t){return this.body(t).method("PUT")},j.prototype.patch=function(t){return this.body(t).method("PATCH")},j.prototype.delete=function(){return this.method("DELETE")},j.prototype.body=function(t){return this.setProp("body",t)},j.prototype.header=function(t,e){return this._opts.headers[t]=e,this},j.prototype.param=function(t,e){return this._opts.query[t]=e,this},j.prototype.timeout=function(t){return this.setProp("timeout",t)},j.prototype.abort=function(t){return this.setProp("abortSignal",t)},j.prototype.normalizedBody=function(){var t=this._opts.body;return null===t?null:"string"==typeof t?t:JSON.stringify(t)},j.prototype.parseBody=function(o){return w(this,void 0,void 0,function(){var e;return x(this,function(t){switch(t.label){case 0:return (e=o.headers.get("content-type"))&&e.startsWith("application/json")?[4,o.json()]:[3,2];case 1:return [2,t.sent()];case 2:return [4,o.text()];case 3:return [2,t.sent()]}})})},j.prototype.getOptions=function(){return this._opts},j.prototype.send=function(){return this.execute()},j.prototype.execute=function(){return this.request()},j.prototype.request=function(){return w(this,void 0,void 0,function(){var r,i,s,u,a,p,c,f,h=this;return x(this,function(t){switch(t.label){case 0:return t.trys.push([0,9,,10]),r=void 0,i="undefined"!=typeof window&&"[object Window]"==={}.toString.call(window),r=i?fetch:nodeFetch__default['default'],s=Object.keys(this._opts.query).length?this._opts.url+"?"+(n=this._opts.query,Object.keys(n).map(function(t){return t+"="+String(n[t])}).join("&")):this._opts.url,[4,Promise.race([r(s,{method:this._opts.method,headers:v(v({"Content-Type":"application/json"},this._opts.headers),{"User-Agent":"Haxan 0.2.1"}),body:(e=this._opts.method,[b.Put,b.Post,b.Patch].includes(e.toUpperCase())?this.normalizedBody():void 0),signal:this._opts.abortSignal}),new Promise(function(t,e){return setTimeout(function(){return e(new y)},h._opts.timeout)})])];case 1:if(u=t.sent(),this._opts.rejectOn(u.status))throw new l(u);return (e=u.headers,o={},e.forEach(function(t,e){o[e]=t;}),a=o,this._opts.type!==d.Auto)?[3,3]:(p={},[4,this.parseBody(u)]);case 2:return [2,(p.data=t.sent(),p.ok=u.ok,p.status=u.status,p.headers=a,p)];case 3:return this._opts.type!==d.Json?[3,5]:(c={},[4,u.json()]);case 4:return [2,(c.data=t.sent(),c.ok=u.ok,c.status=u.status,c.headers=a,c)];case 5:return this._opts.type!==d.Text?[3,7]:(f={},[4,u.text()]);case 6:return [2,(f.data=t.sent(),f.ok=u.ok,f.status=u.status,f.headers=a,f)];case 7:if(this._opts.type===d.Stream&&!i)return [2,{data:u.body,ok:u.ok,status:u.status,headers:a}];t.label=8;case 8:throw new Error("No valid response body parsing method found");case 9:if("AbortError"===(a=t.sent()).name)throw new m;throw a;case 10:return [2]}var o,e,n;})})},j);function j(t,e){this._opts={url:"",headers:{},query:{},method:b.Get,body:void 0,type:d.Auto,rejectOn:function(){return !1},abortSignal:void 0,timeout:3e4},e&&Object.assign(this._opts,e),this.url(t);}function O(t,e){return new P(t,e)}r=function(){var t,e=O;for(t in _)e[t]=_[t];return e.HaxanFactory=P,e}();t.HaxanFactory=P,t.default=r,Object.defineProperty(t,"__esModule",{value:!0});});
	});

	var haxan = unwrapExports(haxan_min);

	var __extends = (undefined && undefined.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var CorinthError = /** @class */ (function (_super) {
	    __extends(CorinthError, _super);
	    function CorinthError(res) {
	        var _this = _super.call(this) || this;
	        _this.isCorinthError = true;
	        _this.res = res;
	        return _this;
	    }
	    return CorinthError;
	}(Error));

	var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var Queue = /** @class */ (function () {
	    function Queue(root, name) {
	        this.$root = root;
	        this.name = name;
	    }
	    Queue.prototype.getName = function () {
	        return this.name;
	    };
	    Queue.prototype.uri = function () {
	        return this.$root.getIp() + "/queue/" + this.name;
	    };
	    Queue.prototype.getUrl = function (route) {
	        return this.uri() + route;
	    };
	    Queue.prototype.ack = function (id) {
	        return __awaiter$1(this, void 0, void 0, function () {
	            var res;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, haxan(this.getUrl("/" + id + "/ack"))
	                            .method(haxan.HTTPMethod.Post)
	                            .send()];
	                    case 1:
	                        res = _a.sent();
	                        if (res.ok) {
	                            return [2 /*return*/, true];
	                        }
	                        throw new CorinthError(res);
	                }
	            });
	        });
	    };
	    Queue.prototype.peek = function () {
	        return __awaiter$1(this, void 0, void 0, function () {
	            var res;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, haxan(this.getUrl("/peek")).send()];
	                    case 1:
	                        res = _a.sent();
	                        if (res.ok) {
	                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                            return [2 /*return*/, res.data.result.item || null];
	                        }
	                        throw new CorinthError(res);
	                }
	            });
	        });
	    };
	    Queue.prototype.dequeue = function (_a) {
	        var _b = _a === void 0 ? {} : _a, _c = _b.ack, ack = _c === void 0 ? false : _c, _d = _b.amount, amount = _d === void 0 ? 1 : _d;
	        return __awaiter$1(this, void 0, void 0, function () {
	            var request, res;
	            var _this = this;
	            return __generator$1(this, function (_e) {
	                switch (_e.label) {
	                    case 0:
	                        request = haxan(this.getUrl("/dequeue"))
	                            .method(haxan.HTTPMethod.Post)
	                            .param("amount", amount);
	                        if (ack) {
	                            request.param("ack", "true");
	                        }
	                        return [4 /*yield*/, request.send()];
	                    case 1:
	                        res = _e.sent();
	                        if (res.ok) {
	                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                            return [2 /*return*/, res.data.result.items.map(function (item) { return ({
	                                    message: item,
	                                    ack: function () { return __awaiter$1(_this, void 0, void 0, function () {
	                                        return __generator$1(this, function (_a) {
	                                            if (ack) {
	                                                return [2 /*return*/, true];
	                                            }
	                                            else {
	                                                return [2 /*return*/, this.ack(item.id)];
	                                            }
	                                        });
	                                    }); },
	                                }); })];
	                        }
	                        throw new CorinthError(res);
	                }
	            });
	        });
	    };
	    Queue.prototype.enqueueOne = function (item, deduplication) {
	        if (deduplication === void 0) { deduplication = null; }
	        return __awaiter$1(this, void 0, void 0, function () {
	            return __generator$1(this, function (_a) {
	                return [2 /*return*/, this.enqueue([{ item: item, deduplication: deduplication }])];
	            });
	        });
	    };
	    Queue.prototype.enqueue = function (messages) {
	        return __awaiter$1(this, void 0, void 0, function () {
	            var res;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, haxan(this.getUrl("/enqueue"))
	                            .post({
	                            messages: messages,
	                        })
	                            .send()];
	                    case 1:
	                        res = _a.sent();
	                        if (res.ok) {
	                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                            return [2 /*return*/, res.data.result];
	                        }
	                        throw new CorinthError(res);
	                }
	            });
	        });
	    };
	    Queue.prototype.stat = function () {
	        return __awaiter$1(this, void 0, void 0, function () {
	            var res;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, haxan(this.uri()).send()];
	                    case 1:
	                        res = _a.sent();
	                        if (res.ok) {
	                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                            return [2 /*return*/, res.data.result.queue];
	                        }
	                        throw new CorinthError(res);
	                }
	            });
	        });
	    };
	    Queue.prototype.size = function () {
	        return __awaiter$1(this, void 0, void 0, function () {
	            var size;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.stat()];
	                    case 1:
	                        size = (_a.sent()).size;
	                        return [2 /*return*/, size];
	                }
	            });
	        });
	    };
	    Queue.prototype.purge = function () {
	        return __awaiter$1(this, void 0, void 0, function () {
	            var res;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, haxan(this.getUrl("/purge")).delete().send()];
	                    case 1:
	                        res = _a.sent();
	                        if (res.ok) {
	                            return [2 /*return*/, true];
	                        }
	                        throw new CorinthError(res);
	                }
	            });
	        });
	    };
	    Queue.prototype.edit = function (opts) {
	        return __awaiter$1(this, void 0, void 0, function () {
	            return __generator$1(this, function (_a) {
	                return [2 /*return*/, this.update(opts)];
	            });
	        });
	    };
	    Queue.prototype.update = function (opts) {
	        return __awaiter$1(this, void 0, void 0, function () {
	            var res;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, haxan(this.uri()).patch(opts).send()];
	                    case 1:
	                        res = _a.sent();
	                        if (res.ok) {
	                            return [2 /*return*/, true];
	                        }
	                        throw new CorinthError(res);
	                }
	            });
	        });
	    };
	    Queue.prototype.exists = function () {
	        return __awaiter$1(this, void 0, void 0, function () {
	            var error_1;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        _a.trys.push([0, 2, , 3]);
	                        return [4 /*yield*/, this.stat()];
	                    case 1:
	                        _a.sent();
	                        return [2 /*return*/, true];
	                    case 2:
	                        error_1 = _a.sent();
	                        if (error_1.isCorinthError) {
	                            if (error_1.res.status === 404) {
	                                return [2 /*return*/, false];
	                            }
	                        }
	                        throw error_1;
	                    case 3: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    Queue.prototype.delete = function () {
	        return __awaiter$1(this, void 0, void 0, function () {
	            var res;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, haxan(this.uri()).delete().send()];
	                    case 1:
	                        res = _a.sent();
	                        if (res.ok) {
	                            return [2 /*return*/, true];
	                        }
	                        throw new CorinthError(res);
	                }
	            });
	        });
	    };
	    Queue.prototype.create = function (opts) {
	        return __awaiter$1(this, void 0, void 0, function () {
	            var request, res;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        request = haxan(this.uri()).method(haxan.HTTPMethod.Put);
	                        if ((opts === null || opts === void 0 ? void 0 : opts.dead_letter_queue) !== undefined) {
	                            request.param("dead_letter_queue_name", opts.dead_letter_queue.getName());
	                        }
	                        if ((opts === null || opts === void 0 ? void 0 : opts.dead_letter_queue_threshold) !== undefined) {
	                            request.param("dead_letter_queue_threshold", String(opts.dead_letter_queue_threshold));
	                        }
	                        if ((opts === null || opts === void 0 ? void 0 : opts.deduplication_time) !== undefined) {
	                            request.param("deduplication_time", String(opts.deduplication_time));
	                        }
	                        if ((opts === null || opts === void 0 ? void 0 : opts.max_length) !== undefined) {
	                            request.param("max_length", String(opts.max_length));
	                        }
	                        if ((opts === null || opts === void 0 ? void 0 : opts.persistent) !== undefined) {
	                            request.param("persistent", String(opts.persistent));
	                        }
	                        if ((opts === null || opts === void 0 ? void 0 : opts.requeue_time) !== undefined) {
	                            request.param("requeue_time", String(opts.requeue_time));
	                        }
	                        return [4 /*yield*/, request.send()];
	                    case 1:
	                        res = _a.sent();
	                        if (res.ok) {
	                            return [2 /*return*/, true];
	                        }
	                        throw new CorinthError(res);
	                }
	            });
	        });
	    };
	    Queue.prototype.ensure = function (opts) {
	        return __awaiter$1(this, void 0, void 0, function () {
	            var error_2;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        _a.trys.push([0, 2, , 3]);
	                        return [4 /*yield*/, this.create(opts)];
	                    case 1: return [2 /*return*/, _a.sent()];
	                    case 2:
	                        error_2 = _a.sent();
	                        if (error_2.isCorinthError) {
	                            if (error_2.res.status === 409) {
	                                return [2 /*return*/, true];
	                            }
	                        }
	                        throw error_2;
	                    case 3: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    return Queue;
	}());

	var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	// type LoggerFunction = (...msgs: any[]) => void;
	// interface ICorinthRootOptions {
	//   logger: LoggerFunction;
	// }
	var Corinth = /** @class */ (function () {
	    // private logger?: LoggerFunction;
	    function Corinth(ip /*opts?: ICorinthRootOptions*/) {
	        this.ip = ip;
	        // this.logger = opts?.logger;
	    }
	    Corinth.prototype.getIp = function () {
	        return this.ip;
	    };
	    Corinth.prototype.uri = function (route) {
	        return "" + this.ip + route;
	    };
	    // getLogger(): LoggerFunction | undefined {
	    //   return this.logger;
	    // }
	    Corinth.prototype.version = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var version;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.stat()];
	                    case 1:
	                        version = (_a.sent()).version;
	                        return [2 /*return*/, version];
	                }
	            });
	        });
	    };
	    Corinth.prototype.stat = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var request, res;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        request = haxan(this.uri("/"));
	                        return [4 /*yield*/, request.send()];
	                    case 1:
	                        res = _a.sent();
	                        if (res.ok) {
	                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                            return [2 /*return*/, res.data.result.info];
	                        }
	                        throw new CorinthError(res);
	                }
	            });
	        });
	    };
	    Corinth.prototype.listQueues = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var request, res;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        request = haxan(this.uri("/queues"));
	                        return [4 /*yield*/, request.send()];
	                    case 1:
	                        res = _a.sent();
	                        if (res.ok) {
	                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                            return [2 /*return*/, res.data.result.queues.items];
	                        }
	                        throw new CorinthError(res);
	                }
	            });
	        });
	    };
	    Corinth.prototype.queueExists = function (name) {
	        return __awaiter(this, void 0, void 0, function () {
	            var queue;
	            return __generator(this, function (_a) {
	                queue = new Queue(this, name);
	                return [2 /*return*/, queue.exists()];
	            });
	        });
	    };
	    Corinth.prototype.defineQueue = function (name) {
	        return new Queue(this, name);
	    };
	    return Corinth;
	}());

	exports.MessageState = void 0;
	(function (MessageState) {
	    MessageState[MessageState["Pending"] = 0] = "Pending";
	    MessageState[MessageState["Requeued"] = 1] = "Requeued";
	})(exports.MessageState || (exports.MessageState = {}));

	exports.Corinth = Corinth;
	exports.CorinthError = CorinthError;
	exports.Queue = Queue;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
