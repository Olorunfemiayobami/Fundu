"use client";
import React, { useState, useRef, useEffect } from "react";

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  name,
  isTextArea = false,
  isSelect = false,
  options = [],
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    if (disabled) return;
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div
      className={`form-group ${disabled ? "is-disabled" : ""}`}
      style={{ position: "relative" }} // Added to ensure dropdown positions correctly
      ref={dropdownRef}
    >
      {label && (
        <label className="form-label font-urbanist">
          {label} {required && <span>*</span>}
        </label>
      )}

      {isSelect ? (
        <div className="custom-select-container">
          <div
            className={`input-field font-urbanist custom-select-trigger ${isOpen ? "is-open" : ""}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            <span style={{ color: value ? "#0A0A0A" : "#888" }}>
              {/* Logic to show the Label of the selected option instead of the raw value */}
              {options.find((opt) => opt.value === value)?.label || placeholder}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              style={{
                transition: "transform 0.2s ease",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {isOpen && (
            <ul className="select-dropdown font-urbanist">
              {" "}
              {/* Matches the CSS class */}
              {options.map((opt, index) => (
                <li
                  key={index}
                  className={`select-option ${value === opt.value ? "selected" : ""}`}
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : isTextArea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="input-field font-urbanist textarea-style"
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="input-field font-urbanist"
        />
      )}
    </div>
  );
}
