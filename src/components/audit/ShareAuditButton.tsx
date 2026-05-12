"use client";

export default function ShareAuditButton() {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      window.location.href
    );

    alert("Link copied!");
  };

  return (
    <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
      <h3 className="text-xl font-bold text-black">
        Share This Audit
      </h3>

      <p className="mt-2 text-zinc-600">
        Share this public audit report with
        your team or network.
      </p>

      <button
        onClick={handleCopy}
        className="mt-4 h-12 rounded-xl bg-black px-6 font-semibold text-white transition hover:opacity-90"
      >
        Copy Share Link
      </button>
    </div>
  );
}