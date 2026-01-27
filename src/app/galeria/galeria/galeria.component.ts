import { Component, OnInit } from '@angular/core';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../../lugares/lugar.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {

  lugares: Lugar[] = [];
  categoriasFiltro: Categoria[] = []
  nomeFiltro: string = '';
  categoriaFiltro: string = '';

  constructor(private _lugarService: LugarService, private _categoriaService: CategoriaService) {

  }
  ngOnInit(): void {
    let observableCategoria$ = this._categoriaService.obterTodas();
    observableCategoria$.subscribe({
      next: (categorias) => {
        console.log("Obter todas as Categorias:", categorias);
        this.categoriasFiltro = categorias;
      }
    });

    let observableLugares$ = this._lugarService.obterTodas();
    observableLugares$.subscribe({
      next: (lugares) => {
        console.log("Obter todos os Lugares:", lugares);
        this.lugares = lugares;
      }
    });
  }

  getTotalEstrelas(lugar: Lugar): string {
    return "&#9733;".repeat(lugar.avaliacao || 0) + "&#9734".repeat(5 - (lugar.avaliacao || 0));
  }

  filtar() {
    let observable$ = this._lugarService.filtrar(this.nomeFiltro, this.categoriaFiltro)

    observable$.subscribe({
      next: (lugar) => {
        this.lugares = lugar;
      },

      error: (lugar) => {
        console.log("Erro no filtar:", lugar)
      }
    });
  }
}
