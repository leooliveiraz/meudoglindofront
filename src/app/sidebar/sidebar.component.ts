import { HostListener, Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  innerWidth:any;
  ngOnInit() {
  }

  fecharMenu(){
    if(innerWidth < 1200 ){
      document.getElementById("btn-sidenav").click();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

}
