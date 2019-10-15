import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HereoModel } from '../models/heroe.model';
import { map,delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-1db63.firebaseio.com';

  constructor( private http: HttpClient ) { }

  createHeroe( heroe: HereoModel ){

    return this.http.post(`${ this.url }/usuarios.json`, heroe)
            .pipe(
              map(  (resp: any) =>{
                heroe.id = resp.name;
                return heroe;
              })
            )
  }

  actualizarHeroe( heroe: HereoModel ){

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/usuarios/${ heroe.id }.json`, heroeTemp);
  }

  //////////// eliminar registro ///////////////

  borrarHeroe( id: string ) {

    return this.http.delete(`${ this.url }/usuarios/${ id }.json`);

  }
  ///////////////// para editar un registro especifico/////////////////

  getHeroe( id: string ) {

    return this.http.get(`${ this.url }/usuarios/${ id }.json`);

  }


  getHeroes() {
    return this.http.get(`${ this.url }/usuarios.json`)
            .pipe(
            //  map( resp => this.crearArrelo(resp) )
              map( this.crearArrelo),
              delay(0)
            );
  }
private crearArrelo( heroesObj: Object) {

  const heroes: HereoModel[] = [];

  console.log(heroesObj);

  Object.keys( heroesObj ).forEach( key => {
    
    const heroe: HereoModel = heroesObj[key];
    heroe.id = key;

    heroes.push( heroe );

  });

  //if ( heroesObj === null ) { return [];}

  return heroes;

}


}
