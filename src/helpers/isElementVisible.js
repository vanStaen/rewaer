export function isElementVisible(element) {
    if (element) {
        var rect = element.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;
        // Only completely visible elements return true:
        // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        // Partially visible elements return true:
        var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
        return isVisible;
    }
    return null;
}