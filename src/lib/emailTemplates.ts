export function buildNewsletterHtml({
  recipientName,
  category,
  posts,
}: {
  recipientName?: string;
  category: string;
  posts: Array<{ title: string; excerpt?: string; url?: string }>;
}) {
  const items = posts
    .map(
      (p) => `
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #eee">
          <h3 style="margin:0;font-size:18px;color:#111">${p.title}</h3>
          <p style="margin:6px 0;color:#444;font-size:14px;line-height:1.5">${p.excerpt ?? ""}</p>
          ${
            p.url
              ? `<p style="margin:6px 0 0;"><a href="${p.url}" style="color:#1a73e8;text-decoration:none;">Read more</a></p>`
              : ""
          }
        </td>
      </tr>
    `
    )
    .join("");

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1">
    </head>
    <body style="font-family:Inter,system-ui,Arial,sans-serif;color:#222;margin:0;padding:0;background:#f7fafc;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="padding:24px">
            <table role="presentation" style="max-width:680px;margin:0 auto;background:#ffffff;padding:28px;border-radius:12px">
              <!-- Logo -->
              <tr>
                <td style="text-align:center;padding-bottom:24px">
                  <img src="{{LOGO_URL}}" alt="Nahara Technologies" style="max-width:200px;height:auto"/>
                </td>
              </tr>

              <!-- Hero / category banner -->
              <tr>
                <td style="text-align:center;padding-bottom:24px">
                  <img src="{{HERO_URL}}" alt="${category} updates" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px"/>
                </td>
              </tr>

              <!-- Greeting -->
              <tr>
                <td>
                  <h2 style="margin:0 0 8px">Hello ${recipientName ?? "friend"},</h2>
                  <p style="margin:0 0 18px;color:#666;font-size:14px;">
                    Here are the latest updates in <strong>${category}</strong> from Nahara Technologies.
                  </p>
                </td>
              </tr>

              <!-- Posts -->
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    ${items}
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding-top:24px;color:#666;font-size:12px;line-height:1.5">
                  <p>You are receiving this email because you subscribed to <strong>${category}</strong> updates from Nahara Technologies.</p>
                  <p>
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/unsubscribe?email={{EMAIL_PLACEHOLDER}}" style="color:#1a73e8;text-decoration:none;">Unsubscribe</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
