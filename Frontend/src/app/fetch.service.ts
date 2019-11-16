import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import { map } from "rxjs/operators";

export interface HtmlContent {
  content: string
}
interface HtmlElements {
  htmlContent: HtmlContent[]
}

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  getAllHtml(): Observable<HtmlContent[]> {
/*     return this.http.get('api/fetch').pipe(map(res => res as HtmlElement[] || [])); 
 */
    return this.http.get<HtmlElements>('api/fetch').pipe(
      map(res => res.htmlContent || []),
    );
  }

}
