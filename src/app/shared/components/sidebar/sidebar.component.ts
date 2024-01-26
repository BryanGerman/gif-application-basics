import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private _service: GifsService){}

  public getGifTags(): string[]{
    return this._service.tagsHistory;
  }

  public searchGifs(tag: string){
    return this._service.searchTag(tag)
  }
}
