import { Component, OnInit } from '@angular/core';
import { ErrorMessage } from 'src/app/model/model';
import { CleanerService } from 'src/app/services/cleaner-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cleaner-search',
  templateUrl: './cleaner-search.component.html',
  styleUrls: ['./cleaner-search.component.css']
})
export class CleanerSearchComponent implements OnInit {
  allCleaners: any[] = [];
  allCleanersCopy: any[] = [];

  nameSearchValue: string = '';
  statusSearchValue: string = '';
  dateFromValue: Date = new Date();
  dateToValue: Date = new Date();

  // dateFromValueString: string = this.dateFromValue.toISOString();
  // dateToValueString: string = this.dateToValue.toISOString();

  constructor(private cleanerService: CleanerService, private userService: UserService) {
    this.setDateDefaults();
  }

  setDateDefaults() {
    const today = new Date();
    this.dateFromValue = today;
    this.dateToValue = today;
  }

  loadCleaners(): void {
    this.cleanerService.getCleaners().subscribe(
      (data) => {
      this.allCleaners = data;
      this.allCleanersCopy = [...this.allCleaners]; // deep copy
    }, (error) => {
      let errorMessage = new ErrorMessage(0, null, null, error.name, error.message);
      // console.log("radim " + error.name + " i " + error.message);
      this.userService.createErrorMessage(errorMessage);
      console.error('Error loading cleaners:', error);
    });
  }

  canRemoveCleaners() : boolean {
    return this.userService.userHasPermissionToRemoveVacuums();
  }

  eraseCleaner(name: string, cleanerId: number) {
    const confirmDelete = confirm(`Are you sure you want to delete the cleaner with name ${name}?`);
    if (confirmDelete) {
      this.cleanerService.deleteCleaner(cleanerId).subscribe(
        () => {
          console.log(`Cleaner with name ${name} deleted successfully.`);
          // console.log('Cleaner ID:', cleanerId);
          // console.log('Before filtering:', this.allCleaners);
          this.allCleaners = this.allCleaners.filter(cleaner => cleaner.cleanerId !== cleanerId);
          // this.allCleaners = [...this.allCleaners]; // Try forcing an update
        },
        (error) => {
          console.error('Error deleting cleaner:', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.loadCleaners();
  }

  listAllCleaners() : void {
    this.allCleaners = [...this.allCleanersCopy]; 
  }

  formatDateForBackend(date: Date | string | null | undefined): string {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = (`0${date.getMonth() + 1}`).slice(-2);
      const day = (`0${date.getDate()}`).slice(-2);
      return `${year}-${month}-${day}`;
    } else if (typeof date === 'string') {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        const year = parsedDate.getFullYear();
        const month = (`0${parsedDate.getMonth() + 1}`).slice(-2);
        const day = (`0${parsedDate.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
      }
    }
    return '';
  }

  applyAllFilters() {
    const formattedDateFrom = this.formatDateForBackend(this.dateFromValue);
    const formattedDateTo = this.formatDateForBackend(this.dateToValue);
    this.cleanerService.applyAllFilters(this.nameSearchValue, this.statusSearchValue, formattedDateFrom, formattedDateTo)
      .subscribe((data: any[]) => {
        this.allCleaners = data;
      }, (error: any) => {
        console.error('Error fetching cleaners by name:', error);
        // console.log("greska " + JSON.stringify(error));
        let errorMessage = new ErrorMessage(0, null, null, error.name, error.message);
        console.log("evo ga " + errorMessage + " " + errorMessage.errorMessage + " iiii " + errorMessage.operation);
        this.userService.createErrorMessage(errorMessage);
        // Handle error, show message, etc.
      });
  }

  // searchByName() {
  //   if (this.nameSearchValue == '') return;
  //   this.cleanerService.getCleanersByNameContainingIgnoreCase(this.nameSearchValue)
  //     .subscribe((data: any[]) => {
  //       this.allCleaners = data;
  //     }, error => {
  //       console.error('Error fetching cleaners by name:', error);
  //       // Handle error, show message, etc.
  //     });
  // }

  // searchByStatus() {
  //   let statuses: string[] = this.statusSearchValue.split(',');
  //   this.cleanerService.getCleanersByStatusIn(statuses)
  //     .subscribe((data: any[]) => {
  //       this.allCleaners = data;
  //     }, error => {
  //       console.error('Error fetching cleaners by status:', error);
  //       // Handle error, show message, etc.
  //     });
  // }

  // searchByDateRange() {
  //   this.cleanerService.getCleanersByDateRange(this.dateFromValue, this.dateToValue)
  //     .subscribe((data: any[]) => {
  //       this.allCleaners = data;
  //     }, error => {
  //       console.error('Error fetching cleaners by date range:', error);
  //       // Handle error, show message, etc.
  //     });
  // }
}
