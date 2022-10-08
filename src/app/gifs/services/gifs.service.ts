import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'Rdv0e7IaslZ0FQGR62dNx9m0YLlBBvWN'
  private _historial: string[] = [];

  //TO DO cambiar el tipo any por su tipo correspondiente
  public resultados: any[] = [];

  get historial() {
    this._historial = this._historial.splice(0,10)
    return [...this._historial];
  }

  constructor(private http: HttpClient){}

  buscarGifs( query: string ){    //Guarda un registro en el historial

    query = query.trim().toLowerCase();

    if ( !this._historial.includes( query ) ){
      this._historial.unshift( query )
    }


    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=Rdv0e7IaslZ0FQGR62dNx9m0YLlBBvWN&q=${ query }&limit=10`) //Para las peticiones siempre tengo que poner http en la variable.
      .subscribe((resp:any) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });



  }
}
