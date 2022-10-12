import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchGifsResponse} from "../interface/gifs.interface";
import {query} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'Rdv0e7IaslZ0FQGR62dNx9m0YLlBBvWN';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial];

  }

  constructor(private http: HttpClient){ //El constrructor se ejecuta 1 sola vez cuando se crea el servicio. El HttpClient es un servicio que se inyecta en el constructor para hacer peticiones http a un servidor externo (en este caso a giphy)
    if (localStorage.getItem('historial')){
      this._historial = JSON.parse( localStorage.getItem('historial') || '' ); //Si existe el historial en el localStorage lo carga
      this.resultados = JSON.parse( localStorage.getItem('resultados') || '' ); //Si existen los resultados en el localStorage los carga
    }

  }

  buscarGifs( query: string = '' ){    //Guarda un registro en el historial y lo busca mas abajo

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes( query ) ){  //Si no existe el query en el historial
      this._historial.unshift( query )  //Lo agrega al inicio del arreglo
      this._historial = this._historial.splice(0,10); //Limita el historial a 10 elementos
      localStorage.setItem('historial', JSON.stringify( this._historial ) ); //Guarda el historial en el localStorage

    }

    const params = new HttpParams()   //Crea un objeto de tipo httpParams
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    // console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`,{ params:params }  ) //Para las peticiones siempre tengo que poner http en la variable.
      .subscribe((resp) => { //resp es la variable que contiene la respuesta de la peticion que la devuelve en formato json
        // console.log(resp.data);
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify( this.resultados ) ); //Guarda los resultados en el localStorage
        // resp.data[0].images.downsized_medium.url
      });



  }
}
