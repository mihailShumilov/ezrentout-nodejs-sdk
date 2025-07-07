// This type ensures the key matches exactly one DataKey, not both
import {ResponseDataKey} from "./ResponseDataKey";

/**
 * Represents a generic API paged response structure.
 *
 * @template T - The type of the data items contained in the response.
 * @template K - The key type for the response data, extending the `ResponseDataKey` type.
 *
 * @property {T[]} data - An array containing the data items returned in the response.
 * @property {number} total_pages - The total number of pages available for the request.
 */
export type ApiPagedResponse<T, K extends ResponseDataKey = ResponseDataKey> = {
    data: T[];
    total_pages: number;
}

// Example for assets:
// type AssetsResponse = ApiPagedResponse<Asset, ResponseDataKey.Assets>