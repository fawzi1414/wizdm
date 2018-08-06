import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Angular material + Flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatStepperModule,
  MatExpansionModule,
  MatListModule,
  MatGridListModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatDividerModule,
  MatTabsModule,
  MatTooltipModule,
  MatDatepickerModule,
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE
} from '@angular/material';

import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

// Application specific
import { IconComponent } from './icon/icon.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup/popup.service';
import { MarkdownComponent } from './markdown/markdown.component';
import { RemarkService } from './markdown/remark.service';
import { CodeHighlightComponent } from './markdown/code-highlight/code-highlight.component';
import { PrismService } from './markdown/code-highlight/prism.service';

const sharedModules = [
  FlexLayoutModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatStepperModule,
  MatExpansionModule,
  MatListModule,
  MatGridListModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatDividerModule,
  MatTabsModule,
  MatTooltipModule,
  MatDatepickerModule,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ...sharedModules
  ],
  
  declarations: [
    IconComponent,
    DisclaimerComponent,
    PopupComponent,
    MarkdownComponent,
    CodeHighlightComponent
  ],

  exports: [
    ...sharedModules,
//------------------------    
    IconComponent,
    DisclaimerComponent,
    PopupComponent,
    MarkdownComponent
  ],

  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [ MAT_DATE_LOCALE ]},
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    PopupService,
    RemarkService,
    PrismService
  ],

  entryComponents: [
    PopupComponent // Don't forget to declare dialogs here
  ]
})
export class SharedModule { }
