import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerhistorialPage } from './verhistorial.page';

describe('VerhistorialPage', () => {
  let component: VerhistorialPage;
  let fixture: ComponentFixture<VerhistorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerhistorialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerhistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
