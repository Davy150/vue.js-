const { createApp, ref, computed } = Vue;

createApp({
    setup() {

       const novaTarefa = ref("");

const tarefasSalvas = localStorage.getItem("tarefas");

const tarefas = ref(
    tarefasSalvas ? JSON.parse(tarefasSalvas) : []
);
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas.value));
}

        const quantidadeTarefas = computed(() => {
            return tarefas.value.length;
        });

        const quantidadePendentes = computed(() => {
            return tarefas.value.filter(tarefa => !tarefa.concluida).length;
        });

        const quantidadeConcluidas = computed(() => {
            return tarefas.value.filter(tarefa => tarefa.concluida).length;
        });

        function adicionarTarefa() {
            const nome = novaTarefa.value.trim();

            if (nome === "") {
                return;
            }

            tarefas.value.push({
                id: Date.now(),
                nome: nome,
                concluida: false
            });

           salvarTarefas();

          novaTarefa.value = "";
        }

        function removerTarefa(id) {
            tarefas.value = tarefas.value.filter(tarefa => tarefa.id !== id);
                salvarTarefas();
        }

        function alternarTarefa(id) {
            const tarefa = tarefas.value.find(tarefa => tarefa.id === id);

            if (tarefa) {
                tarefa.concluida = !tarefa.concluida;
                        salvarTarefas();
            }
        }

        return {
            novaTarefa,
            tarefas,
            quantidadeTarefas,
            quantidadePendentes,
            quantidadeConcluidas,
            adicionarTarefa,
            removerTarefa,
            alternarTarefa
        };
    }
}).mount("#app");
