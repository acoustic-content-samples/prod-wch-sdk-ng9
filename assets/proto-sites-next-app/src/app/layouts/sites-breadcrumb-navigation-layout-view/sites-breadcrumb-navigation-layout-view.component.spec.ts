import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesBreadcrumbNavigationLayoutViewComponent } from './sites-breadcrumb-navigation-layout-view.component';

describe('SitesBreadcrumbNavigationLayoutViewComponent', () => {
  let component: SitesBreadcrumbNavigationLayoutViewComponent;
  let fixture: ComponentFixture<SitesBreadcrumbNavigationLayoutViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesBreadcrumbNavigationLayoutViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesBreadcrumbNavigationLayoutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
