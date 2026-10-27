/**
 * Plays the client's animated logo once, then rests on the final frame.
 * Visitors who prefer reduced motion see the still logo instead.
 */
export function LogoIntro() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[15rem] sm:max-w-[22rem] lg:max-w-[30rem]">
      <video
        className="h-full w-full object-contain mix-blend-multiply motion-reduce:hidden"
        src="/brand/logo-intro.mp4"
        poster="/brand/logo.png"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- static fallback for reduced motion */}
      <img
        src="/brand/logo.png"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-contain motion-reduce:block"
      />
    </div>
  );
}
