export const getFetchHeader = (token = "", contentType: "b" | "a" | "m"): HeadersInit => {
  switch (contentType) {
    case "b":
      return {
        "Content-Type": "application/json",
      };
    case "a":
      return {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      };
    case "m":
      return {
        Authorization: "Bearer " + token,
      };
    default:
      return {};
  }
};
