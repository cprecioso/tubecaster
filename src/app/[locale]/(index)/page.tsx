import SearchField from "@/components/SearchField";
import { Locale } from "@/locale";
import { handleSearchForm } from "./actions";

export type Params = {
  locale: Locale;
};

export default async function IndexPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;

  return <SearchField action={handleSearchForm.bind(null, locale)} />;
}
