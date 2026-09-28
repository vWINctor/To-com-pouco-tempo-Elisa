const form = document.getElementById("formCadastro");
const inputImagem = document.getElementById("imagem");
const preview = document.getElementById("preview");
const mensagem = document.getElementById("mensagem");

// Mostra a imagem escolhida na própria página
inputImagem.addEventListener("change", () => {
  const arquivo = inputImagem.files[0];
  if (arquivo) {
    preview.src = URL.createObjectURL(arquivo);
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
  }
});

// Criptografia da senha: hash SHA-256 (em hexadecimal)
async function criptografar(texto) {
  const dados = new TextEncoder().encode(texto);
  const hash = await crypto.subtle.digest("SHA-256", dados);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const cpf = document.getElementById("cpf").value;
  const nomeImagem = inputImagem.files[0] ? inputImagem.files[0].name : "";

  const senhaCriptografada = await criptografar(senha);

  const conteudo =
    "Cadastro feito com sucesso!\n" +
    "E-mail:" + email + "\n" +
    "Senha:" + senha + "\n" +
    "Criptografia:" + senhaCriptografada + "\n" +
    "Nome: " + nome + "\n" +
    "Endereço: " + endereco + "\n" +
    "CPF:" + cpf + "\n" +
    "Imagem: " + nomeImagem + "\n";

  // Cria e baixa o arquivo .txt
  const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "cadastro.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);

  mensagem.textContent = "Cadastro feito com sucesso! O arquivo cadastro.txt foi baixado.";
});
