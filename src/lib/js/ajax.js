function loadXml(path) {
  return fetch(path)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
}