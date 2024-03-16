import { Message } from "semantic-ui-react";

interface Props {
  errors: string[];
}

export default function ValidationError({ errors }: Props) {
  console.log(errors, "beta");
  return (
    <Message error>
      {Array.isArray(errors) && (
        <Message.List>
          {errors.map((err: string, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}
