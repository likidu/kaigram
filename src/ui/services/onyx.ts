import type { Alert, BaseSettings, ContextMenu, Dialog, Toast } from '../models';
import { alert, appMenu, contextMenu, dialog, settings, toaster } from '../stores';

export class Onyx {
  static init(settings: Partial<BaseSettings>) {
    this.settings.update(settings);
  }

  // Settings
  static settings = {
    async update(data: Partial<BaseSettings>) {
      settings.update(data);
    },
  };

  // App Menu
  static appMenu = {
    async open() {
      await contextMenu.close();
      await appMenu.open();
    },

    close() {
      appMenu.close();
    },
  };

  // Context Menu
  static contextMenu = {
    async open(menu: ContextMenu) {
      await appMenu.close();
      await contextMenu.open(menu);
    },

    close() {
      contextMenu.close();
    },

    reset() {
      contextMenu.reset();
    },
  };

  // Toaster
  static toaster = {
    show(toast: Toast) {
      toaster.showToast(toast);
    },

    reset() {
      toaster.reset();
    },
  };

  // Alert
  static alert = {
    show(data: Alert) {
      alert.open(data);
    },

    reset() {
      alert.reset();
    },
  };

  // Dialog
  static dialog = {
    show(data: Dialog) {
      dialog.open(data);
    },

    reset() {
      dialog.reset();
    },
  };
}