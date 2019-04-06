// Thomas Blanquet - 1801681
// Leo Le Diouron - 1801701
// Corentin Cailleaud - 1801684
// Alexandre Berthon -

import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Music, MusicService } from '../services/music.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userEmail: string;

  musics: Music[];

  constructor(
    private musicService: MusicService,
    private navCtrl: NavController,
    private authService: AuthenticateService
  ) {}

  ngOnInit(){
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
      this.musicService.getMusics().subscribe(res => {
        this.musics = res;
      });
    } else {
      this.navCtrl.navigateBack('');
    }
  }

  remove(item) {
    this.musicService.removeMusic(item.id);
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }
}
