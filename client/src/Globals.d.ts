declare module "*.module.css";
declare module "*.module.scss";
declare module "*.svg";

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
