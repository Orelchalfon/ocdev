import React, { ComponentType, useCallback } from "react";
import analyticsService from "../../utils/Analytics/analytics";

interface WithFormTrackingProps {
  formName: string;
  formId?: string;
}

// Types for form tracking event handlers that will be injected into components
export interface FormTrackingHandlers {
  onFormStart: () => void;
  onFormStep: (stepName: string) => void;
  onFormComplete: () => void;
  onFormError: () => void;
}

/**
 * Higher-Order Component for form tracking
 * Injects form tracking event handlers into wrapped components
 *
 * @example
 * const ContactForm = ({ onFormStart, onFormComplete }) => {
 *   // Use the injected handlers in your form
 *   return <form onFocus={onFormStart} onSubmit={onFormComplete}>...</form>
 * }
 *
 * // Wrap your form component with WithFormTracking
 * export default WithFormTracking(ContactForm);
 *
 * // Then use it with form tracking props
 * <EnhancedContactForm formName="Contact Form" formId="contact-form" />
 */
const WithFormTracking = <P extends object>(
  WrappedComponent: ComponentType<P & FormTrackingHandlers>
) => {
  // Return a new component that includes the form tracking functionality
  const WithFormTrackingComponent = ({
    formName,
    formId,
    ...props
  }: WithFormTrackingProps & Omit<P, keyof FormTrackingHandlers>) => {
    // Create callback handlers for form events
    const handleFormStart = useCallback(() => {
      analyticsService.trackFormEvent({
        formName,
        formId,
        action: "start",
      });
    }, [formName, formId]);

    const handleFormStep = useCallback(
      (stepName: string) => {
        analyticsService.trackFormEvent({
          formName,
          formId,
          formStep: stepName,
          action: "step",
        });
      },
      [formName, formId]
    );

    const handleFormComplete = useCallback(() => {
      analyticsService.trackFormEvent({
        formName,
        formId,
        action: "complete",
      });
    }, [formName, formId]);

    const handleFormError = useCallback(() => {
      analyticsService.trackFormEvent({
        formName,
        formId,
        action: "error",
      });
    }, [formName, formId]);

    // Combine the tracking handlers with the original props
    const formTrackingHandlers: FormTrackingHandlers = {
      onFormStart: handleFormStart,
      onFormStep: handleFormStep,
      onFormComplete: handleFormComplete,
      onFormError: handleFormError,
    };

    // Pass both the original props and the tracking handlers to the wrapped component
    return <WrappedComponent {...(props as P)} {...formTrackingHandlers} />;
  };

  // Display name for debugging
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithFormTrackingComponent.displayName = `WithFormTracking(${wrappedComponentName})`;

  return WithFormTrackingComponent;
};

export default WithFormTracking;
