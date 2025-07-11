import {EzRentOut} from './EzRentOut';
import axios, {AxiosInstance} from 'axios';
import {GroupCreateRequest} from "../@types";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EzRentOut - getAllAssets', () => {
    let ezRentOut: EzRentOut;
    let mockRequest: AxiosInstance;

    beforeEach(() => {
        const apiKey = 'testApiKey';
        const subdomain = 'testSubdomain';
        ezRentOut = new EzRentOut(apiKey, subdomain);
        mockRequest = ezRentOut['request'];
        mockedAxios.create.mockReturnValue(mockRequest);
    });

    it('should return assets and total pages on a successful response', async () => {
        const mockResponse = {
            data: {
                assets: [
                    {
                        id: 1,
                        name: 'Asset 1',
                        description: 'Description 1',
                    },
                    {
                        id: 2,
                        name: 'Asset 2',
                        description: 'Description 2',
                    },
                ],
                total_pages: 2,
            },
        };

        mockedAxios.get.mockResolvedValue(mockResponse);

        const result = await ezRentOut.getAllAssets(1);

        expect(mockedAxios.get).toHaveBeenCalledWith('/assets.api', {
            params: {
                page: 1,
                include_custom_fields: true,
                show_document_urls: true,
                show_image_urls: true,
                show_document_details: true,
            },
        });

        expect(result.data).toEqual(mockResponse.data.assets);
        expect(result.total_pages).toBe(mockResponse.data.total_pages);
    });

    it('should throw an error when the API request fails', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Network Error'));

        await expect(ezRentOut.getAllAssets(1)).rejects.toThrow('Failed to get all asset: Network Error');

        expect(mockedAxios.get).toHaveBeenCalledWith('/assets.api', {
            params: {
                page: 1,
                include_custom_fields: true,
                show_document_urls: true,
                show_image_urls: true,
                show_document_details: true,
            },
        });
    });
});


describe('EzRentOut - createGroup', () => {
    let ezRentOut: EzRentOut;
    let mockRequest: AxiosInstance;

    beforeEach(() => {
        const apiKey = 'testApiKey';
        const subdomain = 'testSubdomain';
        ezRentOut = new EzRentOut(apiKey, subdomain);
        mockRequest = ezRentOut['request'];
        mockedAxios.create.mockReturnValue(mockRequest);
    });

    it('should successfully create a group and return its data', async () => {
        const mockGroupData: GroupCreateRequest = { name: 'New Group', description: 'Test Group Description' };
        const mockResponse = {
            data: {
                id: 1,
                name: 'New Group',
                description: 'Test Group Description',
                company_id: 100,
                created_at: '2025-07-11T12:00:00Z',
                updated_at: '2025-07-11T12:00:00Z',
                assets_count: 0,
                documents_count: 0,
                delta: false,
                pricing_bracket_interval: null,
                enable_service_triage: false,
                triage_completion_period: 0,
                visible_on_web_store: true,
                triage_completion_period_basis: 'days',
                indefinite_triage_completion_period: false,
                hidden_on_web_store: false,
                allow_staff_to_set_checkout_duration: false,
                staff_checkout_duration_months: 0,
                staff_checkout_duration_weeks: 0,
                staff_checkout_duration_days: 0,
                staff_checkout_duration_hours: 0,
                staff_checkout_duration_mins: 0,
                asset_depreciation_mode: '',
                comments_count: null,
                active: true,
                minimum_depreciation_price: '0',
                enable_task_template_triage: false,
                depreciation_rates: [],
                documents: []
            }
        };

        mockedAxios.post.mockResolvedValue(mockResponse);

        const result = await ezRentOut.createGroup(mockGroupData);

        expect(mockedAxios.post).toHaveBeenCalledWith('/groups.api', { group: mockGroupData });
        expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when the API request fails', async () => {
        const mockGroupData: GroupCreateRequest = { name: 'New Group', description: 'Test Group Description' };
        mockedAxios.post.mockRejectedValue(new Error('Network Error'));

        await expect(ezRentOut.createGroup(mockGroupData)).rejects.toThrow('Failed to create group: Network Error');

        expect(mockedAxios.post).toHaveBeenCalledWith('/groups.api', { group: mockGroupData });
    });
});