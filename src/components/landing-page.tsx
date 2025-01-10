"use client";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { signInPath } from "@/path";

const LandingPage = () => {
  const { user, isFetched } = useAuth();

  if (!user || !isFetched) {
    // return <div className="w-[78px] bg-secondary/20" />;

    return (
      <div className="flex flex-col items-center justify-start h-[60vh] text-center py-20">
        <h1 className="text-6xl font-bold">让每位医生快速成为SLE诊断大师</h1>
        <p className="text-2xl mt-12">
          借助AI数据驱动和自动化，我们的系统将复杂的SLE诊断转化为直观、高效、轻松的全新体验
        </p>
        <Link href={signInPath()}>
          <Button className="mt-12">现在开始</Button>
        </Link>
      </div>
    );
  }

  return <></>;
};

export { LandingPage };
