import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {MainComponent} from './main.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {rootRouterConfig} from '../../app.routing';
import {RouterModule} from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {LayoutModule} from '@angular/cdk/layout';
import {MarvelService} from '../../services/marvel.service';
import {APP_BASE_HREF} from '@angular/common';
import {LandingComponent} from '../landing/landing.component';
import {inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {defer} from 'rxjs';


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let marvelService: MarvelService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      declarations: [ MainComponent, LandingComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterModule.forRoot(rootRouterConfig, { useHash: false }),
        MatGridListModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatMenuModule,
        DialogModule,
        TableModule
      ],
      providers: [MarvelService,{provide: APP_BASE_HREF, useValue: '/'}]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    marvelService = new MarvelService(<any> httpClientSpy);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //
  it('should call fetchData from apiService', function(done) {
    marvelService.fetchLeaderboard()
      .then((result) => {
        expect(result).toEqual({a:123});
        done();
      });
  });
  it('should return expected heroes (HttpClient called once)', () => {
    const expectedHeroes =
      [{ score: 1, koklo: 'A' }];

    httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

    marvelService.fetchLeaderboard().then(
      heroes => expect(heroes).toEqual(expectedHeroes, 'expected heroes'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
