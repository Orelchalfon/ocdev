import React, { FormEvent, ReactNode } from "react";

import WithFormTracking, {
  FormTrackingHandlers,
} from "../../utils/Analytics/withFormTracking";
interface TrackedFormProps {
  formName: string;
  formId?: string;
  children: ReactNode;
  onSubmit?: (e: FormEvent) => void;
  className?: string;
  noValidate?: boolean;
}

/**
 * Base form component that will be enhanced with tracking
 */
const BaseForm = ({
  children,
  onSubmit,
  className = "",
  noValidate = false,
  onFormStart,
  onFormComplete,
  onFormError,
}: TrackedFormProps & FormTrackingHandlers) => {
  const handleSubmit = (e: FormEvent) => {
    try {
      if (onSubmit) {
        onSubmit(e);
      }

      // If the form submission is not prevented by onSubmit
      if (!e.defaultPrevented) {
        onFormComplete();
      }
    } catch (error) {
      onFormError();
      console.error("Form submission error:", error);
    }
  };

  return (
    <form
      className={className}
      onSubmit={handleSubmit}
      onFocus={onFormStart}
      noValidate={noValidate}
    >
      {children}
    </form>
  );
};

/**
 * A form component with built-in analytics tracking
 * Tracks form start (on focus), completion (on submit), and errors
 *
 * @example
 * <TrackedForm
 *   formName="Contact Form"
 *   formId="contact-form"
 *   onSubmit={handleSubmit}
 *   className="space-y-4"
 * >
 *   <input name="name" />
 *   <button type="submit">Submit</button>
 * </TrackedForm>
 */
const TrackedForm = WithFormTracking(BaseForm);

export default TrackedForm;
