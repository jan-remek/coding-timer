
import { quotes, newQuote } from "./quoteGenerator.js";


export default class Timer {
    constructor(root){
        root.innerHTML = Timer.getHTML();
        this.el = {
            hours: root.querySelector('.timer-part-hours'),
            minutes: root.querySelector('.timer-part-minutes'),
            seconds: root.querySelector('.timer-part-seconds'),
            control: root.querySelector('.timer-btn-control'),
            stop: root.querySelector('.timer-btn-stop'),
            reset: root.querySelector('.timer-btn-reset')
        };

        this.interval = null;
        this.remainingSeconds = 0;
        this.totalSeconds;

        this.el.control.addEventListener("click", ()=>{
            if (this.interval === null) {
                this.start();
            } else {
                this.stop();
            }
        });

        this.el.stop.addEventListener("click", ()=>{
            this.resetConfirmation();
        });

        this.el.reset.addEventListener("click", ()=>{
            const inputMinutes = prompt("Wie viele Minuten soll der Timer laufen?");
            this.stop();
            this.remainingSeconds = inputMinutes * 60;
            this.totalSeconds = inputMinutes * 60;
            this.updateInterfaceTime();
        });
    }

    updateInterfaceTime(){
        const hours = Math.floor(this.remainingSeconds / 60 / 60);
        const minutes = Math.floor(((this.remainingSeconds - (hours * 60 * 60)) / 60));
        const seconds = this.remainingSeconds % 60;

        this.el.hours.textContent = hours.toString().padStart(2, "0");
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls(){
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
            this.el.control.classList.add('timer-btn-start');
            this.el.control.classList.remove('timer-btn-pause');
        } else {
            this.el.control.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
            this.el.control.classList.add('timer-btn-pause');
            this.el.control.classList.remove('timer-btn-start');
        }
    };

    start() {
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(()=>{
            this.remainingSeconds--;
            this.motivation();           
            this.updateInterfaceTime();
        
        if (this.remainingSeconds === 0) {
            this.stop();
            this.playTimerFinishSound();
        };

        },1000);
        this.updateInterfaceControls();
    };

    stop(){
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
    };

    reset(){
        clearInterval(this.interval);
        this.interval = null;
        this.remainingSeconds = 0;
        this.updateInterfaceTime();
        this.updateInterfaceControls();
        document.querySelector('.motivation-container').innerHTML ='';
    };


    resetConfirmation() {
        document.querySelector('.reset-information-container').innerHTML = `
    
            <div class="reset-information">
    
             <p>Möchtest Du den Timer wirklich beenden?</p>
    
            <button class="reset-confirmation-yes button btn-hover">Ja</button>
    
            <button class="reset-confirmation-no button btn-hover">Nein</button>
    
            </div>
    
            `;
    
            document.querySelector('.reset-confirmation-yes').addEventListener('click', () => {
                this.reset();
                document.querySelector('.reset-information').innerHTML = '';
                document.querySelector('.reset-information-container').innerHTML = '';
            });
    
            document.querySelector('.reset-confirmation-no').addEventListener('click', () => {
                document.querySelector('.reset-information').innerHTML = '';
                document.querySelector('.reset-information-container').innerHTML = '';
            });
    };

    motivation() {

        if (this.remainingSeconds === (this.totalSeconds * 0.75)) {
            let timeoutId;
            newQuote();
            this.playTimerMilestoneSound();
            clearTimeout(timeoutId);
            timeoutId = setTimeout(()=> {
                document.querySelector('.motivation-container').innerHTML = '';
            }, 8000);
        } 
        
        if (this.remainingSeconds === (this.totalSeconds * 0.50)) {
            let timeoutId;
            newQuote();
            this.playTimerMilestoneSound();
            clearTimeout(timeoutId);
            timeoutId = setTimeout(()=> {
                document.querySelector('.motivation-container').innerHTML = '';
            }, 8000);
        } 
        
        if (this.remainingSeconds === (this.totalSeconds * 0.25)) {
            let timeoutId;
            newQuote();
            this.playTimerMilestoneSound();
            clearTimeout(timeoutId);
            timeoutId = setTimeout(()=> {
                document.querySelector('.motivation-container').innerHTML = '';
            }, 8000);
        }

        if (this.remainingSeconds === 0) {
            document.querySelector('.motivation-container').innerHTML = `
                <div class="counter-motivation">    
                <p class="motivation-quote">Mega Jan Du hast ${this.totalSeconds / 60} Minuten geschafft!</p>
                </div>`;
        }
            
    }

    playTimerFinishSound () {
        let timerSound = new Audio('./alarm.mp3');
        timerSound.play();
    };

    playTimerMilestoneSound () {
        let timerSound = new Audio('./success.mp3');
        timerSound.play();
    };


    static getHTML(){
        return `
            <span class="timer-part timer-part-hours">00</span>

            <span class="timer-part">:</span>

            <span class="timer-part timer-part-minutes">00</span>

            <span class="timer-part">:</span>

            <span class="timer-part timer-part-seconds">00</span>

            <button type="button" class="timer-btn timer-btn-control timer-btn-start btn-hover"><span class="material-symbols-outlined">
                    play_arrow
            </span></button>

            <button type="button" class="timer-btn timer-btn-stop btn-hover"><span class="material-symbols-outlined">
                    stop
            </span></button>

            <button type="button" class="timer-btn timer-btn-reset btn-hover"><span class="material-symbols-outlined">
                    timer
            </span></button>
        `;
    }
}

