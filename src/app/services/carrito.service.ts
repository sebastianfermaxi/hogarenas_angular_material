import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Carrito } from '../models/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

private listaCarrito: Carrito[] = [];

private carrito$ : Subject<Carrito[]> = new Subject();

  constructor() { }

carritoStorage(carrito : Carrito[]){

  this.listaCarrito = carrito;
  this.carrito$.next(this.listaCarrito);
}

getCarrito():Observable<Carrito[]>{
  return this.carrito$.asObservable();
}

eliminarProductoCarrito(id:string){

  let resultado: Carrito[]= this.listaCarrito.filter( item => item._id !== id);
  this.listaCarrito = resultado;
  this.carrito$.next(this.listaCarrito);
  localStorage.setItem('carrito',JSON.stringify(this.listaCarrito));
}

agregarProductoCarrito(producto: Carrito){

  if (this.listaCarrito.some(e => e._id === producto._id)){
    this.listaCarrito.map(e=>{
      if(e._id === producto._id){
        e.cantidad++
        return e
      }else{
        return e
      }
    })
  }else{
    this.listaCarrito.push(producto)
  }

  this.carrito$.next(this.listaCarrito);
  localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
}

}
