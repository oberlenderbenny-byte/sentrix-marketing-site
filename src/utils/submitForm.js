// Sends form submissions straight to oberlender.benny@gmail.com via Web3Forms
// (https://web3forms.com) — no backend needed, free tier.
//
// SETUP: go to https://web3forms.com, enter oberlender.benny@gmail.com, and
// you'll get an access key by email. Paste it below in place of
// "REPLACE_WITH_YOUR_ACCESS_KEY", commit, and push — that's the only step.
const WEB3FORMS_ACCESS_KEY = "a57cf0aa-f717-45fb-a1fa-03b6efcf7703";

export async function submitToInbox(fields, { subject, formName }) {
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: subject || "New submission — Sentrix website",
    from_name: "Sentrix website",
    form_name: formName,
    ...fields,
  };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || "Submission failed");
  }
  return data;
}
