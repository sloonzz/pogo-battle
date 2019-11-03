import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleViewModalComponent } from './battle-view-modal.component';

describe('BattleViewModalComponent', () => {
  let component: BattleViewModalComponent;
  let fixture: ComponentFixture<BattleViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
