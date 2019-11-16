import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import { map } from "rxjs/operators";

export interface HtmlElement {
  htmlContent: string
}

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  getAllHtml(): Observable<HtmlElement[]> {
    return this.http.get('api/fetch').pipe(map(res => res as HtmlElement[] || [])); 
  }

}
