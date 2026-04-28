import nodemailer from 'nodemailer';
import config from '../config';
import path from 'path';
import ejs from 'ejs';
import { logger } from '../../shared/logger';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: Number(config.email.port),
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

type TSendEmail = {
  to: string;
  subject: string;
  tempName: string;
  tempData?: Record<string, any>;
  attachments?: {
    fileName: string;
    content: Buffer | string;
    contentType: string;
  }[];
};

export const sendEmail = async ({
  to,
  subject,
  tempName,
  tempData,
  attachments,
}: TSendEmail) => {
  try {
    const tempPath = path.join(__dirname, `templates/${tempName}.ejs`);
    const html = await ejs.renderFile(tempPath, tempData);
    const info = await transporter.sendMail({
      from: `"ReadyMart" <${config.email.from}>`,
      to,
      subject,
      html,
      attachments: attachments?.map((x) => ({
        filename: x.fileName,
        content: x.content,
        contentType: x.contentType,
      })),
    });
    logger.info(`Email sent to ${to}: ${info.messageId}`);
  } catch (err) {
    logger.error(`Email send failed to ${to}: ${err}`);
  }
};