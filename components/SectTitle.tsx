type SectTitleProps = {
  title: string,
  color?: string,
  size?: number
}

const SectTitle = ({ title, color = "white", size }: SectTitleProps) => {
  const sizeClass = size ? `text-[${size}px]` : "text-6xl";
  const colorClass = `text-${color}`;

  return (
    <h3 className={`font-grindyBrush ${sizeClass} ${colorClass} uppercase text-center mt-8`}>
      {title}
    </h3>
  );
};

export default SectTitle;