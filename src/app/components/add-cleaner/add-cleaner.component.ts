import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cleaner } from 'src/app/model/model';
import { CleanerService } from 'src/app/services/cleaner-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-cleaner',
  templateUrl: './add-cleaner.component.html',
  styleUrls: ['./add-cleaner.component.css']
})
export class AddCleanerComponent {
  newCleaner: Cleaner = new Cleaner(0, '', '', null); // Initialize a new cleaner

  constructor(private cleanerService: CleanerService, private router: Router,
    private userService: UserService) {}

  createCleaner(): void {
    this.cleanerService.createCleaner(this.newCleaner).subscribe(
      (createdCleaner: Cleaner) => {
        // Handle successful creation, e.g., show a success message
        console.log('Cleaner created:', createdCleaner);
        if (this.userService.userHasPermissionToSearchVacuum()) {
          this.router.navigate(['search-cleaner']);
        }
      },
      (error) => {
        // Handle error, e.g., display an error message
        console.error('Error creating cleaner:', error);
        // Optionally, show an error message to the user
      }
    );
  }
}
