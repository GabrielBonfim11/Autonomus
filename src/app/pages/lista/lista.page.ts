import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  state: any;
  categoria: Categoria = {};

  profissionais: User[] = [];
  profAux: User[] = [];

  constructor(private navCtrl: NavController, private router: Router, private userService: AuthService) {

  }

  ionViewDidEnter() {
    this.state = this.router.getCurrentNavigation().extras.state;
    this.profAux = [];
    if (this.state != undefined) {
      this.categoria = this.state['categoria'];
      this.userService.getUsers().subscribe((profissionais) => {
        profissionais.forEach(profissional => {
          if (profissional.categoria && profissional.categoria == this.categoria.nome) {
            this.profAux.push(profissional);
          }
        });
      });
      if (this.profAux.length == 0) {
        this.profissionais = this.profAux;
      }
    } else {
      this.categoria = {
        nome: ''
      };
    }
  }

  ngOnInit() {
  }

  perfil() {
    this.navCtrl.navigateRoot(`perfil`);
  }

}
