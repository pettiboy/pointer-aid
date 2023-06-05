import { Slide, useScrollTrigger } from "@mui/material";

interface Props {
  children: React.ReactElement;
}

const HideOnScroll = ({ children }: Props) => {
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
