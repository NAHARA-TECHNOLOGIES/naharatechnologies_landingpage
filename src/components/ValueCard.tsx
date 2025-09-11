interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  className: string;
}

const ValueCard = ({ icon, title, text, className }: ValueCardProps) => (
  <article className={className}>
    <div>
      <div className="flex items-center gap-2 text-lg font-semibold mb-1 capitalize">
        {icon} {title}
      </div>
      <p className="text-sm">{text}</p>
    </div>
  </article>
);

export default ValueCard;
