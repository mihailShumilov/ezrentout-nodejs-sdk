import {ResponseDataKey} from "./ResponseDataKey";

/**
 * Represents a mapping of keys to arrays of generic entity items.
 *
 * This utility type is useful when representing structured data
 * where each key corresponds to an array of specific entities.
 *
 * @template T - The type of the individual entity items within the arrays.
 * @template K - A subset of keys from the ResponseDataKey type, acting as the keys in the resulting object type.
 */
type EntityItems<T, K extends ResponseDataKey> = {
    [key in K]: T;
};

/**
 * Represents a single entity response that combines specific entity properties
 * with optional metadata information such as group details and vendor name.
 *
 * @template T - The type of the entity data.
 * @template K - The key type extending ResponseDataKey, default is ResponseDataKey.
 *
 * @typedef {Object} SingleEntityResponse
 * @property {string} [group_name] - Optional name of the group associated with the entity.
 * @property {string} [sub_group_name] - Optional name of the subgroup associated with the entity.
 * @property {string} [vendor_name] - Optional name of the vendor associated with the entity.
 */
export type SingleEntityResponse<T, K extends ResponseDataKey = ResponseDataKey> =
    EntityItems<T, K> & {
    group_name?: string,
    sub_group_name?: string,
    vendor_name?: string
};

// Example for assets:
// type AssetResponse = SingleEntityResponse<Asset, ResponseDataKey.Assets>