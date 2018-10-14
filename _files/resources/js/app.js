/**
 * Installer service worker hvis nødvendigt
 * Du skal referere til denne fil fra dit sites footer
 * Bemærk at din service worker fil skal ligge på roden af dit site (Linie 8)
 */
if('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register('./serviceworker.js')
            .then(registration => {
                console.log("Service Worker registered");
            })
            .catch(error => {
                console.error("Registration failed!");
            })
    })
}
