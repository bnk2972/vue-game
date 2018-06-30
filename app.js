new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                isHeal: false,
                text: 'ผู้เล่น โจมตีมอนเตอร์ พลังทำลาย '+damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            if (this.checkWin()) {
                return;
            }
            this.turns.unshift({
                isPlayer: true,
                isHeal: false,
                text: 'ผู้เล่น ใช้สกิลโจมตีมอนเตอร์ พลังทำลาย '+damage
            });

            this.monsterAttacks();
        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                isHeal: true,
                text: 'ใช้ทักษะรักษา พลังชีวิตเพิ่มขึ้น 10'
            });
            this.monsterAttacks();
        },
        giveUp: function() {
            this.playerHealth = 0;
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                isHeal: false,
                text: 'ปีศาจร้าย โจมตีผู้เล่น พลังทำลาย '+damage
            });
            this.checkWin();
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.monsterHealth = 0;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.playerHealth = 0;
                }
                return true;
            }
            return false;
        }
    }
});