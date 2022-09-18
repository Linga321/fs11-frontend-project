import CSS from 'csstype';

export const themeStyles: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
};

export const theme = () => {
  const activetheme = localStorage.getItem("theme")
  document.documentElement.style.setProperty('--dynamic-colour',activetheme=="dark" ? "white" : "black");
  document.documentElement.style.setProperty('--dynamic-text-colour',activetheme=="dark" ? "black" : "white");
  if (activetheme == "dark" || activetheme == "light") {
    return activetheme
  }
  return "dark"
}
