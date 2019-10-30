import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { Router, NavigationExtras } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})
export class HomeClientePage implements OnInit {

  listCat: Categoria[] = [];
  queryText: string;
  allCat: Categoria[] = [];

  searchbar_hidden: boolean = false;

  constructor(private router: Router, private categoriasService: CategoriasService) {
    
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.queryText = '';
    this.categoriasService.getCategorias().subscribe((categorias) => {
      console.log(categorias);
      this.allCat = categorias;
      this.listCat = this.allCat;
    });
  }

  toggleSearchbar() {
    this.searchbar_hidden = !this.searchbar_hidden;
    if (!this.searchbar_hidden) {
      this.queryText = '';
      this.listCat = this.allCat;
    }
  }

  filterCat(cat: any) {
    let val = cat.target.value;
    this.listCat = [];
    this.allCat.forEach(cat => {
      if (typeof cat.nome == "string") {
        if (cat.nome.toLowerCase().includes(val.toLowerCase())) {
          this.listCat.push(cat);
        }
      }
    })
  }

  onBlur(event: any) {
    if (event.target.value == '') {
      this.listCat = this.allCat;
    }
  }

  nomes(cat: Categoria) {
    let extras: NavigationExtras = {
      state: {
        categoria: cat
      }
    }
    this.router.navigate(['lista'], extras);
  }

}
