// This type ensures the key matches exactly one DataKey, not both
import {ResponseDataKey} from "./ResponseDataKey";

export type ApiPagedResponse<T, K extends ResponseDataKey = ResponseDataKey> = {
    data: T[];
    total_pages: number;
}

// Example for assets:
// type AssetsResponse = ApiPagedResponse<Asset, ResponseDataKey.Assets>