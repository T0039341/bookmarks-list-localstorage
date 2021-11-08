import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Bookmarks } from '../models/bookmarks';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../services/local-storage.service';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss']
})
export class BookmarkItemComponent implements OnInit, AfterViewInit {
  //getting array from parent
  @Input() urlVal: Bookmarks[];
  //send the array to child
  @Output() newUrlEvent: EventEmitter<Bookmarks[]> = new EventEmitter();
  @Output() updateUrlVal: EventEmitter<Bookmarks> = new EventEmitter();
  @Output() getListValue: EventEmitter<Bookmarks> = new EventEmitter();
  p: number = 1;
  itemsPerPage = 20;
  newEl: Bookmarks;
  faTrash = faTrash;
  faEdit = faEdit;
  editHtmlElement = false;
  editFromEditValue: Bookmarks;
  //get template reference for the url
  @ViewChildren('url') el: QueryList<ElementRef>;
  urlHtmlVal: any;
  $sharedServiceSubscription: Subscription;
  constructor(private sharedService: SharedService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }


  //get url value 
  ngAfterViewInit() {
    if (this.el) {
      this.urlHtmlVal = this.el.toArray();
      this.newEl = this.urlHtmlVal.innertext;
    }
  }

  navFunc(url: Bookmarks) {
    window.location.href = `${url}`

  }


  //get reference of current url value 
  //and delete it from urVal array
  //send the new array back to bookmarks
  deleteUrl(url: Bookmarks) {
    let index = this.urlVal.indexOf(url);
    this.urlVal.splice(index, 1);
    this.newUrlEvent.emit(this.urlVal);
  }
  //emit div element value when we click
  //on edit icon
  onclick(item: Bookmarks) {
    this.getListValue.emit(item);
  }

  //emit click event to open the form in
  //result component
  editClicked() {
    this.sharedService.pushBoolean(true);
  }


}
