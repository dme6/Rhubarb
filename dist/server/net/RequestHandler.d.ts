/// <reference types="node" />
import http from "http";
export declare class RequestHandler {
    private res;
    private url;
    constructor(res: http.ServerResponse, url: string);
    start(): void;
    private handleFile;
}
