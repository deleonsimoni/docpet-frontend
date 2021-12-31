import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEsteticaComponent } from './dashboard-estetica.component';

describe('DashboardEsteticaComponent', () => {
  let component: DashboardEsteticaComponent;
  let fixture: ComponentFixture<DashboardEsteticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEsteticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEsteticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
