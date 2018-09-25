import {Component, OnInit} from '@angular/core';
import {MarvelService} from '../../services/marvel.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit{
  tries: number = 0;
  guesses: number = 0;
  time;
  characters = [];
  display = false;
  members = [];
  flippedFirst;
  flippedSecond;
  constructor(private marvelService: MarvelService){}
  ngOnInit(){
    this.getCharacters();
    this.getLeaderboard();
  }

  getLeaderboard(){
    Promise.resolve(this.marvelService.fetchLeaderboard().then(res => {
      console.log(res);
      this.members = res;
    }).then(err => {
      console.log(err);
    }))
  }

  askLeaderboards(){
    swal({
      title: 'Submit to Leaderboards',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        let data = {
          name: name,
          score: this.tries
        };
        return Promise.resolve(this.marvelService.addScore(data))
          .then(response => {
            console.log(response);
            return response
          })
          .catch(error => {
            swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        swal({
          title: `Successfully Sent!`
        })
      }
    })
  }
  showDialog(){
    this.display = true;
  }
  getCharacters(){
    // Resetting to default
    this.flippedFirst = null;
    this.flippedSecond = null;
    this.guesses = 0;
    this.tries = 0;
    Promise.resolve(this.marvelService.fetchCharacters().then(res => {
      console.log(res);
      this.characters = res;
      console.log(this.characters);
    }).catch(err => {
      console.log(err);
    }))
  }

  flipImage(image){
    console.log(image);
    if(!image.guess){
      if(this.flippedFirst && this.flippedSecond){
        this.flippedFirst.flipped = false;
        this.flippedSecond.flipped = false;
        this.flippedFirst = null;
        this.flippedSecond = null;
    }
    image.flipped = !image.flipped;
    if(!this.flippedFirst){
      this.flippedFirst = image;
    }
    else if(this.flippedFirst && !this.flippedSecond){
      this.tries++;
      this.flippedSecond = image;
      if((this.flippedFirst.thumbnail.path === this.flippedSecond.thumbnail.path)){
        if((this.flippedFirst.primary && !this.flippedSecond.primary) || !this.flippedFirst.primary && this.flippedSecond.primary){
          this.flippedFirst.guess = true;
          this.flippedSecond.guess = true;
          this.flippedFirst = null;
          this.flippedSecond = null;
          this.guesses++;
          if(this.guesses == 12){
            this.askLeaderboards();
          }
        }
      }
      }
    }
  }
}

