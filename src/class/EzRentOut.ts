import axios, {AxiosInstance} from "axios";
import {Asset, User, Group, Location, Order, PagedResponse, AssetCreateRequest, AssetUpdateRequest} from "../@types";
import {ResponseDataKey} from "../@types/ResponseDataKey";
import {ApiPagedResponse} from "../@types/ApiPagedResponse";

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
                token: this.apiKey
            },
        })
    }

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
                data: result.data.assets,
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
            const result = await this.request.get(`/assets/${assetId}.api`);
            return result.data as Asset;
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
     * Retrieves all groups.
     * @param page Page number for pagination.
     * @returns List of groups.
     */
    public async getAllGroups(page: number = 1): Promise<any> {
        try {
            const result = await this.request.get('/groups.api', {
                params: {page}
            });
            return result.data;
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
}