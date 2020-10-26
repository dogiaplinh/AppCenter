export type User = {
  id?: string;
  display_name?: string;
  email?: string;
  name?: string;
  avatar_url?: null;
  can_change_password?: boolean;
  created_at?: Date;
  origin?: string;
};

export type AppItem = {
  id: string;
  app_secret: string;
  description?: any;
  display_name: string;
  name: string;
  os: string;
  platform: string;
  origin: string;
  icon_url?: any;
  created_at: Date;
  updated_at: Date;
  release_type: string;
  owner: Owner;
  azure_subscription: AzureSubscription;
  member_permissions: string[];
};

export type Owner = {
  id: string;
  avatar_url?: any;
  display_name: string;
  email: string;
  name: string;
  type: string;
};

export type AzureSubscription = {
  subscription_id: string;
  subscription_name: string;
  tenant_id: string;
};

export type StatsType = "model" | "os" | "version" | "language" | "place";

export type CountItem = {
  key: string;
  count: number;
  previousCount?: number;
};

export type CountsResult = {
  type: StatsType;
  total: number;
  values: CountItem[];
};

export type DateTimeItem = {
  count: number;
  datetime: string;
  previous_count?: number;
};

export type ActiveDeviceCounts = {
  daily?: DateTimeItem[];
  weekly?: DateTimeItem[];
  monthly?: DateTimeItem[];
};

export type EventSummary = {
  id: string;
  name: string;
  device_count: number;
  previous_device_count: number;
  count: number;
  previous_count: number;
  count_per_device: number;
};

export type EventsResult = {
  events: EventSummary[];
  total: number;
  total_devices: number;
};
