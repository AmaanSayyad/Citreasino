export default function HeaderText({ header, description }) {
  return (
    <div>
      <h3 className="text-3xl font-display ">{header}</h3>

      {description && <p className="text-sm font-display">{description}</p>}
    </div>
  );
};
