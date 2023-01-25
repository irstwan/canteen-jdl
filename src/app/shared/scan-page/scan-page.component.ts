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
  readonly BARCODE_TYPES = [
    'ean',
    'code_128',
    'code_39',
    'code_39_vin',
    'ean_8',
    'upc',
    'upc_e',
    'codabar',
    'i2of5',
    '2of5',
    'code_93'
  ];
  @Output() barcode = new EventEmitter<string>();
  // @ViewChild(BarcodeScannerLivestreamComponent)
  // barcodeScanner!: BarcodeScannerLivestreamComponent;

  @ViewChild(BarcodeScannerLivestreamOverlayComponent)
  barcodeScannerOverlay!: BarcodeScannerLivestreamOverlayComponent;

  torch = false;

  constructor(private beepService: BeepService,
              private cdr: ChangeDetectorRef) {
  }
  ngAfterViewInit(): void {
    this.barcodeScannerOverlay.show();
    this.cdr.detectChanges();
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
