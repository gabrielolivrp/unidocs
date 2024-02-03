"use client";

import {
  Header,
  Footer,
  RecentDocuments,
  MintDocument,
  MyDocuments,
} from "@/components";
import { useIsMounted } from "@/hooks";

const Home = () => {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return (
    <div className="space-y-8">
      <Header />
      <div className="container space-y-8">
        <RecentDocuments />
        <MintDocument />
        <MyDocuments />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
