import { Icon } from '@chakra-ui/react';

function ArrowUpRight(props: any) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 17L17 7M17 7H7M17 7V17"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
}

export { ArrowUpRight };
