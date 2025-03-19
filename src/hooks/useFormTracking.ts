import { useCallback } from "react";
import analyticsService from "../utils/Analytics/analytics";

const useFormTracking = (formName: string, formId?: string) => {
  const handleFormStart = useCallback(() => {
    analyticsService.trackFormEvent({
      formName,
      formId,
      action: 'start'
    });
  }, [formName, formId]);

  const handleFormStep = useCallback((stepName: string) => {
    analyticsService.trackFormEvent({
      formName,
      formId,
      formStep: stepName,
      action: 'step'
    });
  }, [formName, formId]);

  const handleFormComplete = useCallback(() => {
    analyticsService.trackFormEvent({
      formName,
      formId,
      action: 'complete'
    });
  }, [formName, formId]);

  const handleFormError = useCallback(() => {
    analyticsService.trackFormEvent({
      formName,
      formId,
      action: 'error'
    });
  }, [formName, formId]);

  return {
    onFormStart: handleFormStart,
    onFormStep: handleFormStep,
    onFormComplete: handleFormComplete,
    onFormError: handleFormError
  };
};
export default useFormTracking