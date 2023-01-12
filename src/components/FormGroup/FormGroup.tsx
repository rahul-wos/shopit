import { Form } from "react-bootstrap";

interface FormGroupProps {
  id: string;
  parentClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  controlClassName?: string;
  type: string;
  value: string;
  name: string;
  errorMessage: string;
  label: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler;
}

export function FormGroup({
  id,
  parentClassName,
  labelClassName,
  errorClassName,
  controlClassName,
  type,
  value,
  name,
  errorMessage,
  label,
  placeholder,
  onChange,
}: FormGroupProps) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label className="custom-label">{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <Form.Text className={`text-danger fw-500 ${errorClassName}`}>
        {errorMessage}
      </Form.Text>
    </Form.Group>
  );
}
