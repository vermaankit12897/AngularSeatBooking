import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular Seat Booking System';

  // Variables to track seat layout and user input
  seatsRequested: number = 0;
  totalSeats: number = 80;
  seatsPerRow: number = 7;
  seatLayout = [];
  bookedSeats: number[] = [2, 5, 8, 15]; // Example pre-booked seats

  constructor() {
    this.generateSeatLayout();
  }

  // Generate the seat layout (7 seats per row except the last row with 3 seats)
  generateSeatLayout() {
    let seatNumber = 1;
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < this.seatsPerRow; j++) {
        row.push({
          number: seatNumber,
          isBooked: this.bookedSeats.includes(seatNumber),
        });
        seatNumber++;
      }
      this.seatLayout.push(row);
    }

    // Last row with only 3 seats
    let lastRow = [];
    for (let i = 0; i < 3; i++) {
      lastRow.push({
        number: seatNumber,
        isBooked: this.bookedSeats.includes(seatNumber),
      });
      seatNumber++;
    }
    this.seatLayout.push(lastRow);
  }

  // Function to handle booking
  bookSeats() {
    let availableSeats = [];
    // Find available seats in each row
    for (let row of this.seatLayout) {
      for (let seat of row) {
        if (!seat.isBooked) {
          availableSeats.push(seat);
        }
      }
    }

    // Check if requested seats are available
    if (availableSeats.length >= this.seatsRequested) {
      for (let i = 0; i < this.seatsRequested; i++) {
        availableSeats[i].isBooked = true;
        this.bookedSeats.push(availableSeats[i].number);
      }
      alert(
        `Booked seats: ${availableSeats
          .slice(0, this.seatsRequested)
          .map((s) => s.number)
          .join(', ')}`
      );
    } else {
      alert('Not enough seats available.');
    }
  }
}
