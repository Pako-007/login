import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { HereoModel } from '../models/heroe.model';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../models/usuario.model';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.sass']
})
export class PanelComponent implements OnInit {


  usuarios: UsuarioModel[] = [];
  heroes: HereoModel[] = [];

  ////cargar///
  cargando = false;

  constructor( private heroesService: HeroesService) { }

  ngOnInit() {


  this.cargando = true;
  this.heroesService.getHeroes()
    .subscribe( resp => {
       this.heroes = resp;
       this.cargando = false; 
    });

  }
//////////////eliminar //
  borrarHeroe( heroe: HereoModel, i: number ){

  Swal.fire({
    title: 'Estas seguro?',
    text: `Estas seguro que desea borrar a ${heroe.nombre }`,
    type: 'question',
    showConfirmButton: true,
    showCancelButton: true
  }).then( resp => {
    
    if ( resp.value ) {
    this.heroes.splice(i, 1);
    this.heroesService.borrarHeroe( heroe.id ).subscribe();
    }
  });
 
}

}
