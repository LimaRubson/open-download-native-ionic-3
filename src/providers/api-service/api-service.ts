import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class ApiServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiServiceProvider Provider');
  }

  handleError(error, errorType) {
    return Observable.throw(error);
  }

  getPdf(): Observable<Array<any>> {
    var url = 'http://www.scielo.org/local/File/livro.pdf' + '/getabeautypdfinbase64/';
    var headersXML = new Headers({
      'Content-Type': 'application/json',
    });
    let options = new RequestOptions({
        headers: headersXML,
        responseType: ResponseContentType.Blob //Here is the magic!!!
    });

    //Erro no let options
    return this.http.get(url, options)
        .map(
          (res) => {
            
            //CHANGE THE BASE64 DATA INTO A PDF BLOB
            return new Blob([res.blob()], { type: 'application/pdf' })

          })

               .catch(this.handleError);
    }

}
