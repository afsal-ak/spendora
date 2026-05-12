import { resend } from "./resend";

export function getResend() {
  if (!resend) {
    throw new Error(
      "Resend is not configured"
    );
  }

  return resend;
}