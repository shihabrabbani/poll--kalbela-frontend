import PoolView from "./PoolView";

export default async function PoolPage({
  params,
}: {
  params: Promise<{ seatNo: string }>;
}) {
  const slug = (await params).seatNo;
  const seatNo = slug.replace(/^seat-/i, "");
  return <PoolView seatNo={seatNo} />;
}
