const app = Vue.createApp({
    data() {
        return {
            decks: [
                { category: 'Countries', cards: [
                    { question: 'What is the capital of France?', answer: 'Paris', show: true },
                    { question: 'What is the capital of Spain?', answer: 'Madrid', show: true },
                    { question: 'What is the capital of Italy?', answer: 'Rome', show: true },
                    { question: 'What is the capital of Germany?', answer: 'Berlin', show: true },
                ]},
                { category: 'Numbers', cards: [
                    { question: 'What is 1 + 1?', answer: '2', show: true },
                    { question: 'What is 2 + 2?', answer: '4', show: true },
                    { question: 'What is 3 + 3?', answer: '6', show: true },
                    { question: 'What is 4 + 4?', answer: '8', show: true },
                ]},
                { category: 'Colors', cards: [
                    { question: 'What color is the sky?', answer: 'Blue', show: true },
                    { question: 'What color is the grass?', answer: 'Green', show: true },
                    { question: 'What color is the sun?', answer: 'Yellow', show: true },
                    { question: 'What color is the snow?', answer: 'White', show: true },
                ]},
            ],
            selectedDeck: { category: '', cards: [] },
            newCard: { question: '', answer: '', show: true },
            newDeck: { category: '', cards: [] }
        }
    },
    created() {
        const decks = localStorage.getItem('decks')
        if (decks) {
            this.decks = JSON.parse(decks)
        }
    },
    methods: {
        toggleCard(card) {
            card.show = !card.show
            this.saveCards()
        },
        addDeck() {
            if (this.newDeck.category) {
                this.decks.push({ category: this.newDeck.category, cards: [] })
                this.newDeck.category = ''
            }
            this.saveCards()
        },
        addCard() {
            if (this.newCard.question && this.newCard.answer) {
                this.selectedDeck.cards.push({ ...this.newCard })
                this.newCard.question = ''
                this.newCard.answer = ''
            }
            this.saveCards()
        },
        shuffleCards() {
            this.selectedDeck.cards = this.selectedDeck.cards.sort(() => Math.random() - 0.5)
        },
        removeCard(card) {
            this.selectedDeck.cards = this.selectedDeck.cards.filter(c => c !== card)
            this.saveCards()
        },
        saveCards() {
            localStorage.setItem('decks', JSON.stringify(this.decks))
        }
    }
})

app.mount('#app')