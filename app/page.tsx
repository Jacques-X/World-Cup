import { redirect } from "next/navigation";
import { PredictorDashboard } from "@/components/predictor-dashboard";
import { previewPoolState } from "@/lib/preview-data";
import { loadPoolState } from "@/lib/server/pool";
import { sessionState } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.LOCAL_PREVIEW === "true"
  ) {
    return <PredictorDashboard initialState={previewPoolState()} />;
  }
  const session = await sessionState();
  if (!session.participant) redirect("/access");
  const initialState = await loadPoolState(session.admin);
  return <PredictorDashboard initialState={initialState} />;
}
