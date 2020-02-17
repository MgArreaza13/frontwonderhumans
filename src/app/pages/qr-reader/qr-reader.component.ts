import { Component, OnInit } from '@angular/core';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss']
})
export class QrReaderComponent implements OnInit {

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResult: any = false;
  guestExist: boolean;

  constructor() {}

  ngOnInit(): void {}

  //Clears the QR code scanned
  clearResult(): void {
    this.qrResult = false;
  }

  //Scans the QR code
  onCodeResult(resultString: string): void {
    console.log(resultString);
    if(this.validURL(resultString)){
      this.qrResult = resultString
    }
  }

  //Permission for the app to use the device camera
  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }


  clearMessage() {
    setTimeout(() => {
      this.guestExist = null;
    }, 3000);
  }

  //This function check if the QR code has a valid JSON as data
  checkQRJSON(qrString: string): boolean {
    if (
      /^[\],:{}\s]*$/.test(
        qrString
          .replace(/\\["\\\/bfnrtu]/g, "@")
          .replace(
            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]"
          )
          .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
  

  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

}
