import axios, {AxiosInstance} from "axios";

export class EzRentOut {
    private readonly apiKey: string;
    private readonly subdomain: string;

    protected request: AxiosInstance;

    constructor(apiKey: string, subdomain: string) {
        this.apiKey = apiKey;
        this.subdomain = subdomain;

        this.request = axios.create({
            baseURL: `https://${this.subdomain}.ezrentout.com/`,
            timeout: 10000,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "token":this.apiKey
            },
        })
    }

    public async getAllAssets(page: number = 1): Promise<any> {
        const result = await this.request.get('/assets.api',{
            params: {
                page,
                include_custom_fields: true,
                show_document_urls: true,
                show_image_urls: true,
                show_document_details: true
            }
        });

        return result.data;
    }
}