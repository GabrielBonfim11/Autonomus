import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  user: User = {};
  img: string = "https://i.pravatar.cc/300";

  pages: any = [
    {title: 'Perfil', url: '/lista', icon: 'person' },
    // {title: 'Mensagens', url: '/home', icon: 'mail-unread' },
    // {title: 'Configurações', url: '/home', icon: 'build' }
  ]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this.authService.logout();
  }
}
