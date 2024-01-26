import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';



@Injectable({
  providedIn: 'root',
})
export class GifsService {

  public gifsList: Gif[] = []
  private _tagsHistory: string[] = [];
  private _apiKey:      string = "E69ZsCO95y7bp4dMjzPftS5M3li3vLX7";
  private _serviceUrl:  string = 'https://api.giphy.com/v1/gifs'

  constructor(private _httpClient: HttpClient) {
    this._loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private _organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this._saveLocalStorage();
  }

  private _saveLocalStorage(){
    localStorage.setItem("history", JSON.stringify(this._tagsHistory));
  }

  private _loadLocalStorage(){
    if(!localStorage.getItem("history")) return;
    this._tagsHistory = JSON.parse(localStorage.getItem("history")!);
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this.tagsHistory[0]);
  }

  searchTag(tag: string): void{
    if (tag.length == 0) return;
    this._organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this._apiKey)
    .set('limit', 10)
    .set('q', tag);

    this._httpClient.get<SearchResponse>(`${this._serviceUrl}/search`, {params})
    .subscribe( resp => {
      this.gifsList = resp.data;

    })

  }


}
