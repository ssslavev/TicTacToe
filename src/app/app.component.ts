import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

const winTable = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  boxes: HTMLElement[] = [];
  board: any = ['', '', '', '', '', '', '', '',];
  currentPlayer = 'X';
  playerWin: boolean = false;
  playerXColor = Math.floor(Math.random() * 10000).toString(16);
  playerOColor = Math.floor(Math.random() * 10000).toString(16);
  isGameEqual: boolean = false;
  playerXScore: number = 0;
  playerOScore: number = 0;

  @ViewChild('container') container!: ElementRef;
  @ViewChild('playerX') playerX!: ElementRef;
  @ViewChild('playerO') playerO!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.playerX.nativeElement.style.color = '#' + this.playerXColor;
    this.playerO.nativeElement.style.color = '#' + this.playerOColor;
    this.boxes = Array.from(this.container.nativeElement.children);
    this.boxes.forEach((box, index) => {
      box.addEventListener('click', () => {
        if (box.innerText === 'X' || box.innerText === 'O') {
          return;
        } else {
          box.style.color = this.currentPlayer == 'X' ? '#' + this.playerXColor : '#' + this.playerOColor;
          box.innerText = this.currentPlayer;
          this.board[index] = this.currentPlayer;
          this.playerWin = false;
          for (let i = 0; i <= 7; i++) {
            const winOption = winTable[i];
            const a = this.board[winOption[0]];
            const b = this.board[winOption[1]];
            const c = this.board[winOption[2]];
            if (a === '' || b === '' || c === '') {

              continue;
            }
            if (a === b && b === c) {
              this.playerWin = true;
              if (this.currentPlayer === 'X') {
                this.playerXScore++;
              } else {
                this.playerOScore++;
              }
              this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
              break;
            }


            if (this.playerWin) {
              return;
            }

            if (!this.board.includes('')) {
              this.isGameEqual = true;
              console.log(this.isGameEqual);

            }
          }

          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'

        }
      })

    })
  }

  ngOnInit(): void {
  }

  reset() {
    this.board = ['', '', '', '', '', '', '', '',];
    this.playerWin = false;
    this.isGameEqual = false;
    if (this.currentPlayer === 'O') {
      this.currentPlayer = 'X'
    }

    this.boxes.forEach(tile => {
      tile.innerText = '';
    });
    this.playerXColor = Math.floor(Math.random() * 10000).toString(16);
    this.playerOColor = Math.floor(Math.random() * 10000).toString(16);
    this.playerX.nativeElement.style.color = '#' + this.playerXColor;
    this.playerO.nativeElement.style.color = '#' + this.playerOColor;
  }




}
