import API from '../../../../shared/API';

// eslint-disable-next-line import/prefer-default-export
export const feedbackService = (body) => API({
  body,
  method: 'post',
  url: '/v1/feedbacks',
  successMessage: 'Your feedback is submitted successfully.',
  errorMessage: 'Error in submitting the feedback.',
});
