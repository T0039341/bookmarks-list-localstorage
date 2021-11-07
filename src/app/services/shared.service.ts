import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Bookmarks } from '../models/bookmarks';

@Injectable({
    providedIn: 'root'
})
export class SharedService {


    private dataStream: BehaviorSubject<any> = new BehaviorSubject('');


    currentDataStream = this.dataStream.asObservable();

    constructor() { }

    //this will call next on the behaviour subject
    //to change its value
    pushBoolean(data: Boolean): Boolean {
        this.dataStream.next(data);
        console.log(data);
        return data;
    }

    pushValue(data: Bookmarks): Bookmarks {
        this.dataStream.next(data);
        return data;
    }
}
