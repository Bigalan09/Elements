import { Component, Host, h, Event, EventEmitter, Method, Prop, Element, State } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'el-toast',
  styleUrl: 'toast.css',
  shadow: true,
})
export class Toast {
  @Prop() size?: 'small' | 'default' | 'large' = 'default';

  @Prop() variant?: 'primary' | 'secondary' | 'tertiary' = 'primary';

  @Prop({ mutable: true, reflect: true }) opened?: boolean;

  @Prop() positionTop?: number = 12;
  
  @Prop() positionRight?: number = 12;
  
  @Prop() fadeDuration?: number = 700;

  @Event({ eventName: 'el-toast-closed' }) toastClosed: EventEmitter<void>;

  @State() progress: number = 0;
  @State() toastHeightWithOffset: number = 0;

  @Element() element: HTMLElement;

  hideToast: boolean = false;
  timerId = null;

  @Method()
  async open() {
    this.opened = true;
    this.hideToast = false;
  }

  disconnectedCallback() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
      this.opened = false;
      this.progress = 0;
    }
  }

  close = () => {
    clearInterval(this.timerId);
    this.hideToast = true;
    setTimeout(() => {
      this.timerId = null;
      this.opened = false;
      this.progress = 0;
      this.toastClosed.emit();
    }, this.fadeDuration);
  };

  setToastTimeout = () => {
    if (this.opened && !this.timerId) {
      this.timerId = setInterval(() => {
        this.progress += 1 / (2000 / 1000);
        if (this.progress >= 100) {
          this.close();
        }
      }, 10);
    }
  };

  render() {
    this.setToastTimeout();
    return (
      <Host>
        <style>{this.transitions(this.toastHeightWithOffset)}</style>
        <style>{this.animationStyle(this.toastHeightWithOffset)}</style>
        <div class={this.getCssClassMap()} part={this.getBasePartMap()}>
          <slot></slot>
        </div>
      </Host>
    );
  }

  transitions = (offset) => `
    @keyframes fadeIn {
      from {
        opacity: 0;
        top: -${offset}px;
      }
      to {
        opacity: 1;
        top: ${this.positionTop}px;
      }
    }
    @keyframes fadeOut {
      from {
        opacity: 1;
        top: ${this.positionTop}px;
      }
      to {
        opacity: 0;
        top: -${offset}px;
      }
    }
  `;

  animationStyle = (offset) => {
    return `
      .toast--show {
        right: ${this.positionRight}px;
        animation: fadeIn ${this.fadeDuration / 1000}s ease-in-out;
        top: ${this.positionTop}px;
        opacity: 1;
      },
      .toast--show {
        right: ${this.positionRight}px;
        animation: fadeOut ${this.fadeDuration / 1000}s ease-in-out;
        top: -${offset}px;
        opacity: 0;
      }
    `;
  };

  getToastHeightWithOffset() {
    const toastHeight = this.element.shadowRoot.querySelector('.toast')
      .scrollHeight;
    this.toastHeightWithOffset = toastHeight + this.positionTop;
  }

  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }

  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }

  getCssOrBasePartMap(mode: 'basePart' | 'css') {
    const componentname = 'toast';
    const prefix = mode === 'basePart' ? '' : componentname;

    return classNames(
      mode === 'basePart' ? 'base' : componentname,
      this.size && `${prefix}--size-${this.size}`,
      this.variant && `${prefix}--variant-${this.variant}`,
      !!this.opened && `${prefix}--opened`,
      !!!this.hideToast && `${prefix}--show`,
      !!this.hideToast && `${prefix}--hide`,
    );
  }
}
