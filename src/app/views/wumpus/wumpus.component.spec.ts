import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WumpusComponent } from './wumpus.component';

describe('WumpusComponent', () => {
  let component: WumpusComponent;
  let fixture: ComponentFixture<WumpusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WumpusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WumpusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
