import { defineRule } from "vee-validate";
import { required, email, min, max, confirmed } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);
defineRule("lowerCaseAndNum", (value) => {
  const lowerCaseRegex = /^[a-z0-9]*$/;

  if (!lowerCaseRegex.test(value)) {
    return false;
  }
  return true;
});
defineRule("georgian", (value) => {
  const GeorgianRegex = /^[\u10A0-\u10FF]*$/;

  if (!GeorgianRegex.test(value)) {
    return false;
  }
  return true;
});