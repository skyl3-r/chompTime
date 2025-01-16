import { db } from "@vercel/postgres";
import nodemailer from "nodemailer";

const client = await db.connect();

async function getMeetings() {
  const result = await client.sql`
    SELECT id, title, date, time, participants FROM meetings;
  `;
  return result.rows;
}

async function addMeeting({ title, date, time, participants }) {
  const participantList = participants.join(", ");
  const result = await client.sql`
    INSERT INTO meetings (title, date, time, participants)
    VALUES (${title}, ${date}, ${time}, ${participantList})
    RETURNING *;
  `;
  scheduleNotifications(result.rows[0]);
  return result.rows[0];
}

async function deleteMeeting(id) {
  await client.sql`
    DELETE FROM meetings WHERE id = ${id};
  `;
}

function scheduleNotifications(meeting) {
  const { title, date, time, participants } = meeting;
  const meetingTime = new Date(`${date}T${time}`);
  const participantEmails = participants.split(", ");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Send notifications 24 hours before
  const timeBefore24Hours = new Date(meetingTime.getTime() - 24 * 60 * 60 * 1000);
  setTimeout(() => {
    participantEmails.forEach((email) => {
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Reminder: ${title} (24 hours away)`,
        text: `Your meeting "${title}" is scheduled for ${date} at ${time}.`,
      });
    });
  }, timeBefore24Hours.getTime() - Date.now());

  // Send notifications 1 hour before
  const timeBefore1Hour = new Date(meetingTime.getTime() - 1 * 60 * 60 * 1000);
  setTimeout(() => {
    participantEmails.forEach((email) => {
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Reminder: ${title} (1 hour away)`,
        text: `Your meeting "${title}" is scheduled for ${date} at ${time}.`,
      });
    });
  }, timeBefore1Hour.getTime() - Date.now());
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const meetings = await getMeetings();
      res.status(200).json(meetings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const meeting = await addMeeting(req.body);
      res.status(201).json(meeting);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      await deleteMeeting(id);
      res.status(200).json({ message: "Meeting deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}