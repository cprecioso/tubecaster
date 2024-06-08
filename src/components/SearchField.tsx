import { ComponentPropsWithoutRef } from "react";

const SearchField = ({
  action,
}: {
  action: ComponentPropsWithoutRef<"form">["action"];
}) => {
  return (
    <form className="card full flex one two-500" action={action}>
      <div className="full two-third-500 three-fourth-700">
        <input type="url" name="url" placeholder="YouTube URL" />
      </div>
      <div className="full third-500 fourth-700">
        <button className="full" type="submit">
          Get podcast
        </button>
      </div>
    </form>
  );
};

export default SearchField;
