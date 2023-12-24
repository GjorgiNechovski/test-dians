import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value: boolean | null): unknown {
    if (value === null) {
      return 'No info';
    }
    if (value === true) {
      return 'Requires a ticket';
    }
    if (value === false) {
      return 'Free';
    }

    return 'No Info';
  }
}
