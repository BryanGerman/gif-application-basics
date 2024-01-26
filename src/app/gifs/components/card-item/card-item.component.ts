import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-card-item',
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent implements OnInit {
  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if(!this.gif)
    throw new Error('Property is required!');
  }


}
