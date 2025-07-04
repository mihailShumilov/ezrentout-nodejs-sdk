export interface PagedResponse<T> {
    data: T[];
    meta?: {
        current_page: number;
        per_page: number;
        total_pages: number;
        total_items: number;
    };
}