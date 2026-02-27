// TypeScript basics revision file:
// - primitive types, union types, enums, interfaces, type assertions, and arrow functions.

export enum EmploymentType {
  FullTime = 'FullTime',
  Contract = 'Contract',
  Intern = 'Intern'
}

export interface SalaryBand {
  min: number;
  max: number;
}

export type EmployeeTag = string | number;

export const calculateAnnualCtc = (monthlySalary: number): number => monthlySalary * 12;

export function summarizeTypeScriptConcepts(tag: EmployeeTag, band: SalaryBand): string {
  const normalizedTag = tag as string | number;
  return `Tag: ${normalizedTag}, Salary Range: ${band.min} - ${band.max}`;
}
