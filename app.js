const app = Vue.createApp({
    data() {
        return {
            decks: [
                { category: 'All', cards: [] },
                { category: 'Christmas', cards: [
                    { question: 'What do you put on top of a Christmas tree?', answer: 'Star', show: true },
                    { question: 'What do you hang on the fireplace?', answer: 'Stockings', show: true },
                    { question: 'What do you leave out for Santa?', answer: 'Cookies', show: true },
                    { question: 'What do you hang on the door?', answer: 'Wreath', show: true },
                ]},
                { category: 'Ireland', cards: [
                    { question: 'What is the capital of Ireland?', answer: 'Dublin', show: true },
                    { question: 'What is the national sport of Ireland?', answer: 'Gaelic Football', show: true },
                    { question: 'What is the national emblem of Ireland?', answer: 'Shamrock', show: true },
                    { question: 'What is the national colour of Ireland?', answer: 'Green', show: true },
                ]},
                { category: 'VueJS', cards: [
                    { question: 'What is the name of the creator of VueJS?', answer: 'Evan You', show: true },
                    { question: 'What is the name of the official router for VueJS?', answer: 'Vue Router', show: true },
                    { question: 'What is the name of the official state management for VueJS?', answer: 'Vuex', show: true },
                    { question: 'What is the name of the official CLI for VueJS?', answer: 'Vue CLI', show: true },
                ]},
            ],
            selectedDeck: null,
            newCard: { question: '', answer: '', show: true },
            newDeck: { category: '', cards: [] },
            cardIndex: 0
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
        },
        prevCard() {
            if (this.cardIndex > 0) {
                /** unturn card */
                if (!this.selectedDeck.cards[this.cardIndex].show) {
                    this.toggleCard(this.selectedDeck.cards[this.cardIndex]);
                }   
                this.cardIndex--;
            }
        },
        nextCard() {
            if (this.cardIndex < this.selectedDeck.cards.length - 1) {
                /** unturn card */
                if (!this.selectedDeck.cards[this.cardIndex].show) {
                    this.toggleCard(this.selectedDeck.cards[this.cardIndex]);
                }
                this.cardIndex++;
            }
        }
    },
    watch: {
        selectedDeck: {
            handler(newDeck) {
                this.cardIndex = 0;
            },
            immediate: true
        }
    }
    
});

app.mount('#app');