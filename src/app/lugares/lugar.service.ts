import { HttpClient } from '@angular/common/http';
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
}
