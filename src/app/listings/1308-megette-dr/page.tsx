import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";

/**
 * The old Framer site misspelled the street ("Megette"). A static host can't send a
 * real redirect, so this page forwards visitors with a meta refresh and tells search
 * engines (canonical) where the listing lives now.
 */
const target = "/listings/1308-meggett-dr-chesapeake-va/";

export const metadata: Metadata = {
  title: "1308 Meggett Dr, Chesapeake, VA",
  robots: { index: false, follow: true },
  alternates: { canonical: target },
};

export default function OldMegetteUrl() {
  const href = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${target}`;
  return (
    <Container className="py-24">
      <meta httpEquiv="refresh" content={`0; url=${href}`} />
      <p className="text-lg">
        This listing has moved.{" "}
        <Link href={target} className="font-semibold text-primary underline underline-offset-4">
          See 1308 Meggett Dr
        </Link>
      </p>
    </Container>
  );
}
