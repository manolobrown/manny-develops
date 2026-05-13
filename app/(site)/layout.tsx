import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyOptIn } from "@/components/StickyOptIn";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <StickyOptIn />
    </>
  );
}
