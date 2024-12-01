const app = Vue.createApp({
    data() {
        return {
            flashCards: [
                { index: 1, question: 'What is the capital of France?', answer: 'Paris', show: true },
                { index: 2, question: 'What is the capital of Spain?', answer: 'Madrid', show: true },
                { index: 3, question: 'What is the capital of Italy?', answer: 'Rome', show: true },
                { index: 4, question: 'What is the capital of Germany?', answer: 'Berlin', show: true },
            ],
        }
    },
    methods: {
        toggleCard(index) {
            this.flashCards[index].show = !this.flashCards[index].show
        }
    }
})

app.mount('#app')