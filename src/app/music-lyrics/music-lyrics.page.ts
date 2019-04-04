import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Music, MusicService } from '../services/music.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-music-lyrics',
  templateUrl: './music-lyrics.page.html',
  styleUrls: ['./music-lyrics.page.scss'],
})
export class MusicLyricsPage implements OnInit {

    music: Music = {
      title: 'test',
      artist: 'test',
      lyrics: 'test',
    };

    musicId = null;

    constructor(
      private musicService: MusicService,
      private navCtrl: NavController,
      private authService: AuthenticateService,
      private route: ActivatedRoute,
      private loadingController: LoadingController
    ) {}

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
}
