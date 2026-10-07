/**
 * Atmospheric layer of the hero: a single quiet sky wash behind everything.
 *
 * Scenery that has to line up with the horizon (sun, hill, ground plane,
 * ground details) lives in the stage instead, where it is anchored to the
 * same edge as the ground line and can never drift away from it.
 * Purely presentational — hidden from assistive tech.
 */
export function HeroEnvironment() {
  return (
    <div className="hero-environment" aria-hidden="true">
      <span className="hero-shape hero-shape--sky" data-hero-env />
    </div>
  )
}
