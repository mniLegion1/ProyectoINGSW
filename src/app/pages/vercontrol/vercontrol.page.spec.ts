import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VercontrolPage } from './vercontrol.page';

describe('VercontrolPage', () => {
  let component: VercontrolPage;
  let fixture: ComponentFixture<VercontrolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VercontrolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VercontrolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
