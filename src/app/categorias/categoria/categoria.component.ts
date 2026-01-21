import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  camposForm: FormGroup;

  constructor(private _service: CategoriaService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      let observable$ = this._service.salvar(this.camposForm.value); // 1 - retorna um observable (publicador)

      //~~> É aqui que a requisição HTTP realmente acontece.
      observable$.subscribe({ //2 - componente vira assinante do publicador
        next: (categoria) => { //3 - Os dados chegam, observable NOTIFICA este assinante passando os dados
          console.log("Salva com sucesso!", categoria)
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
