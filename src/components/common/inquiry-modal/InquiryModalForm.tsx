import { Send } from "lucide-react";
import InquiryFormField from "./InquiryFormField";
import {
  inquiryFieldClassName,
  inquiryProgramOptions,
  inquiryTextareaClassName,
} from "./inquiryModal.constants";

const inquiryInputs = [
  {
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
  },
  {
    label: "Phone Number",
    type: "text",
    placeholder: "+880",
  },
  {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
] as const;

export default function InquiryModalForm() {
  return (
    <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {inquiryInputs.map((field) => (
        <InquiryFormField key={field.label} label={field.label}>
          <input
            type={field.type}
            className={inquiryFieldClassName}
            placeholder={field.placeholder}
          />
        </InquiryFormField>
      ))}

      <InquiryFormField label="Program Interest">
        <select className={inquiryFieldClassName}>
          {inquiryProgramOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </InquiryFormField>

      <InquiryFormField label="Message (Optional)" className="md:col-span-2">
        <textarea
          className={inquiryTextareaClassName}
          placeholder="Tell us about your goals..."
        />
      </InquiryFormField>

      <button
        type="submit"
        className="md:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-primary/90 shadow-lg shadow-blue-100"
      >
        <Send size={18} />
        Send Inquiry
      </button>
    </form>
  );
}
