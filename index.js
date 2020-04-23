"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
exports.__esModule = true;
var utils_1 = require("./lib/Crypto/utils");
var Client_1 = require("./lib/Client");
var Crypto_1 = require("./lib/Crypto");
// import Bigint
// import * as bip39 from 'bip39';
var unspentTx = [
    {
        "hash": "12835a56a588a2113f3c7b092bc527301e7ee9b8d8f47430c93708f6c97c88a2",
        "index": 9202,
        "value": 91600000000
    },
];
var unspentData = unspentTx.map(function (out) { return (__assign(__assign({}, out), { value: BigInt(out.value) })); });
console.log(unspentData);
function send(privateKey, to_addr) {
    return __awaiter(this, void 0, void 0, function () {
        var client, vc, hdKeys, wallet, wallet_addr, unspents, e_1, new_count, new_unspents, money, i, amount, satoshiAmount, txUnsigned, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new Client_1["default"]("mainnet");
                    return [4 /*yield*/, Crypto_1["default"].init()];
                case 1:
                    vc = _a.sent();
                    hdKeys = vc.keysGen.fromPrivateKey(privateKey);
                    wallet = hdKeys.toWallet();
                    wallet_addr = wallet.Base58Address;
                    console.log("From wallet: " + wallet_addr);
                    unspents = [];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, client.wallet.getUnspents(wallet_addr)];
                case 3:
                    unspents = _a.sent();
                    console.log("Unspent: " + unspents[0].value);
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log("Error in getUnspents");
                    unspents = unspentData;
                    return [3 /*break*/, 5];
                case 5:
                    console.log("Unspent: " + unspents[0].value);
                    if (unspents.length == 0 || unspents[0].value <= 0) {
                        return [2 /*return*/, 0];
                    }
                    new_count = unspents.length > 1 ? 1 : unspents.length;
                    console.log("Total tx: " + new_count);
                    new_unspents = [];
                    money = 0;
                    for (i = 0; i < new_count; i++) {
                        console.log("Current i " + i);
                        new_unspents.push(unspents[i]);
                        money = money + Number(unspents[i].value);
                    }
                    amount = money / 100000000 - 0.001;
                    amount = +(amount.toFixed(8));
                    try {
                        satoshiAmount = utils_1.VLXtoSatoshi((amount));
                        console.log("VLXtoSatoshi: " + satoshiAmount);
                    }
                    catch (e) {
                        console.log("Error in VLXtoSatoshi");
                        throw "Error in VLXtoSatoshi";
                    }
                    txUnsigned = vc.tx.generate(new_unspents, utils_1.VLXtoSatoshi(amount), hdKeys, wallet_addr, to_addr, BigInt(100000));
                    tx = txUnsigned.sign();
                    return [4 /*yield*/, client.wallet.send(tx)
                            .then(function () {
                            console.log("Send " + new_count + " tx");
                            console.log("Amount: " + amount);
                            // setTimeout(function () {
                            //     send(privateKey, to_addr);
                            // }, 3000);
                        })["catch"](function (err) {
                            console.log(err);
                        })];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var privateKey = process.argv[2] || "";
var addr = process.argv[3] || "";
if (privateKey === "" || addr === "") {
    console.log("PRIVATE_KEY or ADDRESS not found");
    console.log("Use: npm run send [MNEMPRIVATE_KEYONIC] [ADDRESS]");
}
else {
    send(privateKey, addr);
}
