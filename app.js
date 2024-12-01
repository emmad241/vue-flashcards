const app = Vue.createApp({
    data() {
        return {
            flashCards: [
                { question: 'What is the capital of France?', answer: 'Paris', show: true },
                { question: 'What is the capital of Spain?', answer: 'Madrid', show: true },
                { question: 'What is the capital of Italy?', answer: 'Rome', show: true },
                { question: 'What is the capital of Germany?', answer: 'Berlin', show: true },
            ],
            newCard: { question: '', answer: '', show: true }
        }
    },
    methods: {
        toggleCard(card) {
            card.show = !card.show
        },
        addCard() {
            if (this.newCard.question && this.newCard.answer) {
                this.flashCards.push({ ...this.newCard })
                this.newCard.question = ''
                this.newCard.answer = ''
            }
        },
        shuffleCards() {
            this.flashCards = this.flashCards.sort(() => Math.random() - 0.5)
        }
    }
})

app.mount('#app')