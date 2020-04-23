"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var Wallet_1 = require("./Wallet");
var config = {
    // baseUrl: "https://api.velas.website/api/mainnet",
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    timeout: 60 * 1000
};
var default_1 = /** @class */ (function () {
    function default_1(network) {
        var basePath = "https://api.velas.website/api/" + network;
        this.http = axios_1["default"].create(config);
        this.wallet = new Wallet_1["default"](this.http, basePath);
    }
    return default_1;
}());
exports["default"] = default_1;
