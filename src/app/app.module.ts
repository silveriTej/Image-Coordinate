import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { CoordinateInputComponent } from './coordinate-input/coordinate-input.component';
import { ParentComponent } from './parent/parent.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageViewerComponent,
    CoordinateInputComponent,
    ParentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
