import { useState } from "react";
import { api } from "../api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", phone: "" });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setOk(false);
    // simple client validation
    if (!form.name || !form.email || !form.message) {
      setErr("Name, email and message are required."); return;
    }
    setSending(true);
    try {
      await api.post("/api/contact", form);
      setOk(true);
      setForm({ name: "", email: "", subject: "", message: "", phone: "" });
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to send. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="container-max pt-28 pb-20">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold">Contact Us</h1>
        <p className="text-white/70 mt-3">
          Questions, collabs, or press? Drop us a line—we usually reply within 1–2 business days.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={submit}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
          >
            {/* success / error */}
            {ok && (
              <div className="mb-4 rounded-lg bg-emerald-500/15 text-emerald-300 px-4 py-3">
                Thanks! Your message has been sent.
              </div>
            )}
            {err && (
              <div className="mb-4 rounded-lg bg-red-500/15 text-red-300 px-4 py-3">
                {err}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name *</label>
                <input
                  name="name" value={form.name} onChange={onChange}
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email *</label>
                <input
                  name="email" type="email" value={form.email} onChange={onChange}
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input
                  name="phone" value={form.phone} onChange={onChange}
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="+91…"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Subject</label>
                <input
                  name="subject" value={form.subject} onChange={onChange}
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Partnership / Support / Media…"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm mb-1">Message *</label>
              <textarea
                name="message" rows={6} value={form.message} onChange={onChange}
                className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Write your message here…"
              />
            </div>

            {/* honeypot anti-bot (hidden) */}
            <input name="website" className="hidden" onChange={() => {}} />

            <button
              type="submit"
              disabled={sending}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-white text-black px-5 py-2.5 font-medium hover:opacity-90 disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>

        {/* Sidebar info */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold mb-2">Studio</h3>
            <p className="text-white/70">
              Pune, Maharashtra, India
              <br /> Mon–Fri · 10:00–18:00 IST
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold mb-2">Business & Press</h3>
            <p className="text-white/70">
              business@tmp.example
              <br /> press@tmp.example
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold mb-2">Follow</h3>
            <div className="flex gap-3">
              <a className="h-9 w-9 grid place-items-center rounded-full bg-white text-black" href="https://youtube.com" target="_blank">Y</a>
              <a className="h-9 w-9 grid place-items-center rounded-full bg-white text-black" href="https://facebook.com" target="_blank">f</a>
              <a className="h-9 w-9 grid place-items-center rounded-full bg-white text-black" href="https://instagram.com" target="_blank">◎</a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
