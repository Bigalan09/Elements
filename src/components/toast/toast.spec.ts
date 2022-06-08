import { newSpecPage } from '@stencil/core/testing';
import { Toast } from './toast';

describe('el-toast', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [Toast],
      html: '<el-toast></el-toast>',
    });
    expect(root).toEqualHtml(`<el-toast>
    <mock:shadow-root>
      <style>
        @keyframes fadeIn {
      from {
        opacity: 0;
        top: -0px;
      }
      to {
        opacity: 1;
        top: 12px;
      }
    }
    @keyframes fadeOut {
      from {
        opacity: 1;
        top: 12px;
      }
      to {
        opacity: 0;
        top: -0px;
      }
    }
    </style>
    <style>
      .toast--show {
        right: 12px;
        animation: fadeIn 0.7s ease-in-out;
        top: 12px;
        opacity: 1;
      },
      .toast--show {
        right: 12px;
        animation: fadeOut 0.7s ease-in-out;
        top: -0px;
        opacity: 0;
      }
      </style>
      <div class="toast toast--show toast--size-default toast--variant-primary" part="base --size-default --variant-primary --show">
        <slot></slot>
      </div>
    </mock:shadow-root>
  </el-toast>`);
  });

  it('renders with value', async () => {
    const { root } = await newSpecPage({
      components: [Toast],
      html: '<el-toast>Hello World!</el-toast>',
    });
    expect(root).toEqualHtml(`<el-toast>
    <mock:shadow-root>
      <style>
        @keyframes fadeIn {
      from {
        opacity: 0;
        top: -0px;
      }
      to {
        opacity: 1;
        top: 12px;
      }
    }
    @keyframes fadeOut {
      from {
        opacity: 1;
        top: 12px;
      }
      to {
        opacity: 0;
        top: -0px;
      }
    }
    </style>
    <style>
      .toast--show {
        right: 12px;
        animation: fadeIn 0.7s ease-in-out;
        top: 12px;
        opacity: 1;
      },
      .toast--show {
        right: 12px;
        animation: fadeOut 0.7s ease-in-out;
        top: -0px;
        opacity: 0;
      }
      </style>
      <div class="toast toast--show toast--size-default toast--variant-primary" part="base --size-default --variant-primary --show">
        <slot></slot>
      </div>
    </mock:shadow-root>
    Hello World!
  </el-toast>`);
  });
});
