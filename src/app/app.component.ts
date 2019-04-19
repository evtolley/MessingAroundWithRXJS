import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { timer, BehaviorSubject,  of, from, Subscription } from 'rxjs';
import { delay, concatMap, tap } from 'rxjs/operators';
import { BlockComponent } from './block/block.component';
import { DotComponent } from './dot/dot.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  timer$ = timer(0, 1500);
  color$ = new BehaviorSubject<string>('#7da1db');

  rows$ = new BehaviorSubject<Array<number>>(Array(5));
  columns$ = new BehaviorSubject<Array<number>>(Array(5));

  verticalDotMovementSubscription: Subscription;
  horizontalDotMovementSubscription: Subscription;

  borderRadius = 0;
  goingDown = false;
  size = 35;

  dotSpeed = 2;

  @ViewChildren(BlockComponent) blocks: QueryList<BlockComponent>;
  @ViewChild(DotComponent) dot: DotComponent;

  changeColor(color: string) {
    from(this.blocks.toArray()).pipe(
      concatMap(x => of(x).pipe(
        delay(25)
      )
    )
    ).subscribe({
      next(res) {
        res.setColor(color);
      }
    });
  }

  toggleShapes() {
    this.goingDown ? this.borderRadius = 100 : this.borderRadius = 0;
    from(this.blocks.toArray()).pipe(
      concatMap(x => of(x).pipe(
        delay(5),
        tap(res => {
          res.toggleRadius();
        })
      )
    )
    ).subscribe();
  }

  changeSize(size: number) {
    this.size = size;
    from(this.blocks.toArray()).pipe(
      concatMap(x => of(x).pipe(
        delay(25)
      )
    )
    ).subscribe({
      next(res) {
        res.setSize(size);
      }
    });
  }

toggleHorizontalDotMovement() {
  if (this.horizontalDotMovementSubscription) {
    this.horizontalDotMovementSubscription.unsubscribe();
    delete this.horizontalDotMovementSubscription;
  } else {
    this.horizontalDotMovementSubscription = timer(0, 10).subscribe(res => {
      this.dot.moveHorizontally(this.dotSpeed);
    });
  }
}

toggleVerticalDotMovement() {
  if (this.verticalDotMovementSubscription) {
    this.verticalDotMovementSubscription.unsubscribe();
    delete this.verticalDotMovementSubscription;
  } else {
    this.verticalDotMovementSubscription = timer(0, 10).subscribe(res => {
      this.dot.moveVertically(this.dotSpeed);
    });
  }
}

counter(i: number): Array<number> {
    return new Array(i);
}

onRowsUpdated(count: number) {
  this.rows$.next(Array(count));
}

onColumnsUpdated(count: number) {
  this.columns$.next(Array(count));
}

  ngOnInit() {
  }

  ngOnDestroy() {

  }
}
