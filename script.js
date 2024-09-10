document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const userList = document.getElementById("userList");
  
  // Adiciona um evento de submit ao formulário
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    
    // Envia os dados para o servidor
    fetch("http://localhost:3000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        addUserToList({ name, email });
      })
      .catch((error) => console.error("Erro:", error));
    userForm.reset();
  });
  
  // Carrega os usuários do servidor
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((users) => {
      users.forEach(addUserToList);
    })
    .catch((error) => console.error("Erro ao carregar usuários:", error));
  function addUserToList(user) {
    const li = document.createElement("li");
    li.textContent = `${user.name} - ${user.email}`;
    userList.appendChild(li);
  }
});
