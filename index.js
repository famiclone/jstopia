import { CPU, PPU, Memory, UI } from './jstopia/index.js';

let lt = 0;

class Logger {
    constructor(cb) {
        this.log = [];
        this.cb = cb;
    }

    push(data) {
        this.log.push(data);
        if (this.cb) {
            this.cb(this.log);
        }
    }
}

const state = {};


class NES {
    constructor() {
        this.CPU = new CPU();
        this.PPU = new PPU();
        this.cpuMemory = new Memory(0x10000); // 64KB
        this.ppuMemory = new Memory(0x8000); // 32KB
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 240;
        document.querySelector('#root').append(canvas);
        this.renderer = canvas.getContext('2d');
        this.renderer.fillStyle = 'black';
        this.renderer.fillRect(0, 0, 256, 240);
    }
}

let ct = 0;

function tick(dt) {
    ct += dt;
    if (ct > 1000) {
        ct = 0;
    }
}

function setup(rom) {
    return new Promise((res, rej) => {
        state['nes'] = new NES();
        state['ui'] = new UI('root');
        state.ui.init();

        state['log'] = new Logger((log) => state.ui.elements.debug.innerText = log.join('\n'));
        state.log.push('Starting setup...');
        state['rom'] = rom;
        res(state);

        console.log(state)
    })
}

function main_loop(state) {
    const now = performance.now();
    const dt = now - lt;
    lt = now;

    tick(dt);

    requestAnimationFrame(() => main_loop(state));
}

fetch('./roms/smb.nes')
    .then((data) => data.arrayBuffer())
    .then((data) => new Uint8Array(data))
    .then((data) => setup(data))
    .then((state) => {
        state.ui.elements.romData.innerHTML = state.rom.forEach((b) => b.toString(16));
        state.log.push('Starting main loop...')
        main_loop(state)
    });
