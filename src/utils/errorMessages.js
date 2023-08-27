export const getUserNameErrorText = (error) => {
  if (error.type === "required") return " at least 3 characters";
  if (error.type === "minLength") return " at least 3 characters";
  if (error.type === "maxLength") return " at most 20 characters";
};

export const getPasswordErrorText = (error) => {
  if (error.type === "required") return " at least 6 characters";
  if (error.type === "minLength") return " at least 6 characters";
  if (error.type === "maxLength") return " at most 40 characters";
};
