export interface LeaveRequest {
  id: number;
  employee_id: string;
  start_date: Date;
  end_date: Date;
  type_id: number;
  status_id: number;
  days?: number;
  observations?: string;
}

export interface TypeRequest {
  id: number;
  type: string;
  detail: string;
}

export interface StatusRequest {
  id: number;
  status: string;
}
