import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";

const CustomMultiValue = (props) => {
  const { index, selectProps } = props;
  const value = selectProps.value || [];
  const maxTagCount = selectProps.maxTagCount || 2;

  if (index < maxTagCount) {
    return <components.MultiValue {...props} />;
  }

  if (index === maxTagCount) {
    return (
      <div
        style={{
          padding: "4px 8px",
          backgroundColor: selectProps.isDark ? "#2D3748" : "#E2E8F0",
          color: selectProps.isDark ? "#CBD5E0" : "#1A202C",
          fontSize: "0.875rem",
          borderRadius: "0.25rem",
          marginRight: "4px",
          marginTop: "4px",
        }}
      >
        +{value.length - maxTagCount} more
      </div>
    );
  }

  return null;
};

const MultiSelect = ({
  options,
  value,
  onChange,
  maxTagCount = 2,
  placeholder = "Select",
}) => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const checkDarkMode = () => {
      const htmlEl = document.documentElement;
      setIsDark(htmlEl.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <Select
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      components={{ MultiValue: CustomMultiValue }}
      maxTagCount={maxTagCount}
      isDark={isDark}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: isDark ? "#1A202C" : "white",
          borderColor: isDark ? "#4A5568" : "#CBD5E0",
          color: isDark ? "#E2E8F0" : "#1A202C",
          boxShadow: "none",
          minHeight: "38px",
          "&:hover": {
            borderColor: isDark ? "#718096" : "#A0AEC0",
          },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: isDark ? "#2D3748" : "white",
          color: isDark ? "#E2E8F0" : "#1A202C",
        }),
        valueContainer: (base) => ({
          ...base,
          padding: "0 6px",
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: isDark ? "#4A5568" : "#BFDBFE",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: isDark ? "#E2E8F0" : "#1E3A8A",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: isDark ? "#E53E3E" : "#1E3A8A",
          cursor: "pointer",
          ":hover": {
            backgroundColor: isDark ? "#742A2A" : "#DBEAFE",
            color: isDark ? "#FED7D7" : "#DC2626",
          },
        }),
        placeholder: (base) => ({
          ...base,
          color: isDark ? "#A0AEC0" : "#A0AEC0",
        }),
        option: (base, state) => ({
          ...base,
          fontSize: 13,
          backgroundColor: state.isSelected
            ? "#3B82F6"
            : state.isFocused
            ? isDark
              ? "#4A5568"
              : "#DBEAFE"
            : isDark
            ? "#2D3748"
            : "white",
          color: state.isSelected
            ? "white"
            : isDark
            ? "#E2E8F0"
            : "#1A202C",
          cursor: "pointer",
        }),
      }}
    />
  );
};

export default MultiSelect;
