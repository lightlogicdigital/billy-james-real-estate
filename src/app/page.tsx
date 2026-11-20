import {
  ForBuyers,
  ForSellers,
  GetInTouch,
  HomeHero,
  HowIHelp,
  LetsTalk,
  MeetBilly,
  NeighborhoodsPanel,
  Reviews,
} from "@/components/HomeSections";
import { MotionScope } from "@/components/Motion";

/** Homepage — 2026 redesign (Paper page "Home · Redesign"). Copy lives in src/content/home.ts. */
export default function HomePage() {
  return (
    <MotionScope>
      <HomeHero />
      <MeetBilly />
      <HowIHelp />
      <ForSellers />
      <ForBuyers />
      <NeighborhoodsPanel />
      <Reviews />
      <LetsTalk />
      <GetInTouch />
    </MotionScope>
  );
}
