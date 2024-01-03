import { Component, EventEmitter, Output } from '@angular/core';
import { SchedulingRequest } from 'src/app/model/model';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-schedule-cleaner',
  templateUrl: './schedule-cleaner.component.html',
  styleUrls: ['./schedule-cleaner.component.css']
})
export class ScheduleCleanerComponent {
  @Output() scheduleEvent = new EventEmitter<SchedulingRequest>();

  schedulingRequest: SchedulingRequest;

  constructor() {
    this.schedulingRequest = new SchedulingRequest("* * * * * *", 0, '', 0);
  }

  openModal(cleanerId: number) {
    // Triggering the modal
    this.schedulingRequest.cleanerId = cleanerId;
    const modalElement = document.getElementById('scheduleCleanerModal');
    if (modalElement !== null) {
      const modal: any = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error("Modal element not found");
    }
  }

  scheduleCleaner() {
    // Here you can handle scheduling logic using this.operation, this.duration, this.cron
    // console.log('Scheduled Operation:', this.schedulingRequest.operation);
    // console.log('Scheduled Duration:', this.schedulingRequest.duration);
    // console.log('Scheduled Cron:', this.schedulingRequest.cron);

    this.scheduleEvent.emit(this.schedulingRequest);

    // Close the modal after scheduling
    const modalElement = document.getElementById('scheduleCleanerModal');
    if (modalElement !== null) {
      const modal: any = new bootstrap.Modal(modalElement);
      modal.hide();
    } else {
      console.error("Modal element not found");
    }
  }
}
