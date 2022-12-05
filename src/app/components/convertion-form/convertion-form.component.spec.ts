import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertionFormComponent } from './convertion-form.component';

describe('ConvertionFormComponent', () => {
  let component: ConvertionFormComponent;
  let fixture: ComponentFixture<ConvertionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
