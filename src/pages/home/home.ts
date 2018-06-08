import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileOpener } from '@ionic-native/file-opener';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

 

  appService: any;
  pdfobj: any;
  blobPdf: any;

  constructor(

    public navCtrl: NavController,
    private file: File,
    private fileOpener: FileOpener,
    private plt: Platform,
    private apiService: ApiServiceProvider,
    private iab: InAppBrowser
  ) {
       
  }

  openPdf() {

    this.apiService.getPdf().subscribe(
      data => {
        if(this.plt.is('ios')) {
          //Use inAppBrowser plugin,
          //Easier and faster in iOS
          this.pdfobj.active = false;
          this.pdfobj.fileURL = URL.createObjectURL(data);
          var browser = this.iab.create(
            this.pdfobj.fileURL,
            '_blank',
            'location=no, ' +
            'toolbar=yes, ' +
            'enableViewportScale=yes, ' +
            'closebuttoncaption=Cerrar PDF, ' +
            'hardwareback=no'  
          );
          browser.show();
        } else if(this.plt.is('android')) {
          //lets save and then open the file
          this.blobPdf = data; //Lets store the pdf Blob
          let filedir = this.file.dataDirectory;
          this.file.writeFile(//save PDF
            filedir,
            "comprobante.pdf",
            this.blobPdf,
            {replace:true}
          ).then(() => {
              this.fileOpener.open(//open in native PDF
                  filedir + 'comprobante.pdf',
                  'application/pdf'
              ).then(() => {
                   this.pdfobj.active = false;
              }).catch(e => console.log('Open error', e));
          }).catch(e => console.log('Save error', e));
        } 
      },
      (error) => {
        this.appService.manageError(error);
      }
    )

  }

}
