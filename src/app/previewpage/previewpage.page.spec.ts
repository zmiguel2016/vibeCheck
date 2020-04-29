import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviewpagePage } from './previewpage.page';

describe('PreviewpagePage', () => {
  let component: PreviewpagePage;
  let fixture: ComponentFixture<PreviewpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
