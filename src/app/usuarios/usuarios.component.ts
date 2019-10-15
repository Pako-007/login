import { Component, OnInit } from '@angular/core';
import { HereoModel } from '../models/heroe.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../services/heroes.service';

import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit {

  heroe: HereoModel = new HereoModel();


  constructor( private heroeService: HeroesService,
               private router: ActivatedRoute  ) { }

  ngOnInit() {
//////////////// editar un dato especifico ////////////
    const id = this.router.snapshot.paramMap.get('id');

  if ( id !=='nuevo' ) {

    this.heroeService.getHeroe( id )
      .subscribe( (resp: HereoModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
      
  }

  }

  guardar( form: NgForm ){

    if ( form.invalid ){
      console.log('Formulario no Valido');
      return;
    }

    Swal.fire({
      title: 'Espera',
      text: 'Guardando Informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

  if ( this.heroe.id ) {
    peticion = this.heroeService.actualizarHeroe( this.heroe );

  }else{
    peticion = this.heroeService.createHeroe( this.heroe );
  }

  peticion.subscribe( resp => {

    Swal.fire({
      title: this.heroe.nombre,
      text: 'Se actualizó correctamente',
      type: 'success'
    });

  });

  }



}
