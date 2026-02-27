import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experienceLevel',
  standalone: true
})
// Custom pipe example with parameterized transformation.
export class ExperienceLevelPipe implements PipeTransform {
  transform(years: number, withLabel = true): string {
    const level = years < 2 ? 'Junior' : years < 6 ? 'Mid' : 'Senior';
    return withLabel ? `${level} (${years} years)` : level;
  }
}
