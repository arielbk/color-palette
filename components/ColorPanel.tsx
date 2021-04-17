import { Box, Flex } from "@chakra-ui/layout";

interface ColorPanelProps {
  color: string;
}

const ColorBox: React.FC<ColorPanelProps & { number: number }> = ({
  color,
  number,
}) => {
  return (
    <Flex
      width="100%"
      height="60px"
      backgroundColor={color}
      color="#fff"
      justifyContent="center"
      alignItems="center"
      fontWeight="600"
      fontSize="2rem"
    >
      {number}
    </Flex>
  );
};

const adjustLuminosity = (color: string, amount: number) => {
  // receives a hex color in the form #rrggbb
  const split = {
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16),
  };
  const adjusted = {
    r:
      amount > 0
        ? Math.min(255, split.r + amount)
        : Math.max(0, split.r + amount),
    g:
      amount > 0
        ? Math.min(255, split.g + amount)
        : Math.max(0, split.g + amount),
    b:
      amount > 0
        ? Math.min(255, split.b + amount)
        : Math.max(0, split.b + amount),
  };
  return `#${adjusted.r.toString(16).padStart(2, "0")}${adjusted.g
    .toString(16)
    .padStart(2, "0")}${adjusted.b.toString(16).padStart(2, "0")}`;
};

export const ColorPanel: React.FC<ColorPanelProps> = ({ color }) => {
  return (
    <Box width="100%">
      <ColorBox color={adjustLuminosity(color, 100)} number={100} />
      <ColorBox color={adjustLuminosity(color, 80)} number={200} />
      <ColorBox color={adjustLuminosity(color, 40)} number={300} />
      <ColorBox color={adjustLuminosity(color, 20)} number={400} />
      <ColorBox color={color} number={500} />
      <ColorBox color={adjustLuminosity(color, -20)} number={600} />
      <ColorBox color={adjustLuminosity(color, -40)} number={700} />
      <ColorBox color={adjustLuminosity(color, -60)} number={800} />
      <ColorBox color={adjustLuminosity(color, -80)} number={900} />
    </Box>
  );
};
