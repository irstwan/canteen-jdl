import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ScanPageComponent} from './scan-page/scan-page.component';
import {BarcodeScannerLivestreamModule, BarcodeScannerLivestreamOverlayModule} from 'ngx-barcode-scanner';
import { FocusDirective } from './focus.directive';
import { CardItemComponent } from './card-item/card-item.component';



@NgModule({
  declarations: [
    ItemComponent,
    ScanPageComponent,
    FocusDirective,
    CardItemComponent
  ],
    exports: [
        ItemComponent,
        ScanPageComponent,
        CardItemComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatSlideToggleModule,
        BarcodeScannerLivestreamModule,
        BarcodeScannerLivestreamOverlayModule
    ]
})
export class SharedModule { }
