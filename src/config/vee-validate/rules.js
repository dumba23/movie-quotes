import { defineRule } from "vee-validate";
import {
  required,
  email,
  min,
  max,
  confirmed,
  numeric,
} from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);
defineRule("numeric", numeric);
defineRule("lowerCaseAndNum", (value) => {
  const lowerCaseRegex = /^[a-z0-9]*$/;

  if (!lowerCaseRegex.test(value)) {
    return false;
  }
  return true;
});
defineRule("georgian", (value) => {
  const GeorgianRegex = /^[\u10A0-\u10FF\s\p{P}]*$/u;

  if (!GeorgianRegex.test(value)) {
    return false;
  }
  return true;
});
