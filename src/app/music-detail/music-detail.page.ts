// Thomas Blanquet - 1801681
// Leo Le Diouron - 1801701
// Corentin Cailleaud - 1801684
// Alexandre Berthon - 1801680

import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Music, MusicService } from '../services/music.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.page.html',
  styleUrls: ['./music-detail.page.scss'],
})
export class MusicDetailPage implements OnInit {

  music: Music = {
    title: '',
    artist: '',
    lyrics: '',
  };

  musicId = null;

  constructor(
    private musicService: MusicService,
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) {}

  // If user is looged, get the song's informations
  ngOnInit(){
    if(this.authService.userDetails()){
      this.musicId = this.route.snapshot.params['id'];
      if (this.musicId)  {
        this.loadMusic();
      }
    } else {
      this.navCtrl.navigateBack('');
    }
  }

  // Get song's informations
  async loadMusic() {
    const loading = await this.loadingController.create({
      message: 'Loading Music..'
    });
    await loading.present();

    this.musicService.getMusic(this.musicId).subscribe(res => {
      loading.dismiss();
      this.music = res;
    });
  }

  // Save a new song or update an existing one depending if it already have a id (which mean it is already in the DB)
  async saveMusic() {
    const loading = await this.loadingController.create({
      message: 'Saving Music..'
    });
    await loading.present();

    if (this.musicId) {
      this.musicService.updateMusic(this.music, this.musicId).then(() => {
        loading.dismiss();
        this.navCtrl.navigateBack('dashboard');
      });
    } else {
      this.musicService.addMusic(this.music).then(() => {
        loading.dismiss();
        this.navCtrl.navigateBack('dashboard');
      });
    }
  }
}
