import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ellipsis'
})

export class EllipsisPipe implements PipeTransform {
  transform(value: string, 
            args: string[]): any {
    if (!value) return value;

    // return value.replace(/\w\S*/g, function(txt) {
    //     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    // });

    //let p = value.length;

    //var divh=$('.notes').height();
    //alert(divh);
    //while ( p > 500) {
        return value.replace(/\W*\s(\S)*$/, '...');
    //}
  }
}
