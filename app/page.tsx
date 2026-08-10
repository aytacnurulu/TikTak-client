import Container from "@/shared/components/Container";
import LandingPage from "@/features/landing/pages/LandingPage";
import Footer from "@/shared/components/Footer";
import LandingHeader from "@/shared/components/LandingHeader";
import { getCampaigns } from "@/shared/lib/api/campaigns";

export default async function RootPage() {
  const campaigns = await getCampaigns();

  return (
    <>
      <LandingHeader />
      <main>
        <Container>
          <LandingPage campaigns={campaigns} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
