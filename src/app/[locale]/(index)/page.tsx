import SearchField from "../../../components/SearchField";
import { Locale } from "../../../locale";
import { handleSearchForm } from "./actions";

export type Params = {
  locale: Locale;
};

export default function IndexPage({ params: { locale } }: { params: Params }) {
  return <SearchField action={handleSearchForm.bind(null, locale)} />;
}
