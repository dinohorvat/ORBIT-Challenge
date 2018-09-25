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
  members = [
    {name: "Dino Horvat", tries:42, time: "10:00"},
    {name: "Marko Horvat", tries:22, time: "14:00"},
    {name: "Ds Tisuat", tries:12, time: "12:00"},
  ];
  flippedFirst;
  flippedSecond;
  constructor(private marvelService: MarvelService){}
  ngOnInit(){
    this.getCharacters();
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
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
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
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })
      }
    })
  }
  showDialog(){
    this.display = true;
    this.askLeaderboards()
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
            alert('you won');
          }
        }
      }
      }
    }
  }
}

