import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, EventEmitter, Output,
  ViewChild
} from '@angular/core';
import Quagga, {QuaggaJSResultObject} from '@ericblade/quagga2';
import {BarcodeScannerLivestreamComponent, BarcodeScannerLivestreamOverlayComponent} from 'ngx-barcode-scanner';
import {BeepService} from '../../beep.service';

@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.css']
})
export class ScanPageComponent implements AfterViewInit {
  @Output() barcode = new EventEmitter<string>();
  // @ViewChild(BarcodeScannerLivestreamComponent)
  // barcodeScanner!: BarcodeScannerLivestreamComponent;

  @ViewChild(BarcodeScannerLivestreamOverlayComponent)
  barcodeScannerOverlay!: BarcodeScannerLivestreamOverlayComponent;

  torch = false;

  constructor(private beepService: BeepService) {
  }
  ngAfterViewInit(): void {
    this.barcodeScannerOverlay.show();
  }

  onValueChanges(result: any): void {
    const barcodeValue = result.codeResult.code
    this.beepService.beep();
    this.barcode.emit(barcodeValue ? barcodeValue : '');
    this.barcodeScannerOverlay.hide();
  }

  onStarted(event: any): void {
    console.log('started', event);
  }

}
