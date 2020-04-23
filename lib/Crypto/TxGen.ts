import {Out} from "./Dto/Transaction";
import HDKeys from "./HDKeys";
import Transaction from "./Transaction";

export default class {
	private readonly sodium;

	constructor(sodium) {
		this.sodium = sodium;
	}

	public generate = (unspents: Out<bigint>[], amount: bigint, velasKey: HDKeys, changeAddress: string, to: string, commission: bigint) => {
		return new Transaction(this.sodium, unspents, amount, velasKey, changeAddress, to, commission);
	}
}