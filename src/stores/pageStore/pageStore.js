import { action, makeObservable, observable } from "mobx";

export class PageStore {
  showFloatingUploadForm = null;
  showOnlyFloatingUploadForm = null;
  windowInnerHeight = null;
  windowInnerWidth = null;
  quickEdit = false;
  showFilter = false;

  constructor() {
    makeObservable(this, {
      showFloatingUploadForm: observable,
      setShowFloatingUploadForm: action,
      showOnlyFloatingUploadForm: observable,
      setShowOnlyFloatingUploadForm: action,
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

  setShowFloatingUploadForm = (showFloatingUploadForm) => {
    this.showFloatingUploadForm = showFloatingUploadForm;
  };

  setShowOnlyFloatingUploadForm = (showOnlyFloatingUploadForm) => {
    this.showOnlyFloatingUploadForm = showOnlyFloatingUploadForm;
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
