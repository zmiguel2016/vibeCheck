import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageDetailPage } from './image-detail.page';

describe('ImageDetailPage', () => {
  let component: ImageDetailPage;
  let fixture: ComponentFixture<ImageDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
