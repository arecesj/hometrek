import * as runtime from "react/jsx-runtime";
import { FC } from "react";
import Image from "next/image";
import Callout from "./Callout";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
};

type MDXProps = {
  code: string;
}

const MDXContent: FC<MDXProps> = ({ code }) => {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}

export default MDXContent