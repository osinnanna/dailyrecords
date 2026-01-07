const hour = new Date().getHours();
let greeting;

if (hour >= 0 && hour < 12) greeting = "Good Morning";
else if (hour >= 12 && hour < 16) greeting = "Good Afternoon";
else if (hour >= 16 && hour < 20) greeting = "Good Evening";
else greeting = "Good Night";
document.querySelector("#greet").textContent = greeting;
