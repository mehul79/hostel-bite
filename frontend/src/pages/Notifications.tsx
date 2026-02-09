import { useState, useEffect } from 'react';
import { Bell, Check } from 'lucide-react';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { cn } from '@/lib/utils';

interface Notification {
  _id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    _id: '1',
    title: 'Order Confirmed',
    body: 'Your order #ABC123 has been confirmed and is being prepared.',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Order Ready',
    body: 'Your order #XYZ789 is ready for pickup!',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    _id: '3',
    title: 'Welcome to HostelBite!',
    body: 'Thanks for signing up. Explore our menu and place your first order.',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<Notification[]>(ENDPOINTS.NOTIFICATIONS.MINE);
      if (response.data) {
        setNotifications(response.data);
      } else {
        setNotifications(MOCK_NOTIFICATIONS);
      }
    } catch {
      setNotifications(MOCK_NOTIFICATIONS);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.patch(ENDPOINTS.NOTIFICATIONS.MARK_READ(id), {});
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    }
  };

  const formatDate = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  if (isLoading) {
    return (
      <div className="container-wide py-8">
        <h1 className="text-2xl font-bold text-foreground mb-8">Notifications</h1>
        <LoadingSkeleton variant="list" count={5} />
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="container-wide py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-muted-foreground">{unreadCount} unread</p>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Bell className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">No notifications</h2>
          <p className="text-muted-foreground">You're all caught up!</p>
        </div>
      ) : (
        <div className="max-w-2xl space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={cn(
                'rounded-xl border p-4 transition-colors',
                notification.read
                  ? 'border-border bg-card'
                  : 'border-primary/20 bg-primary/5'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{notification.title}</h3>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.body}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
                
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    aria-label="Mark as read"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
