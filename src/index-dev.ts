import 'dotenv/config';
import {EzRentOut} from "./class/EzRentOut";


(async()=>{
    const instance = new EzRentOut(process.env.EZRENTOUT_API_KEY??'', process.env.EZRENTOUT_SUBDOMAIN??'');

    const result = await instance.getAllAssets();
    console.log(result.data[5]);

    if(result.data[5].sequence_num) {
        const singleAsset = await instance.getAssetById(result.data[5].sequence_num??0);
        console.log({singleAsset});
    }else{
        console.log('No asset id found');
    }
})();