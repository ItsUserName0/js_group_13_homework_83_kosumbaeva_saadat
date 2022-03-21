import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return environment.apiUrl + '/' + value;
    }

    return '/assets/images/no_image_available.jpg';
  }

}
