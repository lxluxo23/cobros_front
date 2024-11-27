import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mesNombre',
  standalone: true
})
export class MesNombrePipe implements PipeTransform {

  transform(monthNumber: number): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril',
      'Mayo', 'Junio', 'Julio', 'Agosto',
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[monthNumber - 1] || 'Mes Inválido';
  }

}
