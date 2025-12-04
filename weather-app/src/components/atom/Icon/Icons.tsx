import { IconDetailedProps } from "./icon.type";

export const CloudIcon = (props: IconDetailedProps) => {
  const { ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...rest}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      />
    </svg>
  );
};

export const LockIcon = (props: IconDetailedProps) => {
  const { ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...rest}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
};