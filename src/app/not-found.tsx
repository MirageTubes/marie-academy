import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="eyebrow text-gold-deep">404</p>
      <h1 className="mt-4 text-5xl sm:text-6xl">This scene isn’t in the script.</h1>
      <p className="mx-auto mt-5 max-w-md text-muted">The page you’re looking for has moved or exited stage left.</p>
      <div className="mt-10 flex justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/events" variant="outline">
          See what’s on
        </ButtonLink>
      </div>
    </Container>
  );
}
