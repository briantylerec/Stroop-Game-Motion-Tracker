import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerNivelComponent } from './primer-nivel.component';

describe('PrimerNivelComponent', () => {
  let component: PrimerNivelComponent;
  let fixture: ComponentFixture<PrimerNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimerNivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimerNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
