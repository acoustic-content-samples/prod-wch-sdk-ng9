import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesTopNavigationLayoutViewComponent } from './sites-top-navigation-layout-view.component';

describe('SitesTopNavigationLayoutViewComponent', () => {
  let component: SitesTopNavigationLayoutViewComponent;
  let fixture: ComponentFixture<SitesTopNavigationLayoutViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesTopNavigationLayoutViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesTopNavigationLayoutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
