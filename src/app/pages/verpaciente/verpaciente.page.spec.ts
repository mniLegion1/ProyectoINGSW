import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerpacientePage } from './verpaciente.page';

describe('VerpacientePage', () => {
  let component: VerpacientePage;
  let fixture: ComponentFixture<VerpacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerpacientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerpacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
