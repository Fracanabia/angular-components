import { Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { NbaService } from './nba.service';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-http-interceptors',
  templateUrl: './http-interceptors.component.html',
  styleUrls: ['./http-interceptors.component.scss']
})
export class HttpInterceptorsComponent {

  players: any[] = [];

  teams: any[] = [];

  photos: any[] = []

  loading$ = this._loaderService.onIsLoading();

  constructor(private _nbaService: NbaService, private _photoService: PhotoService, private _loaderService: LoaderService) { }

  loadPLayers() {
    this.players = [];
    this._nbaService.getPlayers().subscribe((data) => {
      this.players = data;
    });
  }

  loadTeams() {
    this._nbaService.getTeams().subscribe((data) => {
      this.teams = data;
    });
  }

  loadPhotos() {
    this._photoService.getPhotos().subscribe((data) => {
      this.photos = data;
    });
  }
}
