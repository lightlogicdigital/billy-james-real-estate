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
import { HomeIntro } from "@/components/HomeIntro";
import { MotionScope } from "@/components/Motion";

/** Homepage — 2026 redesign (Paper page "Home · Redesign"). Copy lives in src/content/home.ts. */
export default function HomePage() {
  return (
    <MotionScope>
      <HomeIntro />
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
