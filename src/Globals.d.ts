declare module "*.module.css";
declare module "*.module.scss";

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
