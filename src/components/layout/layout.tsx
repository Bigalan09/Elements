import { Component, Host, h, Element, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'el-layout',
  styleUrl: 'layout.css',
  shadow: true,
})
export class Layout {
  @Element() element: HTMLElement;

  @Prop() center: boolean = false;

  @Prop() margin: 'auto' | 'none' = 'auto';

  @Prop() middle: boolean = false;

  hasTopSlot: boolean = false;
  hasMainSlot: boolean = false;
  hasSidebarSlot: boolean = false;

  checkSlot() {
    this.hasTopSlot = this.element.querySelector(`*[slot='top']`) !== null;
    this.hasMainSlot = this.element.querySelector(`*[slot='main']`) !== null;
    this.hasSidebarSlot = this.element.querySelector(`*[slot='sidebar']`) !== null;
  }

  render() {
    /// this.checkSlot();
    console.log("top:", this.hasTopSlot, "- main:", this.hasMainSlot, "- sidebar:", this.hasSidebarSlot);
    return (
      <Host>
        <div class="el-layout-top">
          <div class="el-layout-top-wrapper">
            <slot name="top"></slot>
          </div>
        </div>
        <div class={this.getLayoutCssClassMap()}>
          <aside class="el-sidebar">
            <slot name="sidebar"></slot>
          </aside>
          <main class="el-main">
            <slot name="main"></slot>
          </main>
        </div>
      </Host>
    );
  }

  getLayoutCssClassMap() {
    return classNames('el-layout');
  }
}
