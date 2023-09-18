import { action, makeObservable, observable } from "mobx";

export class PageStore {
  showFloatingForm = null;
  showOnlyFloatingForm = null;
  windowInnerHeight = null;
  windowInnerWidth = null;
  quickEdit = false;
  showFilter = false;

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
      quickEdit: observable,
      setQuickEdit: action,
      showFilter: observable,
      setShowFilter: action,
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

  setQuickEdit = (quickEdit) => {
    this.quickEdit = quickEdit;
  };

  setShowFilter = (showFilter) => {
    this.showFilter = showFilter;
  };
}

export const pageStore = new PageStore();
