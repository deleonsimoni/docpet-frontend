import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCadastroComponent } from './blog-cadastro.component';

describe('CadastroComponent', () => {
  let component: BlogCadastroComponent;
  let fixture: ComponentFixture<BlogCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
