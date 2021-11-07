import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Bookmarks } from "../models/bookmarks";


@Injectable({
    providedIn: "root"
})

export class UrlService {
    constructor(private http: HttpClient) { }

    baseUrl = '';
    checkUrl(url: string): Observable<Bookmarks> {
        let result = this.http.get<Bookmarks>(
            url
        )
        console.log(this.baseUrl)
        return result
    }

}