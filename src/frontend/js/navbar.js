fetch("/navbar")
    .then((response) => response.text())
    .then((data) => (document.getElementById("navbar").innerHTML = data));
