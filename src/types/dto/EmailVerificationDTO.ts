export interface EmailVerificationSendRequest {
  email: string;
}

export interface EmailVerificationVerifyRequest {
  email: string;
  verificationCode: string;
}

