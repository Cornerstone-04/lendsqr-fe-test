interface Field {
  label: string;
  value: string | number;
}

export const InfoSection = ({
  title,
  fields,
}: {
  title: string;
  fields: Field[];
}) => (
  <div className="user-details__section">
    <h3 className="user-details__section-title">{title}</h3>
    <div className="user-details__grid">
      {fields.map((field) => (
        <div className="user-details__field" key={field.label}>
          <div className="user-details__label">{field.label}</div>
          {field.label === "Twitter" ? (
            <a
              href={`https://x.com/${field.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="user-details__value"
            >
              {field.value || "N/A"}
            </a>
          ) : field.label === "Instagram" ? (
            <a
              href={`https://instagram.com/${field.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="user-details__value"
            >
              {field.value || "N/A"}
            </a>
          ) : field.label === "Facebook" ? (
            <a
              href={`https://www.facebook.com/search/top/?q=${field.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="user-details__value"
            >
              {field.value || "N/A"}
            </a>
          ) : (
            <div className="user-details__value">{field.value || "N/A"}</div>
          )}
        </div>
      ))}
    </div>
  </div>
);
