// Thomas Blanquet - 1801681
// Leo Le Diouron - 1801701
// Corentin Cailleaud - 1801684
// Alexandre Berthon - 1801680

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Music {
  id?: string;
  title: string;
  artist: string;
  lyrics: string;
}

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private musicCollection: AngularFirestoreCollection<Music>;

  private musics: Observable<Music[]>;

  constructor(db: AngularFirestore) {
    this.musicCollection = db.collection<Music>('musics');

    this.musics = this.musicCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMusics() {
    return this.musics;
  }

  getMusic(id) {
    return this.musicCollection.doc<Music>(id).valueChanges();
  }

  updateMusic(music: Music, id: string) {
    return this.musicCollection.doc(id).update(music);
  }

  addMusic(music: Music) {
    return this.musicCollection.add(music);
  }

  removeMusic(id) {
    return this.musicCollection.doc(id).delete();
  }
}
