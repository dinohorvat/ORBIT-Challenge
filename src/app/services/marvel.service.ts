import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class MarvelService {
  apikey = "bd815566a8b9a441231760d1b1347bb3";
  ts = "1";
  hash = "9c5f4965a592f3a4a3cca6d6e94405de";
  constructor(private http: HttpClient) {
  }

  fetchCharacters(): Promise<any> {
    let url = environment.marvel + '/v1/public/characters?ts=' + this.ts + '&apikey=' + this.apikey + '&hash=' + this.hash;
    return this.http.get(url)
      .toPromise()
      .then(response => {
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
