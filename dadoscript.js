let data = [];
// const url =
//   "https://a45b8fd0-560e-457e-8382-84745213fafd-00-1r1aimao64pwu.spock.replit.dev";

document.addEventListener("DOMContentLoaded", () => {
  const dadoForm = document.getElementById("dadoForm");
  const dadoList = document.getElementById("dadoList");
  // userForm.addEventListener("submit", (event) => {
  // event.preventDefault();
  // const name = document.getElementById("name").value;
  // const email = document.getElementById("email").value;
  // const user = {
  // name: name,
  // email: email,
  // };
  // data.push(user);
  // localStorage.setItem("data", JSON.stringify(data));
  // addUserToList(user);
  // userForm.reset();
  // });
  // Adiciona um evento de submit ao formulário

  dadoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("rolar").value;
    // Envia os dados para o servidor
    fetch(`${url}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        addUserToList({ name });
      })
      .catch((error) => console.error("Erro:", error));
    dadoForm.reset();
  });
  function addUserToList(user) {
    const li = document.createElement("li");
    li.innerHTML = `${user.name} <button onclick=
'deleteData("${user.name}")'> Excluir</button>`;
    dadoList.appendChild(li);
  }
  Object.keys(localStorage).forEach((key) => {
    console.log(key);
    const user = JSON.parse(localStorage.getItem(key));
    addUserToList(user);
  });
});
function removerItem(id) {
  alert(id);
  localStorage.removeItem(id);
  window.location.reload(true);
}
function loadData() {
  fetch(`${url}/load`)
    .then((response) => response.json())
    .then((data) => {
      const dataList = document.getElementById("userList");
      dataList.innerHTML = ""; // Limpa a lista existente
      data.forEach((item) => {
        console.log(item);
        const li = document.createElement("li");
        li.textContent = `Nome: ${item.value.name}, Email: ${item.value.name}`;
        // Botão para excluir o item
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.onclick = () => deleteData(item.key);
        li.appendChild(deleteButton);
        dataList.appendChild(li);
      });
    })
    .catch((error) => console.error("Erro ao carregar dados:", error));
}
function deleteData(key) {
  fetch(`${url}/delete/${key}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload(true);
    })
    .catch((error) => console.error("Erro ao excluir dados:", error));
}
loadData();
