'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug',
});
export class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        // this.onClick = this.onClick.bind(this);
        //js에서는 함수를 밖에서 호출할때 클레스가 같이 보내지지
        //않기 때문에 this.bind를 해줘야함...근데 이렇게는
        //잘 안쓰고 아래와같이 arrow function을 씀.
        this.field.addEventListener('click', this.onClick);
    }

    init() {
        this.field.innerHTML = '';
        //벌레와 당근을 생성한뒤 field에 추가해줌
        this._addItems('carrot', this.carrotCount, 'img/carrot.png');
        this._addItems('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

//외부에서 프라이빗한 걸 알수있도록 _추가?
    _addItems(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        for(let i = 0; i < count; i++) {
            const item = document.createElement('img'); //5개 생성
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomeNumber(x1, x2);
            const y = randomeNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    
    }
    
    onClick = (event) => {
        const target = event.target;
        if(target.matches('.carrot')) { //css selecter
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick(ItemType.carrot);
        } else if(target.matches('.bug')) {
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }
}

function randomeNumber(min, max) {
    return Math.random() * (max - min) + min;
}



