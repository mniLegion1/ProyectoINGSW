import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterconsultaPage } from './interconsulta.page';

describe('InterconsultaPage', () => {
  let component: InterconsultaPage;
  let fixture: ComponentFixture<InterconsultaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterconsultaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterconsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
