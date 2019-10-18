import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { RolesService } from 'src/app/services/cadastros/roles/roles.service';
import { PoSelectOption } from '@portinari/portinari-ui';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  page = {
    title: 'Editar Usuário',
    actions: [
      { label: 'Salvar', disabled:true, action: () => { } },
      { label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => { (this.location.back()) } },
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Editar Usuário' }
      ]
    }

  }

  selects = {
    statusOptions: <PoSelectOption[]> [
      { label: 'ATIVA', value: 'true' },
      { label: 'INATIVA', value: 'false' }
    ],
    regrasOptions:<PoSelectOption[]>[]
  }

  constValue = {
    id: ''
  }

  editUserForm: FormGroup = this.fb.group({
    id: [''],
    idEmpresa: [''],
    username: [''],
    email: [''],
    senha: ['', [Validators.required,Validators.minLength(7)]],
    regra: ['',[Validators.required]],
    ativo: ['', [Validators.required]],
    created:[''],
    modified:['']

  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService:UserService,
    private roleService:RolesService
  ) { }


  ngOnInit() {
    this.page.actions[0].disabled = this.editUserForm.invalid;
    this.roleService.getRoles().subscribe((data: any) => {
      this.selects.regrasOptions = data.map((item)=>{
        return { label:item.name, value:item.id}
      })
    })
    
  //   this.route.paramMap
  //     .subscribe((params: ParamMap) => {
  //       this.constValue.id = params.get('id');

       
  // }}

}
}
