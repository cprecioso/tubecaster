import { FunctionComponent } from "react";

export const ErrorCard: FunctionComponent<{ error: string }> = ({ error }) => (
  <pre>{error}</pre>
);
