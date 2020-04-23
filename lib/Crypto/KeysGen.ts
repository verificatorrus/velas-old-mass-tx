import HDKeys, { derivePath } from "./HDKeys";

export default class {
	private sodium: any;
	constructor(sodium) {
		this.sodium = sodium;
	}
	generateRandom = (): HDKeys => {
		const keyPair = this.sodium.crypto_sign_keypair();
		return new HDKeys(keyPair);
	};

	fromPrivateKey = (privateKey: string): HDKeys => {
		const pkBuf = Buffer.from(privateKey, 'hex');
		const seed = this.sodium.crypto_sign_ed25519_sk_to_seed(pkBuf);
		const keyPair = this.sodium.crypto_sign_seed_keypair(seed);
		return new HDKeys(keyPair);
	};

	// fromSeed = (seed: string, path = 'm/0\''): HDKeys => {
	fromSeed = (seed: string, path = 0): HDKeys => {
		const path_index = 'm/' + path + '\'';
		const { key } = derivePath(path_index, seed);
		return new HDKeys(this.sodium.crypto_sign_seed_keypair(key));
	};
}
