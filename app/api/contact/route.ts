import { NextResponse } from "next/server";
import { Resend } from "resend";
import { RateLimiterMemory } from "rate-limiter-flexible";

const resend = new Resend(process.env.RESEND_API_KEY);
const limiter = new RateLimiterMemory({ points: 3, duration: 900 }); // 3 requests per 15 min

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
  website?: string;
}

const sanitize = (str: string) =>
  String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  let body: ContactRequestBody;
  try {
    body = (await req.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, website } = body;
  const firstName = sanitize(name).split(" ")[0];

  // 🧠 Honeypot check
  if (website) {
    return NextResponse.json({ error: "Bot detected" }, { status: 400 });
  }

  // 🧠 Required fields check
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // 🧠 Rate limit
  try {
    await limiter.consume(ip);
  } catch {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  try {
    // 📩 Notification email to you
    const data = await resend.emails.send({
      from: `Legxcy Solutions <${process.env.RESEND_FROM_EMAIL!}>`,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `New Contact Form Submission from ${sanitize(name)} (${sanitize(email)})`,
      replyTo: email,
      text: `
New contact form submission

Name: ${sanitize(name)}
Email: ${sanitize(email)}

Message:
${sanitize(message)}

Sent via Legxcy Solutions Website
      `,
      html: `
        <div style="background-color:#0f2f23;padding:15px;font-family:Inter,Arial,sans-serif;color:#ffffff;">
          <table width="100%" cellspacing="0" cellpadding="0" border="0" 
                 style="max-width:600px;margin:auto;background-color:#1b3a2c;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="text-align:center;padding:15px 20px 10px 20px;">
                <img src="https://legxcysol.dev/logo.webp" alt="Legxcy Solutions Logo"
                     style="max-width:120px;height:auto;margin-bottom:10px;" />
                <h2 style="color:#59ae6a;margin:10px 0;font-weight:600;font-size:20px;">
                  New Contact Form Submission
                </h2>
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <p><strong style="color:#59ae6a;">Name:</strong><br/>${sanitize(name)}</p>
                <p><strong style="color:#59ae6a;">Email:</strong><br/>${sanitize(email)}</p>
                <p>
                  <strong style="color:#59ae6a;">Message:</strong><br/>
                  <span style="background:#0f2f23;display:block;padding:15px;border-radius:8px;color:#e6e6e6;">
                    ${sanitize(message)}
                  </span>
                </p>
                <hr style="border:none;border-top:1px solid #2d5440;margin:20px 0;" />
                <p style="font-size:14px;color:#a3a3a3;text-align:center;">
                  Sent via Legxcy Solutions Website
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    // 📩 Auto-reply to user
    await resend.emails.send({
      from: `Legxcy Solutions <${process.env.RESEND_FROM_EMAIL!}>`,
      to: email,
      subject: "Thanks for contacting Legxcy Solutions",
      replyTo: process.env.RESEND_TO_EMAIL!,
      text: `
Hi ${firstName},

Thank you for contacting Legxcy Solutions. We’ve successfully received your message and will be in touch with you shortly.

In the meantime, we’d love to hear a little about your project goals, the features you have in mind, and roughly how many pages or sections you’d like.

Best regards,
Legxcy Solutions
      `,
      html: `
        <div style="background-color:#0f2f23;padding:15px;font-family:Inter,Arial,sans-serif;color:#ffffff;">
          <table width="100%" cellspacing="0" cellpadding="0" border="0"
                style="max-width:600px;margin:auto;background-color:#1b3a2c;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="text-align:center;padding:15px 20px 10px 20px;">
                <img src="https://legxcysol.dev/logo.webp" alt="Legxcy Solutions Logo"
                    style="max-width:120px;height:auto;margin-bottom:10px;" />
              <h2 style="text-align:center;color:#59ae6a;margin:10px 0;font-weight:600;font-size:20px;">
                Thank You for Getting in Touch
              </h2>
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <p>Hi ${firstName},</p>
                <p>
                  Thank you for reaching out to <strong>Legxcy Solutions</strong>. 
                  We have successfully received your message and will be in touch with you shortly.
                </p>
                <p>
                  In the meantime, we’d love to hear a little about your <strong>project goals</strong>, 
                  the <strong>features you have in mind</strong>, and roughly <strong>how many pages or sections</strong> 
                  you’d like. This will enable us to craft a tailored proposal aligned with your vision.
                </p>
                <table width="100%" style="margin-top:30px;text-align:center;">
                  <tr>
                    <td>
                      <p style="font-size:14px;color:#a3a3a3;margin-bottom:10px;">Best regards,</p>
                      <a href="https://legxcysol.dev" target="_blank" style="text-decoration:none;">
                        <img src="https://legxcysol.dev/banner.webp" alt="Legxcy Solutions Banner"
                            style="max-width:150px;height:auto;border-radius:6px;" />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Thanks for reaching out! We’ll get back to you shortly.",
      data,
    });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
