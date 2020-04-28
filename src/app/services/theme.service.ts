//theme of the app
import { Injectable, RendererFactory2, Inject, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(Document) private document: Document ) 
  { 
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  // enableDark(){
  //   this.renderer.addClass(this.document.body, 'dark-theme');
  // }

  // enableLight(){
  //   this.renderer.removeClass(this.document.body, 'dark-theme');
  // }

}

