import 'dotenv/config';
import {EzRentOut} from "./class/EzRentOut";


(async()=>{
    const instance = new EzRentOut(process.env.EZRENTOUT_API_KEY??'', process.env.EZRENTOUT_SUBDOMAIN??'');

    const assets = await instance.getAllAssets();
    console.log(assets);
})();