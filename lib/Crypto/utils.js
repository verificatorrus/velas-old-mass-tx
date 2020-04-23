"use strict";
exports.__esModule = true;
var M = 100000000;
var MCountSymbols = 9;
exports.satoshiToVLX = function (value) {
    return value / M;
};
exports.VLXtoSatoshi = function (value) {
    var str = value.toString();
    var dotIndex = str.indexOf('.');
    if (dotIndex == -1) {
        return BigInt(value * M);
    }
    var strConverted = str.replace('.', '');
    if (str.indexOf('0.') != -1) {
        strConverted = str.replace('0.', '');
    }
    if (MCountSymbols - str.length + dotIndex < 0)
        throw new Error('value smaller then satoshi');
    var strConverted2 = addZeroToEnd(strConverted, MCountSymbols - str.length + dotIndex);
    return BigInt(strConverted2);
};
var addZeroToEnd = function (str, count) {
    var newStr = str;
    for (var i = 0; i < count; i++) {
        newStr += '0';
    }
    return newStr;
};
