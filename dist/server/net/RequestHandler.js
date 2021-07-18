"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const mime_1 = __importDefault(require("mime"));
const fs_1 = require("fs");
class RequestHandler {
    constructor(res, url) {
        this.res = res;
        this.url = url;
    }
    start() {
        this.handleFile();
    }
    handleFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield fs_1.promises.readFile(this.url.substring(1), "utf-8");
                const typeSplit = this.url.split(".");
                const type = mime_1.default.getType(typeSplit[typeSplit.length - 1]);
                this.res.writeHead(200, {
                    "Content-Type": type !== null && type !== void 0 ? type : "application/octet-stream"
                });
                this.res.end(file);
            }
            catch (e) {
                this.res.writeHead(404);
                this.res.end();
            }
        });
    }
}
exports.RequestHandler = RequestHandler;
