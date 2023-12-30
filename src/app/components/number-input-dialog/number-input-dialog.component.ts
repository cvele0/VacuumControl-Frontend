import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-number-input-dialog',
  template: `
    <input type="number" [(ngModel)]="enteredNumber" />
    <button (click)="submitNumber()">Submit</button>
  `
})
export class NumberInputDialogComponent {
  enteredNumber: number | undefined;

  @Output() numberEntered = new EventEmitter<number>();

  constructor(private dialogRef: MatDialogRef<NumberInputDialogComponent>) {}

  submitNumber() {
    if (this.enteredNumber) {
      this.numberEntered.emit(this.enteredNumber);
      this.dialogRef.close();
    }
  }
}
