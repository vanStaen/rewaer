import { action, makeObservable, observable } from "mobx";

export class PageStore {
  showFloatingForm = null;
  showOnlyFloatingForm = null;
  windowInnerHeight = null;
  windowInnerWidth = null;

  constructor() {
    makeObservable(this, {
      showFloatingForm: observable,
      setShowFloatingForm: action,
      showOnlyFloatingForm: observable,
      setShowOnlyFloatingForm: action,
      windowInnerHeight: observable,
      setWindowInnerHeight: action,
      windowInnerWidth: observable,
      setWindowInnerWidth: action,
    });
  }

  setShowFloatingForm = (showFloatingForm) => {
    this.showFloatingForm = showFloatingForm;
  };

  setShowOnlyFloatingForm = (showOnlyFloatingForm) => {
    this.showOnlyFloatingForm = showOnlyFloatingForm;
  };

  setWindowInnerHeight = (windowInnerHeight) => {
    this.windowInnerHeight = windowInnerHeight;
  };

  setWindowInnerWidth = (windowInnerWidth) => {
    this.windowInnerWidth = windowInnerWidth;
  };
}

export const pageStore = new PageStore();
