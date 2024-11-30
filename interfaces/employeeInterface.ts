export interface EmployeeInterface {
  id: string;
  keycloakId: string;
  firstName: string;
  lastName: string;
  email: string;
  dateJoined: Date;
  jobTitle: string;
  departmentId: number;
  weeklyHours: number;
  roleId: number;
  avatar?: string;
}
