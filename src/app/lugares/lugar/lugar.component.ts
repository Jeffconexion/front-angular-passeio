import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {

  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(private _categoriaService: CategoriaService, private _lugarService: LugarService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    let observable$ = this._categoriaService.obterTodas()

    observable$.subscribe({
      next: (categorias) => {
        this.categorias = categorias
      },

      error: (erro) => {
        console.error("Ocorreu um erro:", erro)
      }
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      let observable$ = this._lugarService.salvar(this.camposForm.value)

      observable$.subscribe({
        next: (lugar) => {
          console.log("Cadastrado com sucesso!", lugar);
          this.camposForm.reset();
        },
        error: (erro) => {
          console.error("Ocorreu um erro:", erro)
        }
      });
    }
  }

  isCampoInvalido(nomeCampo: string): boolean {
    let campo = this.camposForm.get(nomeCampo)

    if (campo?.invalid && campo.touched) {
      if (campo?.errors?.['required']) {
        return true
      }
    }
    return false;
  }
}
