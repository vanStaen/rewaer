import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Notifications } from './Notifications';
import { pageStore } from '../../stores/pageStore/pageStore';
import { postNotificationsSeen } from './postNotificationsSeen';

// Mock external dependencies
jest.mock('./postNotificationsSeen');
jest.mock('../../stores/pageStore/pageStore', () => ({
  pageStore: {
    notifications: [],
    setUnseenNotificationsCount: jest.fn()
  }
}));

jest.mock('./Notification', () => ({
  Notification: ({ data }: { data: any }) => (
    <div data-testid={`notification-${data.id}`}>
      Notification {data.id}
    </div>
  )
}));

const mockPostNotificationsSeen = postNotificationsSeen as jest.MockedFunction<typeof postNotificationsSeen>;

const mockNotifications = [
  {
    id: '1',
    type: 1,
    seen: false,
    title: 'testuser',
    createdAt: '2023-01-01T10:00:00Z',
    mediaUrl: 'https://example.com/avatar.jpg',
    actionData: 123
  },
  {
    id: '2',
    type: 2,
    seen: true,
    title: 'anotheruser',
    createdAt: '2023-01-02T10:00:00Z',
    mediaUrl: 'https://example.com/avatar2.jpg',
    actionData: 456
  }
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Notifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    pageStore.notifications = [];
    mockPostNotificationsSeen.mockResolvedValue(undefined);
  });

  it('renders empty state when no notifications', () => {
    renderWithRouter(<Notifications />);
    
    expect(screen.getByText('No notification for now')).toBeInTheDocument();
  });

  it('calls postNotificationsSeen on mount', () => {
    renderWithRouter(<Notifications />);
    
    expect(mockPostNotificationsSeen).toHaveBeenCalledTimes(1);
  });

  it('calls setUnseenNotificationsCount(0) on mount', () => {
    renderWithRouter(<Notifications />);
    
    expect(pageStore.setUnseenNotificationsCount).toHaveBeenCalledWith(0);
  });

  it('renders notifications when available', () => {
    pageStore.notifications = mockNotifications;
    renderWithRouter(<Notifications />);
    
    expect(screen.getByTestId('notification-1')).toBeInTheDocument();
    expect(screen.getByTestId('notification-2')).toBeInTheDocument();
    expect(screen.queryByText('No notification for now')).not.toBeInTheDocument();
  });

  it('renders correct number of notifications', () => {
    pageStore.notifications = mockNotifications;
    renderWithRouter(<Notifications />);
    
    const notificationElements = screen.getAllByTestId(/notification-/);
    expect(notificationElements).toHaveLength(2);
  });

  it('passes correct data to Notification components', () => {
    pageStore.notifications = mockNotifications;
    renderWithRouter(<Notifications />);
    
    expect(screen.getByText('Notification 1')).toBeInTheDocument();
    expect(screen.getByText('Notification 2')).toBeInTheDocument();
  });

  it('handles single notification correctly', () => {
    pageStore.notifications = [mockNotifications[0]];
    renderWithRouter(<Notifications />);
    
    expect(screen.getByTestId('notification-1')).toBeInTheDocument();
    expect(screen.queryByTestId('notification-2')).not.toBeInTheDocument();
    expect(screen.queryByText('No notification for now')).not.toBeInTheDocument();
  });

  it('applies correct CSS class to container', () => {
    const { container } = renderWithRouter(<Notifications />);
    
    const notificationsContainer = container.querySelector('.notifications__container');
    expect(notificationsContainer).toBeInTheDocument();
  });

  it('applies correct CSS class to empty state', () => {
    renderWithRouter(<Notifications />);
    
    const emptyState = screen.getByText('No notification for now');
    expect(emptyState).toHaveClass('notification__nothing');
  });
});
