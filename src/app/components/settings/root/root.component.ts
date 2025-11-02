import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { SettingSidebarComponent } from '../setting-sidebar/setting-sidebar.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SettingSidebarComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent {

}
