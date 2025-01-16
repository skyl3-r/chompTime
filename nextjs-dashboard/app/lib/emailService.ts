import postmark from "postmark";

const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!);

export async function sendEmail({
    to, 
    subject,
    body,
}: {
    to: string;
    subject: string;
    body: string;
}) {
    try {
        await client.sendEmail({
            From: "e1156938@u.nus.edu",
            To: to,
            Subject: subject,
            TextBody: body,
        });
        console.log("Email sent successfully");
    } catch (error) {
        throw new Error("Email sending failed");
    }
}