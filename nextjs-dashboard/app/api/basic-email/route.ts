import postmark from 'postmark';

const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!);

export async function POST(request: Request) {
    const res = await request.json();
    const {subject, body, sendto} = res;

    client.sendEmail({
        "From": 'e1156938@u.nus.edu',
        "To": sendto,
        "Subject": subject,
        "TextBody": body
    })

    return Response.json({res})
}