
const correctHash = "73b8a7f3cffd4f0a177259cd99937603b61ff45cc20c5beb825ce05b71de1283";
const redirectPage = "./html/index2.html";


async function checkPassword() {
  const passwordInput = document.getElementById("password");
  const errorText = document.getElementById("error");

  const password = passwordInput.value.trim();

  if (!password) {
    errorText.innerText = "Bitte Passwort eingeben";
    return;
  }

  const hash = await sha256(password);

  if (hash === correctHash) {
    // Login speichern
    localStorage.setItem("portfolioAuth", "true");

    // Weiterleitung
    window.location.href = redirectPage;
  } else {
    errorText.innerText = "Falsches Passwort";
  }
}


async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
document.getElementById("password").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkPassword();
  }
});


document.addEventListener("DOMContentLoaded", checkLoginState);
