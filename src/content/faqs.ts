export type Faq = { question: string; answer: string; /** true = new copy that Billy should review */ draft?: boolean };

/** Shown on the homepage, in this order. The first one opens by default. */
export const faqs: Faq[] = [
  {
    question: "How do you figure out what my home is worth?",
    answer:
      "I'll start with a no-pressure walkthrough of your home, then compare it to recent sales and active listings nearby. We'll factor in condition, updates, and what buyers want right now — so you get a realistic price range and a plan to land at the top of it.",
    draft: true,
  },
  {
    question: "What's it like working with you?",
    answer:
      "A straight answer, a clear plan, and someone who picks up the phone. I'll keep you updated at every step — showings, offers, inspections, appraisal, and closing — and tell you exactly what I'd do if it were my own home.",
    draft: true,
  },
  {
    question: "Do you work with first-time buyers?",
    answer:
      "Absolutely. I'll walk you through every step — budgeting, getting pre-approved, what to look for on a tour, and what happens at closing — so nothing catches you off guard.",
    draft: true,
  },
  {
    question: "Which areas do you cover?",
    answer:
      "Virginia Beach, Chesapeake, Norfolk, and Suffolk, plus the surrounding Hampton Roads communities. If you're moving here from out of the area — including military families on PCS orders — I'm happy to help you get to know the neighborhoods before you arrive.",
    draft: true,
  },
  {
    // Billy's original answer from the live site.
    question: "What do you help with?",
    answer:
      "I represent buyers and sellers throughout Hampton Roads, guiding clients through every stage of the real estate process. Whether you're purchasing your first home, selling a long-held property, or exploring your options, I provide strategic guidance, strong negotiation, and clear communication from start to finish.",
  },
];
