const M = 100000000;
const MCountSymbols = 9;

export const satoshiToVLX = (value: number): number => {
	return value / M;
};

export const VLXtoSatoshi = (value: number): bigint => {
	const str = value.toString();
	const dotIndex = str.indexOf('.');
	if (dotIndex == -1) {
		return BigInt(value * M);
	}
	let strConverted = str.replace('.', '');
	if (str.indexOf('0.') != -1) {
		strConverted = str.replace('0.', '');
	}

	if (MCountSymbols - str.length + dotIndex < 0) throw new Error('value smaller then satoshi');
	const strConverted2 = addZeroToEnd(strConverted, MCountSymbols - str.length + dotIndex);
	return BigInt(strConverted2);
};

const addZeroToEnd = (str: string, count: number): string => {
	let newStr = str;
	for (let i = 0; i < count; i++) {
		newStr += '0';
	}
	return newStr;
};
