import React, { FunctionComponent } from "react"

export type OnSubmitHandler = (
  value: string,
  preventDefault: () => void
) => void

export type Props = {
  onSubmit?: OnSubmitHandler
}

type FormOnSubmitHandler = NonNullable<
  JSX.IntrinsicElements["form"]["onSubmit"]
>

const SearchField: FunctionComponent<Props> = ({ onSubmit }) => {
  const ref = React.useRef<HTMLInputElement>(null)

  const handleSubmit = React.useMemo<FormOnSubmitHandler | undefined>(
    () =>
      onSubmit != null
        ? (e) => onSubmit(ref.current?.value ?? "", e.preventDefault.bind(e))
        : undefined,
    [onSubmit]
  )

  return (
    <form
      className="card full flex one two-500"
      method="GET"
      action="/api/parse-playlist"
      onSubmit={handleSubmit}
    >
      <div className="full two-third-500 three-fourth-700">
        <input
          ref={ref}
          type="url"
          name="url"
          placeholder="YouTube URL"
          defaultValue=""
        />
      </div>
      <div className="full third-500 fourth-700">
        <button className="full" type="submit">
          Get podcast
        </button>
      </div>
    </form>
  )
}

export default SearchField
