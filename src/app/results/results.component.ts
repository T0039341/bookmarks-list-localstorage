import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Bookmarks } from '../models/bookmarks';
import { LocalStorageService } from '../services/local-storage.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  faBackSpace = faBackspace;
  urlVal: string | null;
  locString: string | null;
  resultValueKey: string = 'urlKey';
  constructor(private router: Router, private sharedService: SharedService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUrlVal();
  }

  navigateBack() {
    this.router.navigate(['']);
    this.localStorageService.removeItem(this.resultValueKey);
  }

  getUrlVal() {
    this.sharedService.currentDataStream.subscribe(res => {
      if (this.localStorageService.getItem(this.resultValueKey)) {
        this.urlVal = this.localStorageService.getItem(this.resultValueKey);
      } else {
        let results = res;
        this.urlVal = results;
        this.localStorageService.setItem(this.resultValueKey, JSON.stringify(this.urlVal));
      }
    })
  }
}
