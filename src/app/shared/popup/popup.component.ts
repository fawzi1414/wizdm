import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/** PopupData describes the popup dialog content
 * @param title title of the popup
 * @param message body message
 * @param ok caption of the 'ok' button. Enables the button when defined. Returns true when pressed
 * @param cancel caption of the 'cancel' button. Enables the button when defined. Returns false when pressed 
 */
export interface PopupData {
  title?  : string,
  message : string,
  ok?     : string,
  cancel? : string
}

@Component({
  selector: 'wm-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
/** PopupComponent implements the popup dialog standard appearance */
export class PopupComponent implements OnInit {

  constructor(private ref: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: PopupData ) { }
  ngOnInit() {}
}
