import type { APIRoute } from "astro";

export const prerender = false;

const parseChatIds = (value: string | undefined) => {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const buildMessage = (payload: any) => {
  const lines: string[] = [];
  lines.push("🧾 Nuova richiesta dal listino");
  lines.push("");
  lines.push(`Metodo contatto: ${payload.method || "N/D"}`);
  if (payload.phone) lines.push(`Telefono: ${payload.phone}`);
  if (payload.email) lines.push(`Email: ${payload.email}`);
  if (payload.timeRange) lines.push(`Fascia oraria: ${payload.timeRange}`);
  if (payload.message) lines.push(`Messaggio: ${payload.message}`);
  lines.push("");
  lines.push("Servizi selezionati:");
  const grouped = payload.itemsByCategory || {};
  Object.entries(grouped).forEach(([category, items]: any) => {
    lines.push(`- ${category}`);
    items.forEach((item: any) => {
      lines.push(`  • ${item.name} (${item.price})`);
    });
  });
  return lines.join("\n");
};

export const POST: APIRoute = async ({ request }) => {
  const botToken = import.meta.env.TELEGRAM_BOT_TOKEN as string | undefined;
  const chatIds = parseChatIds(import.meta.env.TELEGRAM_CHAT_IDS as string | undefined);

  if (!botToken || chatIds.length === 0) {
    return new Response(JSON.stringify({ error: "Missing Telegram configuration" }), {
      status: 500
    });
  }

  const payload = await request.json().catch(() => null);
  if (!payload || !Array.isArray(payload.items) || payload.items.length === 0) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
  }

  const itemsByCategory = payload.items.reduce((acc: any, item: any) => {
    const key = item.category || "Altro";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const message = buildMessage({ ...payload, itemsByCategory });

  const requests = chatIds.map(async (chatId) => {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.ok) {
      throw new Error("Telegram error");
    }
    return data;
  });

  const results = await Promise.allSettled(requests);
  const succeeded = results.filter((result) => result.status === "fulfilled");
  const failed = results.filter((result) => result.status === "rejected");

  if (failed.length > 0) {
    console.warn(`Lead API: ${failed.length}/${chatIds.length} invii Telegram falliti (messaggio comunque inviato a ${succeeded.length} chat)`);
  }
  if (succeeded.length === 0) {
    return new Response(JSON.stringify({ error: "Telegram send failed" }), {
      status: 502
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
