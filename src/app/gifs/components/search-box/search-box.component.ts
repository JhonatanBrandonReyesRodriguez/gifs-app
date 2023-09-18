import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: ` <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />`,

  // usamos una referencia local para indicar que tome el valor del mismo input
})
export class SearchBoxComponent {
  //ViewChild se refiere a un solo elemento de todos los que
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private giftsService: GifsService) {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.giftsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
