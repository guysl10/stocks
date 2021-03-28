import { useEffect } from 'react';
import Noty from 'noty';
import { useSelector } from 'react-redux';

import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';

function Notification() {
  const notification = useSelector((state) => state.notificationState.notification);

  useEffect(() => {
    if (!notification.message) {
      return;
    }
    new Noty({
      text: notification.message,
      layout: 'topRight',
      theme: 'mint',
      type: notification.type,
      timeout: notification.timeout || 4000,
    }).show();
  }, [notification]);
  return null;
}

export default Notification;
