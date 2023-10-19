export default function updateElementText(
  element: HTMLElement | null,
  value: any,
) {
  if (element) {
    element.innerText = String(value);
  }
}
