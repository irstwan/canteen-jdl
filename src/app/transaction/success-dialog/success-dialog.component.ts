import {Component, Inject, OnInit} from '@angular/core';
import {QrisDynamicGeneratorService} from '../../utils/qris-dynamic-generator.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MandatoryUtilsService} from '../../utils/mandatory-utils.service';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {nominal: number},
              private qrisGenerator: QrisDynamicGeneratorService,
              private mandatoryUtils: MandatoryUtilsService) { }

  ngOnInit(): void {
  }

  getQrisCode(): string {
    return this.qrisGenerator.generateQRIS(this.data.nominal);
  }

  getNominalFormatter(nominal: number): string {
    return this.mandatoryUtils.getRupiahFormatter(nominal);
  }
}
