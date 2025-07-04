// Order status/state (example)
import {Asset} from "./Asset";

export enum OrderStatus {
    DRAFT = 'draft',
    BOOKED = 'booked',
    ACTIVE = 'active',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export interface Order {
    id: number;
    asset_id: number;
    user_id: number;
    start_date: string; // ISO date string
    end_date: string;   // ISO date string
    status: OrderStatus;
    total_price?: number;
    created_at?: string;
    updated_at?: string;
    notes?: string;
}

export interface OrderCreateRequest {
    asset_id: number;
    user_id: number;
    start_date: string;
    end_date: string;
    notes?: string;
}

export interface OrderUpdateRequest {
    start_date?: string;
    end_date?: string;
    status?: OrderStatus;
    notes?: string;
}