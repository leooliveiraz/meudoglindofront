import { HostListener, Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  innerWidth:any;
  @Input() estaLogado: boolean;

  constructor() { }
  ngOnInit() {
  }

  fecharMenu() {
    if (innerWidth < 1200 ) {
      document.getElementById("btn-sidenav").click();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

}
