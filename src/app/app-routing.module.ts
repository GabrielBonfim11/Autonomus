import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'cadastro-cliente', loadChildren: './pages/cadastro-cliente/cadastro-cliente.module#CadastroClientePageModule' },
  { path: 'lista', loadChildren: './pages/lista/lista.module#ListaPageModule' },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'home-profissional', loadChildren: './pages/home-profissional/home-profissional.module#HomeProfissionalPageModule' },
  { path: 'home-cliente', loadChildren: './pages/home-cliente/home-cliente.module#HomeClientePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
