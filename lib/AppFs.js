import { remote } from 'electron';
import Encrypting from "./Encrypting";
import * as fs from 'fs';
import * as _ from 'lodash';
export default class {
    constructor() {
        this.dataExist = () => fs.existsSync(this.dataPath);
        this.createDataDir = () => fs.mkdirSync(this.dataDir, { recursive: true });
        this.loadData = (pwd) => {
            const encryptedData = fs.readFileSync(this.dataPath).toString();
            // const encryptedData = fs.readFileSync(this.dataPath, 'utf8');
            let data = new Encrypting(pwd).decrypt(encryptedData);
            console.log(data);
            console.log(data.length);
            return JSON.parse(data);
        };
        this.saveData = (v, pwd) => {
            if (!this.dataExist()) {
                this.createDataDir();
            }
            const json = JSON.stringify(v);
            console.log(json);
            const encryptedData = new Encrypting(pwd).encrypt(json);
            fs.writeFileSync(this.dataPath, encryptedData);
        };
        this.saveUpdateUrl = () => {
            if (!this.dataExist()) {
                // return false;
                this.createDataDir();
            }
            const urlData = `provider: generic\n
url: https://api.velas.website/api\n
channel: latest\n
`;
            fs.writeFileSync(this.udateUrlPath, urlData);
        };
        const devDir = 'c:/___el-test';
        console.log('AppFs:: remote =', remote);
        console.log('AppFs:: fs =', fs);
        const userData = remote.app.getPath('userData');
        console.log('userData =', userData);
        const appPath = _.get(remote, 'process.argv0') || '';
        const appDir = appPath.split(/[\\\/]/).slice(0, -1).join('/') || '.';
        this.dataDir = (appDir.search('node_modules') === -1 ?
            userData : devDir) + '/lib';
        console.log('this.dataDir =', this.dataDir);
        this.dataPath = this.dataDir + '/langs.dll';
        this.udateUrlPath = this.dataDir + '/app-update.yml';
    }
}
//# sourceMappingURL=AppFs.js.map