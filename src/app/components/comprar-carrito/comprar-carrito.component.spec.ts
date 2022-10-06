import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarCarritoComponent } from './comprar-carrito.component';

describe('ComprarCarritoComponent', () => {
  let component: ComprarCarritoComponent;
  let fixture: ComponentFixture<ComprarCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprarCarritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprarCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
