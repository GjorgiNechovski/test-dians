import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'naConvert',
})
export class NaConvertPipe implements PipeTransform {
  transform(value: string | null): unknown {
    if (value === null) {
      return 'No Info';
    }

    return value;
  }
}
