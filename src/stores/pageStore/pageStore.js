import { action, makeObservable, observable } from "mobx";
import { getNotifications } from "./getNotifications";

export class PageStore {
  showFloatingUploadForm = null;
  showOnlyFloatingUploadForm = null;
  windowInnerHeight = null;
  windowInnerWidth = null;
  quickEdit = false;
  showFilter = false;
  notifications = [];
  messages = [];
  unseenNotificationsCount = 0;

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
      notifications: observable,
      setNotifications: action,
      messages: observable,
      setMessages: action,
      unseenNotificationsCount: observable,
      setUnseenNotificationsCount: action,
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

  setNotifications = (notifications) => {
    this.notifications = notifications;
  };

  setMessages = (messages) => {
    this.messages = messages;
  };

  setUnseenNotificationsCount = (unseenNotificationsCount) => {
    this.unseenNotificationsCount = unseenNotificationsCount;
  };

  fetchNotifications = async () => {
    try {
      const result = await getNotifications();
      this.setNotifications(result);
      const unSeenCount = result.filter(notif => notif.seen === false).length;
      this.setUnseenNotificationsCount(unSeenCount);
    } catch (e) {
      console.log("error loading notification: ", e);
    }
  };

}

export const pageStore = new PageStore();
