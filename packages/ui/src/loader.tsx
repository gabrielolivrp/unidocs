import * as React from "react";

const Loader = React.forwardRef<
  SVGSVGElement,
  React.HTMLAttributes<SVGSVGElement>
>((props, ref) => (
  <svg
    ref={ref}
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity="0.5"
      d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30ZM10.6778 30C10.6778 40.6714 19.3286 49.3223 30 49.3223C40.6714 49.3223 49.3223 40.6714 49.3223 30C49.3223 19.3286 40.6714 10.6778 30 10.6778C19.3286 10.6778 10.6778 19.3286 10.6778 30Z"
      fill="#B9B9B9"
    />
    <path
      opacity="0.5"
      d="M59.6433 33.7389C60.3599 27.6328 59.1832 21.454 56.2725 16.0388C53.3617 10.6235 48.8575 6.23326 43.3694 3.46225C37.8813 0.691247 35.022 11.2092 38.5567 12.9939C42.0915 14.7787 44.9925 17.6063 46.8673 21.0941C48.742 24.582 49.4999 28.5616 49.0384 32.4943C48.5768 36.4271 58.9268 39.8449 59.6433 33.7389Z"
      fill="#98A1C0"
    />
  </svg>
));

export { Loader };