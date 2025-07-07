import {ResponseDataKey} from "./ResponseDataKey";

/**
 * Represents a generic type for paginated items within a response.
 *
 * This utility type maps a specific key from a response data structure to an array of items of the given type `T`.
 * The key, defined by the generic parameter `K`, must extend the list of valid keys in the response data.
 *
 * This type is useful for modeling paged response objects where the structure associates a specific key of the response with an array of data items.
 *
 * @template T - The type of the items in the paginated response data.
 * @template K - A key in the response data object which must extend `ResponseDataKey`.
 */
type PagedItems<T, K extends ResponseDataKey> = {
    [key in K]: T[];
};

/**
 * Represents a paged response structure that includes paginated items of a specific type and
 * the total number of pages available.
 *
 * This type extends the `PagedItems` interface, which provides a detailed structure for
 * handling paginated data, and adds a `total_pages` property representing the total
 * number of pages in the dataset.
 *
 * @template T The type of the items included in the paged response.
 * @template K The key in the response that contains the data; defaults to `ResponseDataKey`.
 */
export type PagedResponse<T, K extends ResponseDataKey = ResponseDataKey> =
    PagedItems<T, K> & {
    total_pages: number;
};

// Example for assets:
// type AssetsResponse = PagedResponse<Asset, ResponseDataKey.Assets>