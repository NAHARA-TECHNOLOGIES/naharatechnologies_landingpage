export interface NewsletterTemplateOptions {
  recipientName?: string;
  confirmationUrl: string;
  email: string;
  frequency: string;
  category: string;
  brandColor?: string;
  logoUrl?: string;
  heroImageUrl?: string;
  secondaryBannerUrl?: string;
  unsubscribeUrl?: string;
  companyAddress?: string;
  socialLinks?: { platform: string; url: string; iconUrl: string }[];
}

export function buildNewsletterHtml(options: NewsletterTemplateOptions) {
 const {
  recipientName = "Subscriber",
  confirmationUrl,
  email,
  frequency,
  category,
  brandColor = "#1D4ED8", 
  logoUrl = "https://yourdomain.com/logo.png",
  heroImageUrl,
  secondaryBannerUrl,
  unsubscribeUrl: rawUnsubscribeUrl,
  companyAddress = "123 Corporate Blvd, Suite 100, Lagos, Nigeria",
  socialLinks = [
    { platform: "LinkedIn", url: "#", iconUrl: "https://cdn-icons-png.flaticon.com/32/174/174857.png" },
    { platform: "Twitter", url: "#", iconUrl: "https://cdn-icons-png.flaticon.com/32/733/733579.png" },
    { platform: "Facebook", url: "#", iconUrl: "https://cdn-icons-png.flaticon.com/32/733/733547.png" },
  ],
} = options;

const unsubscribeUrl = rawUnsubscribeUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;


  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${category} Newsletter</title>
    <style>
      @media (max-width: 620px) {
        .container { width: 100% !important; padding: 10px !important; }
        img { width: 100% !important; height: auto !important; }
      }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin:0; padding:0; background:#f4f6f8; }
                a.button {
            display:inline-block; 
            padding:14px 28px; 
            background: ${brandColor};
            color:#ffffff; 
            text-decoration:none; 
            border-radius:6px; 
            font-weight:bold; 
            transition: all 0.3s ease;
            }

      a.button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
      .banner { border-radius:10px; overflow:hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin:20px 0; }
      h1, h3 { margin-top:0; }
      .footer a:hover { opacity:0.8; }
    </style>
  </head>
  <body>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="20" cellspacing="0" class="container" style="background:#ffffff; border-radius:10px; overflow:hidden;">

            <!-- Top Logo & Hero Banner -->
            <tr>
              <td align="center">
                <img src="${logoUrl}" alt="Logo" width="120" style="margin-bottom:16px;" />
                ${heroImageUrl ? `<img src="${heroImageUrl}" class="banner" alt="Hero Banner" width="100%" />` : ""}
              </td>
            </tr>

            <!-- Greeting & Subscription Info -->
            <tr>
              <td>
                <h1 style="color:${brandColor};">Welcome, ${recipientName}!</h1>
                <p style="color:#555555; font-size:16px;">Thanks for subscribing to the <strong>${category}</strong> newsletter.</p>
                <table style="margin:16px auto; font-size:14px; color:#555555; border:1px solid #e0e0e0; border-radius:6px; width:90%; max-width:500px;">
                  <tr>
                    <td style="padding:8px; border-bottom:1px solid #e0e0e0;"><strong>Email:</strong></td>
                    <td style="padding:8px; border-bottom:1px solid #e0e0e0;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px; border-bottom:1px solid #e0e0e0;"><strong>Frequency:</strong></td>
                    <td style="padding:8px; border-bottom:1px solid #e0e0e0;">${frequency}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px;"><strong>Category:</strong></td>
                    <td style="padding:8px;">${category}</td>
                  </tr>
                </table>
                <a href="${confirmationUrl}" class="button" style="margin-top:20px;">Confirm Subscription</a>
              </td>
            </tr>

            <!-- Secondary Banner -->
            ${secondaryBannerUrl ? `<tr><td align="center"><img src="${secondaryBannerUrl}" class="banner" alt="Secondary Banner" width="100%" /></td></tr>` : ""}

            <!-- Corporate / Info Section -->
            <tr>
              <td style="padding:16px; background:#f0f4f8; border-radius:8px; color:#333333;">
                <h3 style="color:${brandColor};">About Nahara Technologies Plc</h3>
                <p>We build modern websites, mobile apps, digital marketing campaigns, and branding solutions to help businesses grow in the digital world.</p>
                <p style="color:#a00; font-weight:bold;">Do not share your confirmation link with anyone. Keep your subscription secure.</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="footer" align="center" style="padding-top:20px; font-size:12px; color:#888888;">
                <p>Follow us:</p>
                ${socialLinks.map(link => `
                  <a href="${link.url}" style="margin:0 6px; display:inline-block;">
                    <img src="${link.iconUrl}" alt="${link.platform}" width="24" style="vertical-align:middle;" />
                  </a>
                `).join("")}
                <p style="margin-top:12px;">${companyAddress}</p>
                <p>You received this email because you subscribed to ${category} updates.<br/>
                <a href="${unsubscribeUrl}" style="color:${brandColor}; text-decoration:underline;">Unsubscribe</a></p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
