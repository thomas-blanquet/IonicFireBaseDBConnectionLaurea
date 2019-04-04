import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicLyricsPage } from './music-lyrics.page';

describe('MusicLyricsPage', () => {
  let component: MusicLyricsPage;
  let fixture: ComponentFixture<MusicLyricsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicLyricsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicLyricsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
