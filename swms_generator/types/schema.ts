export enum FormType {
  Text = 'text',
  Date = 'date',
  Dropdown = 'dropdown',
  Table = 'table'
}

export enum SWMSTableType {
  BUILDING = 'building',
  ELECTRICAL = 'electrical'
}

export interface FormDataItem {
  label: string;
  type: FormType;
  step: number;
  field: string;
  options?: DropdownOption[];
}

export interface DropdownOption {
  label: string;
  value: SWMSTableType;
}

// Defining the structure for FORM_CONFIG items
export interface FormConfigItem {
  form: SWMSTableType;
  ids: number[];
}

// Defining the structure for SWMS_TABLE_DATA items
export interface SWMSTableDataItem {
  name: string;
  id: number;
  values: SWMSValue[];
}

export interface SWMSValue {
  subId: number;
  task: string[];
  potentialHazards: string[];
  riskBefore: string;
  controlMeasures: ControlMeasure[];
  riskAfter: string;
}

export interface ControlMeasure {
  name: string;
  values?: string[];
}

export interface Swms {
  id: number;
  organisation_id: number;
  name: string;
  swms_type: string;
  file_name: string;
  file_path: string;
  created_at: Date;
  updated_at: Date;
  account_email: string;
  swms_data: SwmsData[];
}

export interface SwmsData {
  id: number;
  swms_id: number;
  data: any; // Raw JSON data. Use 'any' or a more specific type if the structure is known
  version: number;
}
