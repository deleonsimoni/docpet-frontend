import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdestradorComponent } from './dashboard-adestrador.component';

describe('DashboardAdestradorComponent', () => {
  let component: DashboardAdestradorComponent;
  let fixture: ComponentFixture<DashboardAdestradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdestradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdestradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
