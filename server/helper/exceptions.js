exports.EXCEPTIONS = {
  InvalidAuthRequest: 'InvalidAuthRequest',
  GeneralError: 'GeneralError',
  AuthorizationFailed: 'AuthorizationFailed',
  TokenExpired: 'TokenExpired',
  InvalidToken: 'InvalidToken',
  ValidationError: 'ValidationError',
  ObjectNotFound: 'ObjectNotFound',
  ObjectAlreadyExist: 'ObjectAlreadyExist',
  AuthenticationFailed: 'AuthenticationFailed',
  Forbidden: 'Forbidden',
  DBError: 'DBError',
  UnKnownError: 'UnKnownError',
  DoesnotExistsError: 'DoesnotExistsError',
  SOAPMethodDoesNotExistError: 'SOAPMethodDoesNotExistError',
  SOAPServerConnectionError: 'SOAPServerConnectionError',
  InvalidPassword: 'InvalidPassword',
  DuplicateEntry: 'DuplicateEntry',
  LinkNotFound: 'LinkNotFound'
};

exports.EXCEPTION_MESSAGES = {
  'InvalidAuthRequest': {
    'code': '1001',
    'httpCode': '404',
    'message': '',
    'sendNotification': false,
    'log': 'log'
  },
  'GeneralError': {
    'name': 'GeneralError',
    'code': '1099',
    'message': 'I\'m sorry, something went wrong on our end. If it happens again send us feedback and we will get back to you asap.',
    'http_code': '400',
    'send_notification': 'false'
  },
  'AuthorizationFailed': {
    'code': '1002',
    'httpCode': '401',
    'message': 'Authorization Failed.',
    'sendNotification': false,
    'log': 'log'
  },
  'TokenExpired': {
    'code': '1003',
    'httpCode': '401',
    'message': '',
    'sendNotification': false,
    'log': 'log'
  },
  'ValidationError': {
    'code': '1004',
    'httpCode': '400',
    'message': '',
    'sendNotification': false,
    'log': 'log'
  },
  'ObjectNotFound': {
    'code': '1005',
    'httpCode': '404',
    'message': '',
    'sendNotification': 'false',
    'log': 'log'
  },
  'ObjectAlreadyExist': {
    'code': '1010',
    'httpCode': '404',
    'message': '',
    'sendNotification': 'false',
    'log': 'log'
  },
  'AuthenticationFailed': {
    'code': '1006',
    'httpCode': '401',
    'message': 'Invalid user email or password.',
    'sendNotification': 'false',
    'log': 'info'
  },
  'Forbidden': {
    'code': '1007',
    'httpCode': '403',
    'message': '',
    'sendNotification': 'false',
    'log': 'info'
  },
  'DBError': {
    'code': '1008',
    'httpCode': '400',
    'message': 'Server internal error.',
    'sendNotification': 'false',
    'log': 'error'
  },
  'UnKnownError': {
    'code': '1009',
    'httpCode': '500',
    'message': 'Server internal error.',
    'sendNotification': 'false',
    'log': 'error'
  },
  'DoesnotExistsError': {
    'name': 'DoesnotExistsError',
    'code': '5013',
    'Message': 'Object does not exist.',
    'http_code': '402',
    'send_notification': 'false'
  },
  'SOAPMethodDoesNotExistError': {
    'name': 'DoesnotExistsError',
    'code': '5013',
    'Message': 'Object does not exist.',
    'http_code': '402',
    'send_notification': 'false',
    'log': 'error'
  },
  'SOAPServerConnectionError': {
    'name': 'ConnectionError',
    'code': '5013',
    'Message': 'SOAP Server connection error.',
    'http_code': '402',
    'send_notification': 'false',
    'log': 'error'
  },
  'InvalidToken': {
    'code': '1003',
    'httpCode': '401',
    'message': 'The access token provided is invalid.',
    'sendNotification': false,
    'log': 'log'
  },
  'InvalidPassword': {
    'code': '1003',
    'httpCode': '401',
    'message': '',
    'sendNotification': false,
    'log': 'log'
  },
  'DuplicateEntry': {
    'name': 'DuplicateEntry',
    'code': '4007',
    'message': '{message}',
    'http_code': '400',
    'send_notification': 'false'
  },
  'LinkNotFound': {
    'name': 'LinkNotFound',
    'code': '4008',
    'message': 'Link not found.',
    'http_code': '400',
    'send_notification': 'false'
  }
};
