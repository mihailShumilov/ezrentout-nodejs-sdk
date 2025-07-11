/**
 * Represents the depreciation rate details for an asset or item.
 *
 * This interface holds information about the depreciation method name
 * and the corresponding rate used to calculate depreciation.
 *
 * Properties:
 * - `depreciation_method_name`: The name of the depreciation method being used,
 *   which describes the specific strategy or formula for calculating depreciation (e.g., "Straight Line", "Declining Balance").
 * - `rate`: The rate of depreciation, expressed as a number. It typically represents
 *   the percentage applied to the asset's cost or book value to determine its depreciation.
 */
export interface DepreciationRate {
    depreciation_method_name: string;
    rate: number;
}

/**
 * Represents a group within the system.
 */
export interface Group {
    id: number;
    name: string;
    description: string | null;
    company_id: number;
    created_at: string;
    updated_at: string;
    assets_count: number;
    documents_count: number;
    delta: boolean;
    pricing_bracket_interval: string | null;
    enable_service_triage: boolean;
    triage_completion_period: number;
    visible_on_web_store: boolean;
    triage_completion_period_basis: 'hours' | 'days' | string; // adjust as needed
    indefinite_triage_completion_period: boolean;
    hidden_on_web_store: boolean;
    allow_staff_to_set_checkout_duration: boolean;
    staff_checkout_duration_months: number;
    staff_checkout_duration_weeks: number;
    staff_checkout_duration_days: number;
    staff_checkout_duration_hours: number;
    staff_checkout_duration_mins: number;
    asset_depreciation_mode: string;
    comments_count: number | null;
    active: boolean;
    minimum_depreciation_price: string;
    enable_task_template_triage: boolean;
    depreciation_rates: DepreciationRate[];   // type this if you know the structure
    documents: any[];            // type/document this if you know the structure
}

/**
 * Represents a request payload for creating a new group.
 *
 * This interface defines the structure required to create a group,
 * including mandatory and optional fields.
 */
export interface GroupCreateRequest {
    name: string;
    description?: string;
    depreciation_rates?: DepreciationRate[];
}

/**
 * Represents a request to update a group with various configurable properties.
 *
 * Properties:
 * - `name` (optional): The name of the group.
 * - `description` (optional): A description of the group.
 * - `delta` (optional): A boolean indicating if changes are delta-based.
 * - `pricing_bracket_interval` (optional): Specifies the pricing bracket interval, which can be either a string or null.
 * - `enable_service_triage` (optional): A boolean indicating if service triage is enabled for the group.
 * - `triage_completion_period` (optional): A numeric value defining the triage completion period.
 * - `visible_on_web_store` (optional): A boolean specifying if the group is visible on the web store.
 * - `triage_completion_period_basis` (optional): Specifies the basis of the triage completion period, can be 'hours', 'days', or another string.
 * - `indefinite_triage_completion_period` (optional): A boolean indicating if triage completion period is indefinite.
 * - `hidden_on_web_store` (optional): A boolean indicating if the group is hidden on the web store.
 * - `allow_staff_to_set_checkout_duration` (optional): A boolean specifying if staff members can determine checkout durations.
 * - `staff_checkout_duration_months` (optional): The checkout duration in months specified by staff.
 * - `staff_checkout_duration_weeks` (optional): The checkout duration in weeks specified by staff.
 * - `staff_checkout_duration_days` (optional): The checkout duration in days specified by staff.
 * - `staff_checkout_duration_hours` (optional): The checkout duration in hours specified by staff.
 * - `staff_checkout_duration_mins` (optional): The checkout duration in minutes specified by staff.
 * - `asset_depreciation_mode` (optional): The mode of depreciation applied to assets.
 * - `active` (optional): A boolean indicating if the group is active.
 * - `minimum_depreciation_price` (optional): Specifies the minimum price for asset depreciation.
 * - `enable_task_template_triage` (optional): A boolean indicating if task template triage is enabled.
 * - `depreciation_rates` (optional): An array of depreciation rate configurations.
 * - `documents` (optional): An array containing any documents associated with the group.
 */
export interface GroupUpdateRequest {
    name?: string;
    description?: string;
    delta?: boolean;
    pricing_bracket_interval?: string | null;
    enable_service_triage?: boolean;
    triage_completion_period?: number;
    visible_on_web_store?: boolean;
    triage_completion_period_basis?: 'hours' | 'days' | string;
    indefinite_triage_completion_period?: boolean;
    hidden_on_web_store?: boolean;
    allow_staff_to_set_checkout_duration?: boolean;
    staff_checkout_duration_months?: number;
    staff_checkout_duration_weeks?: number;
    staff_checkout_duration_days?: number;
    staff_checkout_duration_hours?: number;
    staff_checkout_duration_mins?: number;
    asset_depreciation_mode?: string;
    active?: boolean;
    minimum_depreciation_price?: string;
    enable_task_template_triage?: boolean;
    depreciation_rates?: DepreciationRate[];
    documents?: any[];
}

/**
 * Represents a subgroup within the system.
 */
export interface SubGroup {
    id: number;
    name: string;
    description: string;
    group_id: number;
    assets_count: number;
    created_at: string;
    updated_at: string;
    visible_on_web_store: boolean;
    enable_service_triage: boolean;
    triage_completion_period: number;
    triage_completion_period_basis: 'hours' | 'days' | string;
    indefinite_triage_completion_period: boolean;
    triage_same_as_group: boolean;
    parent_id: number | null;
    lft: number;
    rgt: number;
    hidden_on_web_store: boolean;
    allow_staff_to_set_checkout_duration: boolean;
    staff_checkout_duration_months: number;
    staff_checkout_duration_weeks: number;
    staff_checkout_duration_days: number;
    staff_checkout_duration_hours: number;
    staff_checkout_duration_mins: number;
    active: boolean;
    enable_task_template_triage: boolean;
    subgroup_path: string;
}

