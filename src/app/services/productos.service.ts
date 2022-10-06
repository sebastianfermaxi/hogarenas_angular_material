import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  urlHogarenas: string = 'https://hogarenas-backend.herokuapp.com/api/producto';

  constructor(private http: HttpClient) { }

  obtenerProducto(){

  }

  obtenerProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlHogarenas);
  }

}
