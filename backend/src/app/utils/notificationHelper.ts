import { prisma } from '../db_connection';

type TNotificationPayload = {
  userId: string;
  type: 'ORDER' | 'SYSTEM' | 'PROMO' | 'AUTH';
  title: string;
  body: string;
  data?: any;
};

/**
 * Send In-App Notification
 */
const sendInApp = async (payload: TNotificationPayload) => {
  return await (prisma as any).notification.create({
    data: {
      userId: payload.userId,
      type: payload.type,
      title: payload.title,
      body: payload.body,
      data: payload.data,
    },
  });
};

/**
 * Send Email Notification (Stub for nodemailer/sendgrid)
 */
const sendEmail = async (email: string, subject: string, template: string, data: any) => {
  console.log(`[EMAIL SENT] To: ${email}, Subject: ${subject}`);
  // Integration point for NodeMailer or SendGrid
};

/**
 * Send SMS Notification (Stub for Twilio/BulkSMS)
 */
const sendSMS = async (phone: string, message: string) => {
  console.log(`[SMS SENT] To: ${phone}, Message: ${message}`);
  // Integration point for SMS Gateway
};

export const notificationHelper = {
  sendInApp,
  sendEmail,
  sendSMS,
};
