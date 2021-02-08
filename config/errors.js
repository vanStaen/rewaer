exports.errorName = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    INVALID_EMAIL: 'INVALID_EMAIL',
    EMAIL_ALREADY_IN_USE: 'EMAIL_ALREADY_IN_USE',
  }
  
  exports.errorType = {
    UNAUTHORIZED: {
      message: 'Unauthenticated!',
      statusCode: 401,
    },
    INVALID_EMAIL: {
      message: 'The email is not valid!',
      statusCode: 400,
    },
    EMAIL_ALREADY_IN_USE: {
      message: "There is already an account associated to this email.",
      statusCode: 401,
    },
  }