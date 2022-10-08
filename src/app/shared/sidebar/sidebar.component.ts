import { Component } from '@angular/core';
import {GifsService} from "../../gifs/services/gifs.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent {

  constructor(private gifService: GifsService) {} //Inyección de dependencias

  get historial() {
    return this.gifService.historial;
  }




}
