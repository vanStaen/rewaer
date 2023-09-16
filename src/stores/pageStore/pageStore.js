import { action, makeObservable, observable } from "mobx";

export class PageStore {
  showFloatingForm = null;
  windowInnerHeight = null;
  windowInnerWidth = null;

  constructor() {
    makeObservable(this, {
      showFloatingForm: observable,
      setShowFloatingForm: action,
      windowInnerHeight: observable,
      setWindowInnerHeight: action,
      windowInnerWidth: observable,
      setWindowInnerWidth: action,
    });
  }

  setShowFloatingForm = (showFloatingForm) => {
    this.showFloatingForm = showFloatingForm;
  };

  setWindowInnerHeight = (windowInnerHeight) => {
    this.windowInnerHeight = windowInnerHeight;
  };

  setWindowInnerWidth = (windowInnerWidth) => {
    this.windowInnerWidth = windowInnerWidth;
  };
}

export const pageStore = new PageStore();
