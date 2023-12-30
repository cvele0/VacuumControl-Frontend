import { Component, OnInit } from '@angular/core';
import { CleanerStatus, ErrorMessage } from 'src/app/model/model';
import { CleanerService } from 'src/app/services/cleaner-service.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { NumberInputDialogComponent } from '../number-input-dialog/number-input-dialog.component';

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

  cleanerStatus = CleanerStatus;

  // dateFromValueString: string = this.dateFromValue.toISOString();
  // dateToValueString: string = this.dateToValue.toISOString();

  constructor(private cleanerService: CleanerService, private userService: UserService,
     private dialog: MatDialog) {
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

  openNumberInputDialog(cleanerId: number) {
    const dialogRef = this.dialog.open(NumberInputDialogComponent);

    dialogRef.componentInstance.numberEntered.subscribe((enteredNumber: number) => {
      this.startCleaner(cleanerId, enteredNumber);
    });
  }

  startCleaner(cleanerId: number, enteredNumber: number) {
    const email: string = this.userService.getCurrentEmail();
    if (email === '') {
      console.log("User not logged in.");
      return;
    }
    this.cleanerService.startCleaner(cleanerId, enteredNumber, email).subscribe(
        () => {
            console.log(`Cleaner with name ${name} started successfully.`);
        },
        (error) => {
          console.error('Error starting cleaner:', JSON.stringify(error));
          // console.log("evo teksta :::: " + error.error.text);
          if (error && error.error && error.error.text) {
            const text: string = error.error.text.toLowerCase();
            let errorMessage = new ErrorMessage(0, null, null, "START", text);
            this.userService.createErrorMessage(errorMessage).subscribe(
              () => {
                
              },
              (error) => {
                console.log("Error while creating a message: ", error);
              }
            )
          } else if (error && error.error) {
            const text: string = error.error.toLowerCase();
            let errorMessage = new ErrorMessage(0, null, null, "START", text);
            this.userService.createErrorMessage(errorMessage).subscribe(
              () => {
                
              },
              (error) => {
                console.log("Error while creating a message: ", error);
              }
            )
          }
        }
      );
  }

  stopCleaner(cleanerId: number) {
    const email = this.userService.getCurrentEmail();
    this.cleanerService.stopCleaner(cleanerId, email).subscribe(
      () => {
            console.log(`Cleaner with name ${name} stopped successfully.`);
        },
        (error) => {
          console.error('Error stopping cleaner:', JSON.stringify(error));
          if (error && error.error && error.error.text) {
            const text: string = error.error.text.toLowerCase();
            let errorMessage = new ErrorMessage(0, null, null, "STOP", text);
            this.userService.createErrorMessage(errorMessage).subscribe(
              () => {
                
              },
              (error) => {
                console.log("Error while creating a message: ", error);
              }
            )
          } else if (error && error.error) {
            const text: string = error.error.toLowerCase();
            let errorMessage = new ErrorMessage(0, null, null, "STOP", text);
            this.userService.createErrorMessage(errorMessage).subscribe(
              () => {
                
              },
              (error) => {
                console.log("Error while creating a message: ", error);
              }
            )
          }
        }
      );
  }

  dischargeCleaner(cleanerId: number) {
    const email = this.userService.getCurrentEmail();
    this.cleanerService.dischargeCleaner(cleanerId, email).subscribe(
      () => {
            console.log(`Cleaner with name ${name} discharged successfully.`);
        },
        (error) => {
          console.error('Error discharging cleaner:', JSON.stringify(error));
          if (error && error.error && error.error.text) {
            const text: string = error.error.text.toLowerCase();
            let errorMessage = new ErrorMessage(0, null, null, "DISCHARGE", text);
            this.userService.createErrorMessage(errorMessage).subscribe(
              () => {
                
              },
              (error) => {
                console.log("Error while creating a message: ", error);
              }
            )
          } else if (error && error.error) {
            const text: string = error.error.toLowerCase();
            let errorMessage = new ErrorMessage(0, null, null, "DISCHARGE", text);
            this.userService.createErrorMessage(errorMessage).subscribe(
              () => {
                
              },
              (error) => {
                console.log("Error while creating a message: ", error);
              }
            )
          }
        }
      );
  }
  
  eraseCleaner(name: string, cleanerId: number) {
    const confirmDelete = confirm(`Are you sure you want to delete the cleaner with name ${name}?`);
    if (confirmDelete) {
      this.cleanerService.deleteCleaner(cleanerId).subscribe(
        () => {
              console.log(`Cleaner with name ${name} deleted successfully.`);
              const deletedCleanerIndex = this.allCleaners.findIndex(cleaner => cleaner.id === cleanerId);
              if (deletedCleanerIndex !== -1) {
                  this.allCleaners[deletedCleanerIndex].active = false;
              }
          },
          (error) => {
            let errorMessage = new ErrorMessage(0, null, null, error.name, error.message);
            // console.log("Usao ::: " + error.name + " iii " + error.message);
            this.userService.createErrorMessage(errorMessage);
            console.error('Error deleting cleaner:', error);
          }
        );
    }
  }

  ngOnInit(): void {
    this.loadCleaners();
      // Polling every 5 seconds (adjust interval as needed)
    setInterval(() => {
      this.loadCleaners();
    }, 5000); // 5000 milliseconds = 5 seconds
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
