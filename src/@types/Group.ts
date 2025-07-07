export interface DepreciationRate {
    depreciation_method_name: string;
    rate: number;
}

// Group entity
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

export interface GroupCreateRequest {
    name: string;
    description?: string;
    depreciation_rates?: DepreciationRate[];
}

