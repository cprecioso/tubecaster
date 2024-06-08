import SearchField from "../../../components/SearchField";
import { ALL_LOCALES } from "../../../locale";
import { handleSearchForm } from "./actions";

export default function IndexPage() {
  return <SearchField action={handleSearchForm} />;
}

export const generateStaticParams = () =>
  ALL_LOCALES.map((locale) => ({ locale }));
