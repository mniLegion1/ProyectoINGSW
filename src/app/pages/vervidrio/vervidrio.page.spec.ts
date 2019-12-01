import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VervidrioPage } from './vervidrio.page';

describe('VervidrioPage', () => {
  let component: VervidrioPage;
  let fixture: ComponentFixture<VervidrioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VervidrioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VervidrioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
