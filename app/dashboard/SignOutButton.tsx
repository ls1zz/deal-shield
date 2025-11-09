"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition font-medium disabled:opacity-50"
    >
      {isLoading ? "Signing out..." : "Sign Out"}
    </button>
  );
}