import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export function useCustomForm({ storeKeys = [], ...formProps } = {}) {
  const storeValues = useSelector((state) =>
    storeKeys.reduce((acc, key) => {
      acc[key] = state.hcd.hcd[key] ?? "";
      return acc;
    }, {})
  );

  const form = useForm({ defaultValues: storeValues, ...formProps });

  return form;
}
