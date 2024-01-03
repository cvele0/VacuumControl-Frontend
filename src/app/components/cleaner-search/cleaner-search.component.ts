import { Component, OnInit } from '@angular/core';
import { CleanerStatus, ErrorMessage, ErrorMessageDTO } from 'src/app/model/model';
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
  pageSize: number = 10;
  currentPage: number = 1;

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

  ngOnInit(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.loadCleaners(startIndex, endIndex);
      // Polling every 2 second (adjust interval as needed)
    setInterval(() => {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.loadCleaners(startIndex, endIndex);
    }, 2000); 
  }

  updatePagedCleaners() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.loadCleaners(startIndex, endIndex);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePagedCleaners();
  }

  listAllCleaners() : void {
    this.allCleaners = [...this.allCleanersCopy]; 
  }

  setDateDefaults() {
    const today = new Date();
    this.dateFromValue = today;
    this.dateToValue = today;
  }

  loadCleaners(startIndex: number, endIndex: number): void {
    this.cleanerService.getCleaners(startIndex, endIndex).subscribe(
      (data) => {
      this.allCleaners = data;
      this.allCleanersCopy = [...this.allCleaners]; // deep copy
      this.updatePagedCleaners();
    }, (error) => {
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
          // LEAVE IF WANT
          // console.error('Error starting cleaner:', JSON.stringify(error));

          // console.log("evo teksta :::: " + error.error.text);
          if (error && error.error && error.error.text) {
            const text: string = error.error.text.toLowerCase();
            let errorMessage = new ErrorMessageDTO("START", text, cleanerId);
            this.userService.createErrorMessage(errorMessage).subscribe(
              () => {
                
              },
              (error) => {
                console.log("Error while creating a message: ", error);
              }
            )
          } else if (error && error.error) {
            const text: string = error.error.toLowerCase();
            let errorMessage = new ErrorMessageDTO("START", text, cleanerId);
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
          // console.error('Error stopping cleaner:', JSON.stringify(error));
          if (error && error.error && error.error.text) {
            const text: string = error.error.text.toLowerCase();
            let errorMessage = new ErrorMessageDTO("STOP", text, cleanerId);
            this.userService.createErrorMessage(errorMessage).subscribe(
              () => {
                
              },
              (error) => {
                console.log("Error while creating a message: ", error);
              }
            )
          } else if (error && error.error) {
            const text: string = error.error.toLowerCase();
            let errorMessage = new ErrorMessageDTO("STOP", text, cleanerId);
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
          // console.error('Error discharging cleaner:', JSON.stringify(error));
          if (error && error.error && error.error.text) {
            const text: string = error.error.text.toLowerCase();
            let errorMessage = new ErrorMessageDTO("DISCHARGE", text, cleanerId);
            this.userService.createErrorMessage(errorMessage).subscribe(
              () => {
                
              },
              (error) => {
                console.log("Error while creating a message: ", error);
              }
            )
          } else if (error && error.error) {
            const text: string = error.error.toLowerCase();
            let errorMessage = new ErrorMessageDTO("DISCHARGE", text, cleanerId);
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
            let errorMessage = new ErrorMessageDTO(error.name, error.message, cleanerId);
            // console.log("Usao ::: " + error.name + " iii " + error.message);
            this.userService.createErrorMessage(errorMessage);
            console.error('Error deleting cleaner:', error);
          }
        );
    }
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
