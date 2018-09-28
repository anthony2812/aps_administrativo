import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  listMenu = new FormControl();
  options: string[] = ['Link 1', 'Link 2', 'Link 3', 'Link 4'];
  showAutocomplete = false;
  showColorBlack = false;
  filteredOptions: Observable<string[]>;



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.filteredOptions = this.listMenu.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(menuPrincipal => menuPrincipal.toLowerCase().includes(filterValue));
  }



  updatedVal(e) {
    // console.log(this.stateCtrl);
    // debugger;
    if (e && e.length >= 1) {
      this.showAutocomplete = true;
    } else {
      this.showAutocomplete = false;
    }
  }

  changeColor() {
    this.showColorBlack = true;
  }
  changeColor2() {
    this.showColorBlack = false;
  }


}
