import { useState } from "react";

export default function useInput({ type, name }) {
  const [value, setValue] = useState("");
  const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} name={name} />;
  return [value, input];
}