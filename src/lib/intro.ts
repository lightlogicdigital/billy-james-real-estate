/**
 * Fired on window when the homepage intro panel starts to lift (HomeIntro.tsx), or when the
 * <head> script's safety timer gives up on it (layout.tsx). Motion.tsx holds the page's own
 * entrance animations until then. Plain module so the server layout can read the value.
 */
export const INTRO_REVEAL_EVENT = "bj:intro-reveal";
