import { BaseEntity } from '../../../core/models/base-entity.model';

// Employee domain model extends base entity for CRUD records.
export interface Employee extends BaseEntity {
  name: string;
  email: string;
  department: 'Engineering' | 'HR' | 'Finance' | 'Sales';
  experienceYears: number;
  active: boolean;
}

// Data transfer model for create/update operations.
export type EmployeePayload = Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>;
