import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CleanerHistoryComponent } from './components/cleaner-history/cleaner-history.component';
import { CleanerSearchComponent } from './components/cleaner-search/cleaner-search.component';
import { AddCleanerComponent } from './components/add-cleaner/add-cleaner.component';
import { NumberInputDialogComponent } from './components/number-input-dialog/number-input-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ScheduleCleanerComponent } from './components/schedule-cleaner/schedule-cleaner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    EditUserComponent,
    CreateUserComponent,
    CleanerSearchComponent,
    AddCleanerComponent,
    CleanerHistoryComponent,
    NumberInputDialogComponent,
    ScheduleCleanerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
