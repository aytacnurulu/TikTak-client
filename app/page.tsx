import Container from "@/shared/components/Container";
import LandingPage from "@/features/landing/pages/LandingPage";
import Footer from "@/shared/components/Footer";
import LandingHeader from "@/shared/components/LandingHeader/LandingHeader";

export default function RootPage() {
  return (
    <>
      <LandingHeader />
      <main>
        <Container>
          <LandingPage />
        </Container>
      </main>
      <Footer />
    </>
  );
}
