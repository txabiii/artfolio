export default function scrollToTop() {
  const isBrowser = () => typeof window !== "undefined";
  if (!isBrowser()) return;
  setTimeout(() => {
    window.document.body.scrollIntoView({ behavior: "smooth" });
  }, 500);
}