import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  //traemos los tags desde el servivicio de gifs
  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  /*aqui conectamos con el servicio de gifs para
  tener el arreglo y poder mostrarlo en el componente*/

  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}
