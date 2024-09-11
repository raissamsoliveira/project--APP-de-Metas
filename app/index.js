const { select, input, checkbox } = require ('@inquirer/prompts') 
const fs = require("fs").promises

let mensagem = "Bem-vindo(a) ao Gerenciador de Metas";

let metas 

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch (erro) {
        metas = []
    }
}

const salvarMetas = async() => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null,2))
}

const cadastrarMeta = async () => {
    if (metas.length === 0) {
        mensagem = "Não há metas cadastradas!";
        return;
    }
    
    const meta = await input ({
        message: "Digite a meta: "
    })
    if(meta.length ==0) {
        mensagem ='Você não cadastrou nenhuma meta :( '
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async() => {
    if (metas.length === 0) {
        mensagem = "Não há metas cadastradas!";
        return;
    }

    const respostas = await checkbox ({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa.",
        choices:[...metas],
        instructions:false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length === 0) {
        mensagem = "Nenhuma meta selecionada!"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    }) 

    mensagem = "Meta(s) marcada(s) como concluída(s)"
}

const metasRealizadas = async() => {
    if (metas.length === 0) {
        mensagem = "Não há metas cadastradas!";
        return;
    }

    const realizadas = metas.filter ((meta) => {
        return meta.checked
    })

    if (realizadas.length === 0) {
        mensagem ='Não existem metas realizadas :('
        return
    }
    
    await select({
        message: "Metas Realizadas:" + " " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async() => {
    if (metas.length === 0) {
        mensagem = "Não há metas cadastradas!";
        return;
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        mensagem = 'Não existem metas em aberto :)'
        return
    }

    await select ({
        message: "Metas abertas:" + " " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async() => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })
    const itemsADeletar = await checkbox ({
        message: "Selecione o(s) item(ns) para deletar",
        choices: metas.map((meta) => ({
            name: meta.value,
            value: meta.value,
        })),
        instructions:false
    });

    if (itemsADeletar.length === 0) {
        mensagem = "Nenhum item para deletar";
        return;
    }

    metas = metas.filter((meta) => {
        return !itemsADeletar.includes(meta.value);
    });

    mensagem = "Meta(s) deletada(s) com sucesso!";
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    await carregarMetas()
   
    while (true) {
        mostrarMensagem()
        await salvarMetas()

        const opcao = await select ({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })


        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até a próxima!")
                return

        }
    }
}

start ()