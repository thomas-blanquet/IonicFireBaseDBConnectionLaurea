// Thomas Blanquet - 1801681
// Leo Le Diouron - 1801701
// Corentin Cailleaud - 1801684
// Alexandre Berthon - 1801680

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

  musics: Music[];

  constructor(
    private musicService: MusicService,
    private navCtrl: NavController,
    private authService: AuthenticateService
  ) {}

  ngOnInit(){
    // Get song list if the user is logged
    if(this.authService.userDetails()){
      this.musicService.getMusics().subscribe(res => {
        this.musics = res;
      });
    } else {
      this.navCtrl.navigateBack('');
    }
  }

  // remove a song from the list
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
