import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BeepService} from '../../beep.service';
import {UpdateService} from '../../update.service';
import {environment} from '../../../environments/environment';
import Quagga from '@ericblade/quagga2';
import {getMainBarcodeScanningCamera} from '../../camera-access';

@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.css']
})
export class ScanPageComponent implements AfterViewInit, OnDestroy {

  started: boolean | undefined;
  errorMessage: string | undefined;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private beepService: BeepService,
              private updateService: UpdateService) {
  }

  ngAfterViewInit(): void {
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.errorMessage = 'getUserMedia is not supported';
      return;
    }

    this.initializeScanner();

    if (environment.production) {
      setTimeout(() => {
        this.updateService.checkForUpdates();
      }, 10000);
    }
  }

  private initializeScanner(): Promise<void> {
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.errorMessage = 'getUserMedia is not supported. Please use Chrome on Android or Safari on iOS';
      this.started = false;
      return Promise.reject(this.errorMessage);
    }

    // enumerate devices and do some heuristics to find a suitable first camera
    return Quagga.CameraAccess.enumerateVideoDevices()
      .then(mediaDeviceInfos => {
        const mainCamera = getMainBarcodeScanningCamera(mediaDeviceInfos);
        if (mainCamera) {
          console.log(`Using ${mainCamera.label} (${mainCamera.deviceId}) as initial camera`);
          return this.initializeScannerWithDevice(mainCamera.deviceId);
        } else {
          console.error(`Unable to determine suitable camera, will fall back to default handling`);
          return this.initializeScannerWithDevice(undefined);
        }
      })
      .catch(error => {
        this.errorMessage = `Failed to enumerate devices: ${error}`;
        this.started = false;
      });
  }

  private initializeScannerWithDevice(preferredDeviceId: string | undefined): Promise<void> {
    console.log(`Initializing Quagga scanner...`);

    const constraints: MediaTrackConstraints = {};
    if (preferredDeviceId) {
      // if we have a specific device, we select that
      constraints.deviceId = preferredDeviceId;
    } else {
      // otherwise we tell the browser we want a camera facing backwards (note that browser does not always care about this)
      constraints.facingMode = 'environment';
    }

    return Quagga.init({
        inputStream: {
          type: 'LiveStream',
          constraints,
          area: { // defines rectangle of the detection/localization area
            top: '25%',    // top offset
            right: '10%',  // right offset
            left: '10%',   // left offset
            bottom: '25%'  // bottom offset
          },
          target: document.querySelector('#scanner-container') ?? undefined
        },
        decoder: {
          readers: ['ean_reader'],
          multiple: false
        },
        // See: https://github.com/ericblade/quagga2/blob/master/README.md#locate
        locate: false
      },
      (err) => {
        if (err) {
          console.error(`Quagga initialization failed: ${err}`);
          this.errorMessage = `Initialization error: ${err}`;
          this.started = false;
        } else {
          console.log(`Quagga initialization succeeded`);
          Quagga.start();
          this.started = true;
          this.changeDetectorRef.detectChanges();
          Quagga.onDetected((res) => {
            if (res.codeResult.code) {
              this.onBarcodeScanned(res.codeResult.code);
            }
          });
        }
      });
  }

  onBarcodeScanned(code: string) {

    // // ignore duplicates for an interval of 1.5 seconds
    // const now = new Date().getTime();
    // if (code === this.lastScannedCode
    //   && ((this.lastScannedCodeDate !== undefined) && (now < this.lastScannedCodeDate + 1500))) {
    //   return;
    // }
    //
    // // only accept articles from catalogue
    // let article = this.catalogue.find(a => a.ean === code);
    // if (!article) {
    //   if (this.acceptAnyCode) {
    //     article = this.createUnknownArticle(code);
    //   } else {
    //     return;
    //   }
    // }
    //
    // this.lastScannedCode = code;
    // this.lastScannedCodeDate = now;
    this.beepService.beep();
    this.changeDetectorRef.detectChanges();
    alert('Barcode: ' + code);
  }

  ngOnDestroy(): void {
    Quagga.stop().then(r => {});
  }
}
