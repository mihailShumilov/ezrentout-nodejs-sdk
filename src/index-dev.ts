import 'dotenv/config';
import {EzRentOut} from "./class/EzRentOut";


(async () => {
    const instance = new EzRentOut(process.env.EZRENTOUT_API_KEY ?? '', process.env.EZRENTOUT_SUBDOMAIN ?? '');

    // const group = await instance.createGroup({
    //     name: '222 Test Group 222',
    //     description: '222 Test Group Description 222'
    // }, 156661);
    // console.log({group});

    // const result = await instance.getAllAssets();
    const result = await instance.getAllGroups(1);
    console.log(result.data);

    // if (result.data[5].id) {
    //     const singleAsset = await instance.getAssetById(result.data[5].id ?? 0);
    //     console.log({singleAsset});
    // } else {
    //     console.log('No asset id found');
    // }

    // const group = await instance.createGroup({
    //     name: 'Test Group',
    //     description: 'Test Group Description'
    // });
    // console.log({group});
})();