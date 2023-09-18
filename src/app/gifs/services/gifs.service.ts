import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  //el guion bajo indica elemento privado

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];

  private apiKey: string = '284LF8Mk3FPoe2NZNpxFDH5PuXn99QzY';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service ');
  }

  get tagsHistory() {
    //operador spread para crear una copia del valor de los tags
    return [...this._tagsHistory];
  }

  private organizedHistory(tag: string) {
    tag = tag.toLowerCase();
    // si existe el tag nuevo, en el arreglo que ya se tiene entra a la condicional
    if (this._tagsHistory.includes(tag)) {
      //se hace un filtro del arreglo, se mantienen todos los elementos menos el repetido
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) {
      return;
    }
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    //indicamos que siempre va a venir una data mediante el signo "!"

    if (this._tagsHistory.length === 0) {
      return;
    } else {
      this.searchTag(this._tagsHistory[0]);
    }
  }

  //Load first gif

  searchTag(tag: string): void {
    if (tag.length === 0) return; // si se le da enter sin tener texto, no hace nada
    this.organizedHistory(tag);

    //params

    const params = new HttpParams()
      .set('limit', '10')
      .set('api_key', this.apiKey)
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params: params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }
}
