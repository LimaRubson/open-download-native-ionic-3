import { Injectable } 							from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } 							from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class ApiServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ApiServiceProvider Provider');
  }

  handleError(error, errorType) {
    return Observable.throw(error);
	}
	
	getPdf (): Observable<Array<any>> {		
		var url = 'http://www.scielo.org/local/File/livro.pdf' + '/getabeautypdfinbase64/'; 
		var headersXML = new Headers({ 
			'Content-Type': 'application/json',
		});
		let options = new RequestOptions({
			headers: headersXML,
			responseType: ResponseContentType.Blob //here is the magic!!!
		});
		return this.http.get(url, options)
			.map(
				(res) => {
					//CHANGE THE BASE64 DATA INTO A PDF BLOB
          return new Blob([res.blob()], { type: 'application/pdf' })
        })
			.catch(this.handleError);
	}

}
