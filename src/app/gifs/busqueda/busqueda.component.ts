import {Component, ElementRef, ViewChild} from '@angular/core';
import {GifsService} from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //El signo de exclamación (!) es para decirle a typescript que no se preocupe, que los campos que se van a usar si existen
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) {

  }

  buscar() {
    const valor = this.txtBuscar.nativeElement.value; //Obtenemos el valor del input

    // console.log('La palabra', valor, 'Tiene ',  valor.trim().length, 'caracteres');
    if (valor.trim().length === 0) {    //Si el valor es vacío
      return;
    }
    // valor = valor.toLowerCase();  //Pasa a minúsculas

    this.gifsService.buscarGifs( valor ); //Llama al método buscarGifs del servicio
    this.txtBuscar.nativeElement.value = '';   //Limpia el input
  }


}
