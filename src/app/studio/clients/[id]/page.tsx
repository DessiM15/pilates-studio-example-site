import type { Metadata } from "next";
import { ClientDetail } from "@/components/studio/ClientDetail";

export const metadata: Metadata = { title: "Client | Studio Portal" };

export default async function StudioClientPage(props: PageProps<"/studio/clients/[id]">) {
  const { id } = await props.params;
  return <ClientDetail id={id} />;
}
