import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private _http: HttpClient) { }

  private readonly baseUrl = "http://localhost:3000/";

  salvar(categoria: Categoria): Observable<Categoria> {
    return this._http.post<Categoria>(this.baseUrl + "categorias", categoria);
  }

  obterTodas(): Observable<Categoria[]> {
    return this._http.get<Categoria[]>(this.baseUrl + "categorias");
  }

}
