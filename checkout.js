let stripe;

async function initStripe() {
  // Fetch publishable key from backend
  const response = await fetch("/api/config");
  const { publishableKey } = await response.json();

  stripe = Stripe(publishableKey);
}

document.getElementById("checkout-button").addEventListener("click", async () => {
  if (!stripe) await initStripe();

  // Call your backend to create a checkout session
  const response = await fetch("/api/checkout", { method: "POST" });
  const session = await response.json();

  // Redirect to Stripe Checkout
  const result = await stripe.redirectToCheckout({ sessionId: session.id });

  if (result.error) {
    alert(result.error.message);
  }
});
