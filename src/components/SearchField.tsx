import { ComponentPropsWithoutRef } from "react";

const SearchField = ({
  action,
}: {
  action: ComponentPropsWithoutRef<"form">["action"];
}) => {
  return (
    <form action={action}>
      <div>
        <input type="url" name="url" placeholder="YouTube URL" />
      </div>
      <div>
        <button type="submit">Get podcast</button>
      </div>
    </form>
  );
};

export default SearchField;
