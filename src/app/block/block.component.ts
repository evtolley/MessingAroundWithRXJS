import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockComponent implements OnInit {

  constructor() { }

  color$ = new BehaviorSubject<string>('#7da1db');

  radius = 0;
  radius$ = new BehaviorSubject<string>('0%');

  size$ = new BehaviorSubject<string>('35px');

  setColor(color: string) {
    this.color$.next(color);
  }

  setSize(size: number) {
    this.size$.next(`${size}px`);
  }

  toggleRadius() {
    this.radius === 0 ? this.radius = 100 : this.radius = 0;
    this.radius$.next(`${this.radius}%`);
  }

  ngOnInit() {
  }

}
