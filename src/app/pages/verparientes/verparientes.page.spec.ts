import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerparientesPage } from './verparientes.page';

describe('VerparientesPage', () => {
  let component: VerparientesPage;
  let fixture: ComponentFixture<VerparientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerparientesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerparientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
