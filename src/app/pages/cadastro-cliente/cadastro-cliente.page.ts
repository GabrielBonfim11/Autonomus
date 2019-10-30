import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriasService } from '../../services/categorias.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Categoria } from 'src/app/interfaces/categoria';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
})

export class CadastroClientePage implements OnInit {
  public logo: string;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  private tipo: string;

  categorias: Categoria[];

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private angularFirestore: AngularFirestore,
    private categoriasService: CategoriasService
  ) { }

  ngOnInit() {
    this.logo = "../../../assets/imagens/logo.png";
    this.categoriasService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
      console.log(this.categorias);
    })
  }

  verificaTipo(event) {
    this.tipo = event.target.value;
  }

  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister).then((angularAuth) => {
        this.authService.cadastraUsuario(angularAuth.user.uid, this.userRegister).then(() => {
          this.presentToast("Cadastrado com successo!");
        })
      });
    } catch (error) {
      this.presentToast('Cadastro Inválido! Verifique os dados e tente novamente');
    } finally {
      this.loading.dismiss();
    }

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por Favor, Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  voltlogin() {
    this.navCtrl.navigateRoot(`login`);
  }

  selecionaCategoria(event) {
    console.log(event.target.value);
    this.userRegister.categoria = event.target.value;
  }


}
