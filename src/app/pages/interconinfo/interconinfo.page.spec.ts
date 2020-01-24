import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterconinfoPage } from './interconinfo.page';

describe('InterconinfoPage', () => {
  let component: InterconinfoPage;
  let fixture: ComponentFixture<InterconinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterconinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterconinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
