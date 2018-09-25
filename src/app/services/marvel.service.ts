import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class MarvelService {
  constructor(private http: HttpClient) {
  }

  addScore(data): Promise<any> {
    let url = environment.marvel + '/leaderboard';
    console.log(url)
    return this.http.post(url,data)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  fetchCharacters(): Promise<any> {
    let url = environment.marvel + '/characters';
    console.log(url)
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  fetchLeaderboard(): Promise<any> {
    let url = environment.marvel + '/leaderboard';
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(this.handleError);
  }

  public handleError(error: any): Promise<any> {
    console.log("HTTP error response received:");
    console.log(error);
    // this.globalService.showErrorMessage("HTTP request error " + error.status + " occured. " + error._body);
    return Promise.reject(error);
  }
}
