import {EzRentOut} from './EzRentOut';
import axios, {AxiosInstance} from 'axios';

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