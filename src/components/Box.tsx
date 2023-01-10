interface BoxProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Box = (props: BoxProps) => {
  return <div {...props} />;
};

interface FlexBoxProps extends BoxProps {
  flexDirection?: "row" | "column";
  space?: number;
}

export const FlexBox = ({ flexDirection = "row", space, style, ...rest }: FlexBoxProps) => {
  return <Box style={{ ...style, display: "flex", flexDirection, gap: space }} {...rest} />;
};

export const Text = (props: BoxProps) => {
  return <p {...props} />;
};

export const Divider = ({ style }: Omit<BoxProps, "children">) => {
  return <hr style={{ width: "100%", ...style }} />;
};

interface LabelProps extends BoxProps {
  htmlFor: string;
}

export const Label = ({ style, ...rest }: LabelProps) => {
  return <label style={{ ...style, color: "hotpink" }} {...rest} />;
};
