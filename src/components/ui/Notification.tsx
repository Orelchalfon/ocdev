import { FC } from "react";
import "../../styles/notification.css"; // Import the CSS for animations

export interface NotificationProps {
  classNames: string;
  icon?: string;
  emoji?: string;
  message?: string;
}

const Notification: FC<NotificationProps> = ({
  classNames,
  icon,
  emoji = "📧",
  message,
}) => {
  const classes = `notification ${classNames}`;
  const defaultSuccessMessage = "Your message has been sent!";
  const defaultErrorMessage = "Failed to send message!";

  const displayMessage =
    message ||
    (classes.includes("success") ? defaultSuccessMessage : defaultErrorMessage);

  return (
    <div className={classes}>
      <div className='notification-body'>
        <p>{emoji}</p>
        <h2>{displayMessage}</h2>
        {icon && (
          <img
            src={icon}
            className='notification-icon'
            alt='notification icon'
          />
        )}
      </div>
      <div className='notification-progress' />
    </div>
  );
};

export default Notification;
