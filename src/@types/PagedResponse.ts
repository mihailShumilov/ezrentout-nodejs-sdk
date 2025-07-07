import {ResponseDataKey} from "./ResponseDataKey";

/**
 * Represents the paged items keyed by a ResponseDataKey.
 */
type PagedItems<T, K extends ResponseDataKey> = {
    [key in K]: T[];
};

/**
 * Represents a paged API response without a wrapper data property.
 * @template T - The type of each item in the result array.
 * @template K - The key in the response object, defaults to ResponseDataKey.
 */
export type PagedResponse<T, K extends ResponseDataKey = ResponseDataKey> =
    PagedItems<T, K> & {
    total_pages: number;
};

// Example for assets:
// type AssetsResponse = PagedResponse<Asset, ResponseDataKey.Assets>