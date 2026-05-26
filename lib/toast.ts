export function pushToast(
    message: string,
    type: "success" | "error" = "success",
) {
    window.dispatchEvent(
        new CustomEvent("app:toast", { detail: { message, type } }),
    );
}
