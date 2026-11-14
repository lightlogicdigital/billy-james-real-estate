export type Testimonial = { quote: string; name: string; context: "Bought" | "Sold" };

export const testimonials: Testimonial[] = [
  {
    quote:
      "Billy is a pleasure to work with. He keeps the home buying process enjoyable while also working hard and keeping your best interest in mind. He and his team made finding our home a great experience. We would highly recommend him!",
    name: "Jacob S.",
    context: "Bought",
  },
  {
    quote:
      "My family and I could not have sold my house without Billy's expertise. I have never experienced a real estate relationship like this in my YEARS of buying and selling properties.",
    name: "David C.",
    context: "Sold",
  },
  {
    quote:
      "Billy was absolutely amazing. When it came to selling our home, his sensitivity to our needs and his willingness to do what we needed to sell our house was second to none. I cannot recommend Bill highly enough. You will not be disappointed and he will help you sell your house quickly.",
    name: "Bob T.",
    context: "Sold",
  },
];
