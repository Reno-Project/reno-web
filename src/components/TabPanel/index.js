export function TabPanel(props) {
  const { children, value, index, style, ...other } = props;

  return (
    <div
      style={{
        ...style,
        width: "100%",
        display: value === index ? "block" : "none",
      }}
      {...other}
    >
      {children}
    </div>
  );
}
