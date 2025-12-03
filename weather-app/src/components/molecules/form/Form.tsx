// Form.tsx
import { useState } from "react";
import { Button } from "../../atom/button/Button";

interface FormProps {
  onSubmit: (value: string) => void | Promise<void>;
  isDisabled: boolean;
}

export const Form = ({ onSubmit, isDisabled }: FormProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() && !isDisabled) {
      await onSubmit(value);
      setValue(''); 
    }
  };

  return (
    <div className="w-1/2">
      <form onSubmit={handleSubmit} className="w-full flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isDisabled}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button 
          label="Send" 
          isDisabled={isDisabled} 
          variant="formSubmit"
          type="submit"
        />
      </form>
    </div>
  );
};