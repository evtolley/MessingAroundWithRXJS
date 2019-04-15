import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { timer, BehaviorSubject,  of, from } from 'rxjs';
import { delay, concatMap, tap } from 'rxjs/operators';
import { BlockComponent } from './block/block.component';

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

  borderRadius = 0;
  goingDown = false;
  size = 35;

  @ViewChildren(BlockComponent) blocks: QueryList<BlockComponent>;


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
