import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExlabPage } from './exlab.page';

describe('ExlabPage', () => {
  let component: ExlabPage;
  let fixture: ComponentFixture<ExlabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExlabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExlabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
