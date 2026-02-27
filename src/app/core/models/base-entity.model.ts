// Common reusable interface for entities with audit fields.
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}
