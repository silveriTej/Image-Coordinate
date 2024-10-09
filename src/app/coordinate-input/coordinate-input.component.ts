import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-coordinate-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coordinate-input.component.html',
  styleUrl: './coordinate-input.component.css',
})
export class CoordinateInputComponent implements OnInit {
  // Define hardcoded coordinates
  coordinates = [
    { x1: 50, y1: 50, x2: 150, y2: 150 }, // Coordinates for a filled rectangle
    { x1: 200, y1: 200, x2: 300, y2: 300 }, 
  ];

  @Output() coordinatesChanged = new EventEmitter<
    { x1: number; y1: number; x2: number; y2: number }[]
  >();

  ngOnInit(): void {
    // Emit the hardcoded coordinates
    this.coordinatesChanged.emit(this.coordinates);
  }
}