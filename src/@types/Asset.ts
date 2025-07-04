// Asset status as seen in EzRentOut docs (adjust as needed)
export enum AssetStatus {
    AVAILABLE = 'available',
    CHECKED_OUT = 'checked_out',
    MAINTENANCE = 'maintenance',
    RETIRED = 'retired',
    LOST = 'lost',
}

// Main Asset interface based on actual API response
export interface Asset {
    id?: number;
    name: string;
    description: string | null;
    price?: string;
    identifier?: string;
    vendor_id?: number;
    group_id?: number;
    created_at?: string;
    updated_at?: string;
    checkin_due_on?: string | null;
    audit_pending?: boolean;
    sequence_num?: number;
    product_model_number?: string | null;
    documents_count?: number;
    services_count?: number;
    comments_count?: number;
    state?: string;
    purchased_on?: string | null;
    retired_on?: string | null;
    location_id?: number;
    net_quantity?: number;
    pending_verification?: boolean;
    salvage_value?: string;
    package_id?: number | null;
    checkout_on?: string | null;
    inventory_threshold?: number;
    retire_reason?: string | null;
    retire_comments?: string | null;
    sub_group_id?: number | null;
    location_based_threshold?: number;
    arbitration?: number;
    rent_collected?: string;
    tax_free?: boolean;
    sale_price?: string;
    retired_by_id?: number | null;
    featured_item?: boolean;
    visible_on_web_store?: boolean;
    is_processed?: boolean;
    rental_meter?: number;
    rental_meter_threshold?: number;
    initial_stock_quantity?: number;
    quickbooks_item_id?: string | null;
    sub_checked_out_to_id?: number | null;
    advanced_pricing?: boolean;
    bulk_import_id?: number | null;
    purchase_order_id?: number | null;
    available_for_sale?: boolean;
    checkout_via_bundle?: boolean;
    clone_from_asset_id?: number | null;
    itam_hardware_id?: number | null;
    created_by_itam?: boolean;
    hidden_on_web_store?: boolean;
    last_checked_out_at?: string | null;
    last_checked_in_at?: string | null;
    last_assigned_to_id?: number | null;
    synced_with_jira_at?: string | null;
    sunshine_id?: string | null;
    retire_reason_id?: number | null;
    it_asset_source?: string | null;
    current_meter_reading?: string;
    custom_substate_id?: number | null;
    merge_date?: string | null;
    default_excess_location_threshold?: number;
    average_cost_per_unit?: string;
    usage_meter_threshold?: number | null;
    send_usage_meter_threshold_recurring_alert?: boolean;
    update_counter?: number;
    network_asset?: boolean;
    group_rule_provisioned?: boolean;
    last_history_id?: number | null;
    qbd_item_name?: string | null;
    item_audit_id?: number | null;
    product_id?: number | null;
    product_identity?: string;
    external_asset?: boolean;
    holder_id?: number | null;
    depreciation_calculation_required?: boolean;
    location_rule_provisioned?: boolean;
    latest_contract_id?: number | null;
    manufacturer?: string | null;
    assigned_to_user_name?: string | null;
    asset_type?: string;
    sub_checked_out_to_full_name?: string | null;
    active_sub_checkout?: any | null;
    location_number?: number;
    group?: any;
    primary_user?: any | null;
    assigned_to_user_email?: string | null;
    display_image?: string;
    location_name?: string;
    document_urls?: string[];
    depreciated_value?: Record<string, any>;
    documents?: any[];
    action?: string;
    image_urls?: string[];
    rental_prices?: Record<string, any>;
    status?: AssetStatus; // Keeping this for backward compatibility
    serial_number?: string; // Keeping this for backward compatibility
    purchase_date?: string; // Keeping this for backward compatibility
    purchase_price?: number; // Keeping this for backward compatibility
    custom_fields?: Record<string, any>; // Keeping this for backward compatibility
}

export interface AssetCreateRequest {
    name: string;
    description?: string | null;
    identifier?: string;
    price?: string;
    vendor_id?: number;
    group_id?: number;
    location_id?: number;
    product_model_number?: string;
    state?: string;
    purchased_on?: string;
    net_quantity?: number;
    salvage_value?: string;
    inventory_threshold?: number;
    tax_free?: boolean;
    sale_price?: string;
    featured_item?: boolean;
    visible_on_web_store?: boolean;
    rental_meter?: number;
    rental_meter_threshold?: number;
    initial_stock_quantity?: number;
    advanced_pricing?: boolean;
    available_for_sale?: boolean;
    manufacturer?: string;
    product_identity?: string;
    external_asset?: boolean;
    custom_fields?: Record<string, any>;
    // Keeping these for backward compatibility
    status?: AssetStatus;
    serial_number?: string;
    purchase_date?: string;
    purchase_price?: number;
}

export interface AssetUpdateRequest {
    name?: string;
    description?: string | null;
    identifier?: string;
    price?: string;
    vendor_id?: number;
    group_id?: number;
    location_id?: number;
    product_model_number?: string;
    state?: string;
    purchased_on?: string;
    net_quantity?: number;
    salvage_value?: string;
    inventory_threshold?: number;
    tax_free?: boolean;
    sale_price?: string;
    featured_item?: boolean;
    visible_on_web_store?: boolean;
    rental_meter?: number;
    rental_meter_threshold?: number;
    initial_stock_quantity?: number;
    advanced_pricing?: boolean;
    available_for_sale?: boolean;
    manufacturer?: string;
    product_identity?: string;
    external_asset?: boolean;
    custom_fields?: Record<string, any>;
    // Keeping these for backward compatibility
    status?: AssetStatus;
    serial_number?: string;
    purchase_date?: string;
    purchase_price?: number;
}