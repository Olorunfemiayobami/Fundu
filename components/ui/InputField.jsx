import "../../styles/campaignform.css";

export default function InputField({ label, required, helper, ...props }) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label} {required && <span>*</span>}
        </label>
      )}
      <input className="input-field" {...props} />
      {helper && <p className="helper-text">{helper}</p>}
    </div>
  );
}
