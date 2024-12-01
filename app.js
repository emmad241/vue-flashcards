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
    created() {
        const cards = localStorage.getItem('flash-cards')
        if (cards) {
            this.flashCards = JSON.parse(cards)
        }
    },
    methods: {
        toggleCard(card) {
            card.show = !card.show
            this.saveCards()
        },
        addCard() {
            if (this.newCard.question && this.newCard.answer) {
                this.flashCards.push({ ...this.newCard })
                this.newCard.question = ''
                this.newCard.answer = ''
            }
            this.saveCards()
        },
        shuffleCards() {
            this.flashCards = this.flashCards.sort(() => Math.random() - 0.5)
            this.saveCards()
        },
        removeCard(card) {
            this.flashCards = this.flashCards.filter(c => c !== card)
            this.saveCards()
        },
        saveCards() {
            localStorage.setItem('flash-cards', JSON.stringify(this.flashCards))
        }
    }
})

app.mount('#app')