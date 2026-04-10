export const ERROR_MESSAGE = {
  messages : {
    'AUT-001': 'Invalid credentials, please try again.',
    'default': 'Unexpected error, please try again later.',
  } as Record<string, string>,

  getDefault(): string {
    return 'Unexpected error, please try again later.';
  },

  fromCode(errorCode: string | undefined | null): string {
    if (errorCode && this.messages[errorCode]) {
      return this.messages[errorCode];
    }

    return this.getDefault();
  },
};
