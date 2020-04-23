import axios, {AxiosInstance} from "axios";
import Wallet from "./Wallet";

let config = {
	// baseUrl: "https://api.velas.website/api/mainnet",
	// baseURL: process.env.baseURL || process.env.apiUrl || ""
	timeout: 60 * 1000, // Timeout
	// withCredentials: true, // Check cross-site Access-Control
};


export default class {
	private readonly http: AxiosInstance;
	public wallet: Wallet;

	constructor(network: string) {
		const basePath = `https://api.velas.website/api/${network}`;
		this.http = axios.create(config);
		this.wallet = new Wallet(this.http, basePath);
	}

}