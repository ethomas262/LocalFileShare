import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesboxComponent } from './filesbox.component';

describe('FilesboxComponent', () => {
  let component: FilesboxComponent;
  let fixture: ComponentFixture<FilesboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilesboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
