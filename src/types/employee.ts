export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
}

export interface FilterOptions {
  firstName: string;
  department: string;
  role: string;
}

export interface SortOptions {
  field: 'firstName' | 'lastName' | 'department' | 'role';
  direction: 'asc' | 'desc';
}