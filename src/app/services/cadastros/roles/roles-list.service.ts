import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesListService {

  private relativeLink = 'role'

  constructor(
    private http: HttpClient
  ) { }

  getRoles() {
    // return of(
    //   [
    //     {
    //       "id": "1",
    //       "nomeRegra": "Analista",
    //       "ativo": "Ativa",
    //       "created": "2019-09-14",
    //       "modified": "2019-09-14"
    //     },
    //   ]
    // )
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}`);
  }
}




