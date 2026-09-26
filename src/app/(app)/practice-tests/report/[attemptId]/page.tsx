import { TestReport } from "./test-report";

export const metadata = { title: "Score report" };

export default async function ReportPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  return <TestReport attemptId={attemptId} />;
}
