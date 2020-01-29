import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerexlabPage } from './verexlab.page';

describe('VerexlabPage', () => {
  let component: VerexlabPage;
  let fixture: ComponentFixture<VerexlabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerexlabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerexlabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
