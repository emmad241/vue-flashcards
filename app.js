const app = Vue.createApp({
    data() {
        return {
            decks: [
                { category: 'All', cards: [] },
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
            selectedDeck: null,
            newCard: { question: '', answer: '', show: true },
            newDeck: { category: '', cards: [] }
        }
    },
    created() {
        const savedDecks = localStorage.getItem('decks');
        if (savedDecks) {
            this.decks = JSON.parse(savedDecks);
        }
        this.updateAllDeck();
        this.selectedDeck = this.decks[0];
    },
    methods: {
        toggleCard(card) {
            card.show = !card.show;
        },
        addDeck() {
            if (this.newDeck.category) {
                this.decks.push({ category: this.newDeck.category, cards: [] });
                this.newDeck.category = '';
                this.updateAllDeck();
            }
            this.saveCards();
        },
        addCard() {
            if (this.newCard.question && this.newCard.answer) {
                this.selectedDeck.cards.push({ ...this.newCard });
                this.newCard.question = '';
                this.newCard.answer = '';
                this.updateAllDeck();
            }
            this.saveCards();
        },
        shuffleCards() {
            this.selectedDeck.cards = this.selectedDeck.cards.sort(() => Math.random() - 0.5);
        },
        removeCard(card) {
            this.selectedDeck.cards = this.selectedDeck.cards.filter(c => c !== card);
            this.updateAllDeck();
            this.saveCards();
        },
        removeDeck() {
            this.decks = this.decks.filter(d => d !== this.selectedDeck);
            this.updateAllDeck();
            this.saveCards();
            this.selectedDeck = this.decks[0];
        },
        updateAllDeck() {
            const allDeck = this.decks.find(deck => deck.category === 'All');
            if (allDeck) {
                allDeck.cards = this.decks
                    .filter(deck => deck.category !== 'All')
                    .flatMap(deck => deck.cards);
            }
        },
        saveCards() {
            localStorage.setItem('decks', JSON.stringify(this.decks));
        }
    }
});

app.mount('#app');