import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catToColor'
})
export class CatToColorPipe implements PipeTransform {

  transform(value: string): string {
    let color: string;
    switch (value) {
      case 'Chemistry':
        color = '#fe5e23';
        break;
      case 'Technologies':
        color = '#009ffb';
        break;
      case 'Physics':
        color = '#f59f00';
        break;
      case 'The Brain':
        color = '#b57b16';
        break;
      case 'The Space':
        color = '#8950a8';
        break;
      case 'Environment':
        color = '#43c785';
        break;
      default:
        color = 'white';
    }
    return color;
  }

}
