function ThemeManager() {
  this.themeKey   = "theme";
  this.darkClass  = "theme-dark";
  this.root       = document.documentElement;
  this.button     = document.querySelector(".theme-toggle");

  this.setup();
}

// Applies the saved theme, falling back to the system preference
ThemeManager.prototype.setup = function () {
  var saved = this.getSavedTheme();
  var prefersDark = window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches;

  this.apply(saved ? saved === "dark" : prefersDark);

  if (this.button) {
    this.button.addEventListener("click", this.toggle.bind(this));
  }
};

ThemeManager.prototype.isDark = function () {
  return this.root.classList.contains(this.darkClass);
};

ThemeManager.prototype.apply = function (dark) {
  if (dark) {
    this.root.classList.add(this.darkClass);
  } else {
    this.root.classList.remove(this.darkClass);
  }

  if (this.button) {
    this.button.textContent = dark ? "Light mode" : "Dark mode";
  }
};

ThemeManager.prototype.toggle = function (event) {
  event.preventDefault();

  var dark = !this.isDark();
  this.apply(dark);
  this.saveTheme(dark ? "dark" : "light");
};

ThemeManager.prototype.getSavedTheme = function () {
  try {
    return window.localStorage.getItem(this.themeKey);
  } catch (error) {
    return null;
  }
};

ThemeManager.prototype.saveTheme = function (theme) {
  try {
    window.localStorage.setItem(this.themeKey, theme);
  } catch (error) {
    // Storage unavailable; the theme just won't persist
  }
};
