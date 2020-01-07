import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'editItem' })
export class EditItemPipe implements PipeTransform {
  transform(value: string, idx: number): string {
    return `${value}[${idx}]`;
  }
}
