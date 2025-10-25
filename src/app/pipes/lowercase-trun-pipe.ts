import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowercaseTrun'
})
export class LowercaseTrunPipe implements PipeTransform {

  transform(value:string): string{
    if(!value) return value;
    if(value.length<4){
      return value.toLowerCase();
    }
    else{
      return value.substring(0,4).toLowerCase();
    }
  }

}
