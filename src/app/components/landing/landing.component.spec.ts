import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
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
import {MainComponent} from '../main/main.component';


describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent, LandingComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
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
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
