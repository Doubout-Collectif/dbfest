type SectTitleProps = {
  title: string;
  color?: "white" | "black";
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "text-3xl sm:text-4xl md:text-5xl",
  md: "text-4xl sm:text-5xl md:text-6xl",
  lg: "text-5xl sm:text-6xl md:text-7xl",
};

const colorClasses = {
  white: "text-white",
  black: "text-black",
};

const SectTitle = ({ title, color = "white", size = "md" }: SectTitleProps) => {
  return (
    <h3
      className={`font-grindyBrush ${sizeClasses[size]} ${colorClasses[color]} uppercase text-center mt-6 sm:mt-8 leading-tight px-4`}
    >
      {title}
    </h3>
  );
};

export default SectTitle;