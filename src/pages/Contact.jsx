import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { submitToInbox } from "../utils/submitForm";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.botcheck.checked) return; // honeypot
    setStatus("loading");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      await submitToInbox(data, { subject: "New contact form submission — Sentrix", formName: "Contact" });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const close = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div>
      <Header dark onHamburger={() => {}} />

      <section className="relative px-6 md:px-16 pt-32 pb-20 max-w-2xl mx-auto">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-24 right-6 md:right-0 w-9 h-9 rounded-full border border-border flex items-center justify-center text-textDim hover:text-white hover:border-accent transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <span className="inline-block text-xs font-bold tracking-[1.5px] uppercase text-accent mb-4">
          Contact us
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
          Let's talk about your locations
        </h1>
        <p className="text-textDim text-[16px] leading-relaxed mb-10">
          Whether you're looking for a demo, want to explore a partnership, or just have a question —
          send us a note and we'll reply within one business day.
        </p>

        {status === "success" ? (
          <div className="bg-panel border border-border rounded-lg p-8 text-center">
            <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto mb-4 font-bold">
              ✓
            </div>
            <h4 className="text-white font-bold mb-2">Message received</h4>
            <p className="text-textDim text-[14px]">We'll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                name="name"
                placeholder="Full name"
                className="bg-panel border border-border rounded-md px-4 py-3 text-sm text-white placeholder:text-textMuted outline-none focus:border-accent"
              />
              <input
                required
                name="company"
                placeholder="Company"
                className="bg-panel border border-border rounded-md px-4 py-3 text-sm text-white placeholder:text-textMuted outline-none focus:border-accent"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                type="email"
                name="email"
                placeholder="Work email"
                className="bg-panel border border-border rounded-md px-4 py-3 text-sm text-white placeholder:text-textMuted outline-none focus:border-accent"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="bg-panel border border-border rounded-md px-4 py-3 text-sm text-white placeholder:text-textMuted outline-none focus:border-accent"
              />
            </div>
            <textarea
              rows={4}
              required
              name="message"
              placeholder="What can we help with?"
              className="bg-panel border border-border rounded-md px-4 py-3 text-sm text-white placeholder:text-textMuted outline-none focus:border-accent resize-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-accent text-[#04101f] font-bold rounded-md py-3.5 text-sm hover:bg-[#7db4fb] transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
            {status === "error" && (
              <p className="text-xs text-red-400 text-center">
                Something went wrong — please try again, or email us directly.
              </p>
            )}
            <p className="text-xs text-textMuted text-center">We'll reply within one business day.</p>
          </form>
        )}
      </section>

      <Footer />
    </div>
  );
}
