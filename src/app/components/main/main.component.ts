import {Component, OnInit} from '@angular/core';
import {MarvelService} from '../../services/marvel.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  GRID_ROWS = [1,2,3,4,5];
  characters = [];
  constructor(private marvelService: MarvelService){}
  ngOnInit(){
    this.getCharacters();
  }

  getCharacters(){
    Promise.resolve(this.marvelService.fetchCharacters().then(res => {
      console.log(res);
      this.characters = res.data.results;
      console.log(this.characters);
    }).catch(err => {
      console.log(err);
    }))
  }
}

