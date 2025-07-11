import axios, {AxiosInstance} from "axios";
import {
    Asset,
    User,
    Group,
    PagedResponse,
    AssetCreateRequest,
    AssetUpdateRequest,
    GroupCreateRequest,
    GroupUpdateRequest,
    SubGroup
} from "../@types";
import {ResponseDataKey} from "../@types/ResponseDataKey";
import {ApiPagedResponse} from "../@types/ApiPagedResponse";
import {SingleEntityResponse} from "../@types/SingleEntityResponse";

/**
 * Represents a client for interacting with the EzRentOut API.
 * Provides methods to manage assets, users, orders, groups, and locations.
 */
export class EzRentOut {
    private readonly apiKey: string;
    private readonly subdomain: string;

    protected request: AxiosInstance;

    /**
     * Creates an instance of the API client with the provided API key and subdomain.
     *
     * @param {string} apiKey - The API key used for authenticating API requests.
     * @param {string} subdomain - The subdomain of the API endpoint.
     * @return {void} Constructs the API client instance and initializes the HTTP request configuration.
     */
    constructor(apiKey: string, subdomain: string) {
        this.apiKey = apiKey;
        this.subdomain = subdomain;

        this.request = axios.create({
            baseURL: `https://${this.subdomain}.ezrentout.com/`,
            timeout: 10000,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token: this.apiKey
            },
        })
    }

    /**
     * Retrieves a paginated list of all assets.
     *
     * @param {number} [page=1] - The page number to retrieve. Defaults to 1.
     * @return {Promise<ApiPagedResponse<Asset, ResponseDataKey.Assets>>}
     *         A promise that resolves to an object containing the list of assets and pagination details.
     * @throws {Error} Throws an error if the request fails.
     */
    public async getAllAssets(page: number = 1): Promise<ApiPagedResponse<Asset, ResponseDataKey.Assets>> {
        try {
            const result = await this.request.get<PagedResponse<Asset, ResponseDataKey.Assets>>('/assets.api', {
                params: {
                    page,
                    include_custom_fields: true,
                    show_document_urls: true,
                    show_image_urls: true,
                    show_document_details: true
                }
            });

            return {
                data: result.data.assets.map((asset) => {
                    if (!asset.id && asset.sequence_num) {
                        asset.id = asset.sequence_num;
                    }
                    return asset;
                }),
                total_pages: result.data.total_pages
            };
        } catch (error: any) {
            throw new Error(`Failed to get all asset: ${error.message}`);
        }
    }

    /**
     * Retrieves an asset by its ID.
     * @param assetId The ID of the asset.
     * @returns The asset data.
     */
    public async getAssetById(assetId: number): Promise<Asset> {
        try {
            const result = await this.request.get<SingleEntityResponse<Asset, ResponseDataKey.Asset>>(`/assets/${assetId}.api`, {
                params: {
                    include_custom_fields: true,
                    show_document_urls: true,
                    show_services_details: true,
                    show_image_urls: true,
                    show_document_details: true
                }
            });

            const asset = result.data.asset;
            if (!asset.id && asset.sequence_num) {
                asset.id = asset.sequence_num;
            }
            return asset;
        } catch (error: any) {
            throw new Error(`Failed to get asset by id: ${assetId} - ${error.message}`);
        }
    }

    /**
     * Creates a new asset.
     * @param assetData The asset data to create.
     * @returns The created asset.
     */
    public async createAsset(assetData: Asset | AssetCreateRequest): Promise<Asset> {
        try {
            const result = await this.request.post('/assets.api', assetData);
            return result.data as Asset;
        } catch (error: any) {
            throw new Error(`Failed to create asset: ${error.message}`);
        }
    }

    /**
     * Updates an asset by its ID.
     * @param assetId The ID of the asset.
     * @param assetData The updated asset data.
     * @returns The updated asset.
     */
    public async updateAsset(assetId: number, assetData: AssetUpdateRequest): Promise<Asset> {
        try {
            const result = await this.request.put(`/assets/${assetId}.api`, assetData);
            return result.data as Asset;
        } catch (error: any) {
            throw new Error(`Failed to update asset with id ${assetId}: ${error.message}`);
        }
    }

    /**
     * Deletes an asset by its ID.
     * @param assetId The ID of the asset.
     * @returns The deletion response.
     */
    public async deleteAsset(assetId: number): Promise<any> {
        try {
            const result = await this.request.delete(`/assets/${assetId}.api`);
            return result.data;
        } catch (error: any) {
            throw new Error(`Failed to delete asset with id ${assetId}: ${error.message}`);
        }
    }

    /**
     * Retrieves all users.
     * @param page Page number for pagination.
     * @returns List of users.
     */
    public async getAllUsers(page: number = 1): Promise<User[]> {
        try {
            const result = await this.request.get('/users.api', {
                params: {page}
            });
            return result.data as User[];
        } catch (error: any) {
            throw new Error(`Failed to get all users: ${error.message}`);
        }
    }

    /**
     * Retrieves a user by their ID.
     * @param userId The ID of the user.
     * @returns The user data.
     */
    public async getUserById(userId: number): Promise<any> {
        try {
            const result = await this.request.get(`/users/${userId}.api`);
            return result.data;
        } catch (error: any) {
            throw new Error(`Failed to get user by id ${userId}: ${error.message}`);
        }
    }

    /**
     * Creates a new order.
     * @param orderData The order data to create.
     * @returns The created order.
     */
    public async createOrder(orderData: any): Promise<any> {
        try {
            const result = await this.request.post('/orders.api', orderData);
            return result.data;
        } catch (error: any) {
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }

    /**
     * Retrieves an order by its ID.
     * @param orderId The ID of the order.
     * @returns The order data.
     */
    public async getOrderById(orderId: number): Promise<any> {
        try {
            const result = await this.request.get(`/orders/${orderId}.api`);
            return result.data;
        } catch (error: any) {
            throw new Error(`Failed to get order by id ${orderId}: ${error.message}`);
        }
    }

    /**
     * Updates an order by its ID.
     * @param orderId The ID of the order.
     * @param orderData The updated order data.
     * @returns The updated order.
     */
    public async updateOrder(orderId: number, orderData: any): Promise<any> {
        try {
            const result = await this.request.put(`/orders/${orderId}.api`, orderData);
            return result.data;
        } catch (error: any) {
            throw new Error(`Failed to update order with id ${orderId}: ${error.message}`);
        }
    }

    /**
     * Deletes an order by its ID.
     * @param orderId The ID of the order.
     * @returns The deletion response.
     */
    public async deleteOrder(orderId: number): Promise<any> {
        try {
            const result = await this.request.delete(`/orders/${orderId}.api`);
            return result.data;
        } catch (error: any) {
            throw new Error(`Failed to delete order with id ${orderId}: ${error.message}`);
        }
    }

    /**
     * Fetches a list of groups from either the main classification view or a subgroup based on the provided parameters.
     *
     * @param {number} [page=1] - The page number to retrieve when fetching from the main classification view. Defaults to 1.
     * @param {number} [parentId] - The ID of the parent group to fetch subgroups for. If provided, retrieves subgroups instead of the main classification.
     * @return {Promise<ApiPagedResponse<Group, ResponseDataKey.Groups>>} A promise resolving to an object containing the fetched groups and the total number of pages.
     * @throws {Error} Throws an error if the request fails.
     */
    public async getAllGroups(page: number = 1, parentId?: number): Promise<ApiPagedResponse<Group|SubGroup, ResponseDataKey.Groups|ResponseDataKey.SubGroups>> {
        try {
            const getAllGroupsUrl = parentId ? `/groups/get_sub_groups.api` : '/assets/classification_view.api';

            const params = parentId ? {
                group_id: parentId,
            } : {
                page,
                show_document_details: true
            };

            const result = await this.request.get<PagedResponse<Group|SubGroup, ResponseDataKey.Groups|ResponseDataKey.SubGroups>>(getAllGroupsUrl, {
                params
            });
            return {
                data: parentId?result.data.sub_groups:result.data.groups,
                total_pages: result.data.total_pages
            };
        } catch (error: any) {
            throw new Error(`Failed to get all groups: ${error.message}`);
        }
    }

    /**
     * Retrieves all locations.
     * @param page Page number for pagination.
     * @returns List of locations.
     */
    public async getAllLocations(page: number = 1): Promise<any> {
        try {
            const result = await this.request.get('/locations.api', {
                params: {page}
            });
            return result.data;
        } catch (error: any) {
            throw new Error(`Failed to get all locations: ${error.message}`);
        }
    }

    /**
     * Checks the API status.
     * @returns The API status.
     */
    public async checkApiStatus(): Promise<any> {
        try {
            const result = await this.request.get('/api_status.api');
            return result.data;
        } catch (error: any) {
            throw new Error(`Failed to check API status: ${error.message}`);
        }
    }

    /**
     * Creates a new group or sub-group based on the provided data.
     *
     * @param {GroupCreateRequest} groupData - The data required to create the group.
     * @param {number} [parentId] - Optional ID of the parent group for creating a sub-group.
     * @return {Promise<Group>} A promise that resolves to the created group object.
     * @throws {Error} If the group creation fails.
     */
    public async createGroup(groupData: GroupCreateRequest, parentId?: number): Promise<Group> {
        try {
            const createGroupUrl = parentId ? `/groups/${parentId}/sub_groups.api` : '/groups.api';

            const params = parentId ? {
                sub_group: groupData,
            }: {
                group: groupData,
            }

            const result = await this.request.post(createGroupUrl, params);
            return result.data as Group;
        } catch (error: any) {
            throw new Error(`Failed to create group: ${error.message}`);
        }
    }

    /**
     * Updates the details of a group with the given ID.
     *
     * @param {number} groupId - The unique identifier of the group to update.
     * @param {GroupUpdateRequest} groupData - The data to update the group with.
     * @param {number} [parentId] - The optional parent group ID, used for updating sub-groups.
     * @return {Promise<Group>} A promise that resolves to the updated group object.
     */
    public async updateGroup(groupId: number, groupData: GroupUpdateRequest, parentId?: number): Promise<Group> {
        try {
            const updateGroupUrl = parentId ? `/groups/${parentId}/sub_groups/${groupId}.api` : `/groups/${groupId}.api`;

            const result = await this.request.put(`/groups/${groupId}.api`, {
                group: groupData,
            });
            return result.data as Group;
        } catch (error: any) {
            throw new Error(`Failed to update group with id ${groupId}: ${error.message}`);
        }
    }
}