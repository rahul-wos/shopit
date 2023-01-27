import { forwardRef } from "react";
import { Form } from "react-bootstrap";

interface FormGroupProps {
  id: string;
  parentClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  controlClassName?: string;
  type: string;
  label: string;
  placeholder?: string;
  name: string;
  error: string | undefined;
  autoComplete?: string;
}

const FormGroup = forwardRef<HTMLInputElement, FormGroupProps>(
  (
    {
      id,
      label,
      error,
      autoComplete,
      labelClassName,
      errorClassName,
      parentClassName,
      controlClassName,
      ...props
    },
    ref
  ) => {
    return (
      <Form.Group className={`${parentClassName}`} controlId={id}>
        <Form.Label className={`custom-label ${labelClassName}`}>
          {label}
        </Form.Label>
        <Form.Control
          ref={ref}
          autoComplete={autoComplete}
          className={controlClassName}
          {...props}
        />

        {error?.length !== 0 ? (
          <Form.Text className={`text-danger fw-500 ${errorClassName}`}>
            {error}
          </Form.Text>
        ) : null}
      </Form.Group>
    );
  }
);

FormGroup.displayName = "FormGroup";

export { FormGroup };
