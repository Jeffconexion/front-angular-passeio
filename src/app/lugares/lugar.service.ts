import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from './lugar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private _http: HttpClient) { }

  private readonly baseUrl = "http://localhost:3000/";

  salvar(lugar: Lugar): Observable<Lugar> {
    return this._http.post<Lugar>(this.baseUrl + "lugares", lugar);
  }

  obterTodas(): Observable<Lugar[]> {
    return this._http.get<Lugar[]>(this.baseUrl + "lugares");
  }

  filtrar(nome: string, categoria: string): Observable<Lugar[]> {
    let parametros = new HttpParams();

    if (nome) {
      parametros = parametros.set("nome_like", nome);
    }

    if (categoria && categoria !== '-1') {
      parametros = parametros.set("categoria", categoria);
    }

    console.log("Parametros:", parametros);

    return this._http.get<Lugar[]>(this.baseUrl + "lugares", {
      params: parametros
    });

  }
}
