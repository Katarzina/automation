const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const WEBHOOK_URL = process.env.NEXT_PUBLIC_SITE_URL + '/api/telegram/webhook';

async function register() {
  console.log('Registering webhook:', WEBHOOK_URL);
  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: WEBHOOK_URL }),
    }
  );
  const data = await res.json();
  console.log(data);
}

register();
