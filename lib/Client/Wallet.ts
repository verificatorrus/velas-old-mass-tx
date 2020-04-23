import { AxiosInstance } from 'axios';
import { Out } from "../Crypto/Dto/Transaction";
import Transaction from "../Crypto/Transaction";
import { satoshiToVLX } from "../Crypto/utils";
import {HistoryDto} from "./Dtos/HistoryDto";

export default class {
	private readonly http: AxiosInstance;
	private readonly baseAddress: string;

	constructor(http: AxiosInstance, baseAddress: string) {
		this.http = http;
		this.baseAddress = baseAddress;
		// this.baseAddress = "https://api.velas.website/api/mainnet"
	}

	public getBalance = async (address: string): Promise<number> => {
		try {
			const { data } = await this.http.get<{ amount: number }>(`${this.baseAddress}/balance/${address}`);
			return satoshiToVLX(data.amount);
		} catch (e) {
			console.error(e);
		}
	};

	public getHistory = async (address: string): Promise<HistoryDto[]> => {
		try {
			const { data } = await this.http.get<HistoryDto[]>(`${this.baseAddress}/history/${address}`);
			return data;
		} catch (e) {
			console.error(e);
		}
	};



	public getUnspents = async (address: string): Promise<Out<bigint>[]> => {
		try {
			const { data } = await this.http.get<Out<number>[]>(`${this.baseAddress}/unspent/${address}`);
			return data.map(out => ({ ...out, value: BigInt(out.value) }))
		} catch (e) {
			console.error(e);
		}
	};

	public send = async (tx: Transaction): Promise<boolean> => {
		try {
			const txJSON = tx.toJSON();
			const { data } = await this.http.post(`${this.baseAddress}/send`, txJSON,
				{ 'headers': { 'Content-Type': 'application/json' } });
			return data.result == 'ok';
		} catch (e) {
			console.error(e);
		}
	}
}
