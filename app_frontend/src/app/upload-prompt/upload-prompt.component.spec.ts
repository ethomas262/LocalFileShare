import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPromptComponent } from './upload-prompt.component';

describe('UploadPromptComponent', () => {
  let component: UploadPromptComponent;
  let fixture: ComponentFixture<UploadPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadPromptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
