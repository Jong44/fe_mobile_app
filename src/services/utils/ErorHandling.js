export const handleApiError = (error) => {
    if (error.response) {
      const { status, data } = error.response;
      return {
        status,
        message: data?.message || 'An error occurred',
      };
    } else if (error.request) {
      return {
        status: null,
        message: 'No response from server. Please try again later.',
      };
    } else {
      return {
        status: null,
        message: error.message || 'An unexpected error occurred.',
      };
    }
  };